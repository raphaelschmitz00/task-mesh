const dbName = "task_mesh_db";

export enum StoreName {
  tasks = "tasks",
  deadlines = "deadlines",
  requirements = "requirements",
}

function setUpDb(
  resolve: (database: IDBDatabase) => void,
  reject: (reason: unknown) => void,
) {
  const request = indexedDB.open(dbName);

  request.onupgradeneeded = () => {
    const db = request.result;

    const taskStore = db.createObjectStore(StoreName.tasks, { keyPath: "id" });
    taskStore.createIndex("ix_name", "name", { unique: false });
    taskStore.createIndex("ix_status", "status", { unique: false });

    const deadlineStore = db.createObjectStore(StoreName.deadlines, {
      keyPath: "id",
      autoIncrement: true,
    });
    deadlineStore.createIndex("ix_taskId", "taskId", { unique: true });
    deadlineStore.createIndex("ix_date", "date", { unique: false });

    const requirementStore = db.createObjectStore(StoreName.requirements, {
      keyPath: "id",
    });
    requirementStore.createIndex("ix_requiredTaskId", "requiredTaskId", {
      unique: false,
    });
    requirementStore.createIndex("ix_dependentTaskId", "dependentTaskId", {
      unique: false,
    });

    db.onerror = (e) => {
      console.log("IndexedDB Error", e);
      reject(e);
    };
  };

  request.onsuccess = () => resolve(request.result);
  request.onerror = (e) => reject(`Opening DB failed: ${JSON.stringify(e)}`);
}

export function setUpDbAsync() {
  return new Promise<IDBDatabase>(setUpDb);
}

export async function doInDb<T>(action: (database: IDBDatabase) => Promise<T>) {
  const db = await setUpDbAsync();
  const result = await action(db);
  db.close();
  return result;
}

export async function doInTransaction<T>(
  storeName: StoreName | Iterable<StoreName>,
  action: (transaction: IDBTransaction) => Promise<T>,
) {
  return await doInDb(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        transaction.onerror = (e) => {
          console.log("IndexedDb Transaction Error", e);
          reject(e);
        };
        const result = action(transaction);
        transaction.oncomplete = () => resolve(result);
      }),
  );
}

export async function doInObjectStore<T>(
  storeName: StoreName,
  action: (store: IDBObjectStore) => Promise<T>,
) {
  return await doInTransaction(storeName, async (transaction) => {
    const store = transaction.objectStore(storeName);
    return await action(store);
  });
}

interface Entity {
  id: number;
}

export function removeProperty<T, K extends keyof T>(
  obj: T,
  key: K,
): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  void _;
  return rest;
}

export async function save(storeName: StoreName, entity: Entity) {
  await doInObjectStore(storeName, async (store) => {
    const storableEntity = removeProperty(entity, "id");
    const request = store.add(storableEntity);
    request.onsuccess = () => (entity.id = request.result as number);
    request.onerror = console.log;
  });
}

export async function get<T>(storeName: StoreName, id: number) {
  return await doInObjectStore(
    storeName,
    async (store) =>
      new Promise<T>((resolve, reject) => {
        const request = store.get(id);
        request.onerror = reject;
        request.onsuccess = () => resolve(request.result as T);
      }),
  );
}

export async function remove(storeName: StoreName, entity: Entity) {
  return await doInObjectStore(
    storeName,
    async (store) =>
      new Promise<void>((resolve, reject) => {
        const request = store.delete(entity.id);
        request.onerror = reject;
        request.onsuccess = () => {
          entity.id = 0;
          resolve();
        };
      }),
  );
}
