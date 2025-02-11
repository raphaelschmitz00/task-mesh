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
  };

  request.onsuccess = () => resolve(request.result);
  request.onerror = (e) => reject(`Opening DB failed: ${JSON.stringify(e)}`);
}

function setUpDbAsync() {
  return new Promise<IDBDatabase>(setUpDb);
}

const db = await setUpDbAsync();

export default function initializeDb() {
  return db;
}
