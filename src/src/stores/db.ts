const dbName = "task_mesh_db";

function setUpDb(
  resolve: (database: IDBDatabase) => void,
  reject: (reason: unknown) => void,
) {
  const request = indexedDB.open(dbName);

  request.onupgradeneeded = () => {
    const db = request.result;

    const taskStore = db.createObjectStore("tasks", { keyPath: "id" });
    taskStore.createIndex("ix_name", "name", { unique: false });
    taskStore.createIndex("ix_status", "status", { unique: false });

    const deadlineStore = db.createObjectStore("deadlines", {
      keyPath: "id",
      autoIncrement: true,
    });
    deadlineStore.createIndex("ix_taskId", "taskId", { unique: true });
    deadlineStore.createIndex("ix_date", "date", { unique: false });

    const requirementStore = db.createObjectStore("requirements", {
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

export async function doInDb(action: (database: IDBDatabase) => Promise<void>) {
  const db = await setUpDbAsync();
  await action(db);
  db.close();
}

export async function doInTransaction(
  db: IDBDatabase,
  storeName: string,
  action: (transaction: IDBTransaction) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    transaction.onerror = (e) => {
      console.log("IndexedDb Transaction Error", e);
      reject(e);
    };
    transaction.oncomplete = () => resolve();
    action(transaction);
  });
}

export async function doInObjectStore(
  db: IDBDatabase,
  storeName: string,
  action: (store: IDBObjectStore) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    transaction.onerror = (e) => {
      console.log("IndexedDb Transaction Error", e);
      reject(e);
    };
    transaction.oncomplete = () => resolve();

    const store = transaction.objectStore(storeName);
    action(store);
  });
}

export async function doInObjectStore2(
  storeName: string,
  action: (store: IDBObjectStore) => void,
) {
  const db = await setUpDbAsync();
  await doInObjectStore(db, storeName, action);
}

// const db = await setUpDbAsync();

// export default function initializeDb() {
//   return db;
// }
