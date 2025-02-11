function initializeDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("task_mesh_db");
    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(`Opening DB failed: ${e}`);
  });
}

const f = await initializeDb();

class TaskMeshDb {
  f = {
    taskIds: IDBIndex,
  };
}

function createDb(db: IDBDatabase) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("deadlines", "readwrite");
    const store = transaction.objectStore("deadlines");

    const branchIndex = store.index("branch_db");

    transaction.oncomplete = function () {
      console.log("oncomplete");
      resolve({
        deadlines: {
          taskIds: number,
        },
      });
      db.close();
    };
  });
}

// ===
const request = indexedDB.open("task_mesh_db");
request.onupgradeneeded = () => {
  const db = request.result;
  const store = db.createObjectStore("deadlines", { keyPath: "id" });
  store.createIndex("ix_taskId", ["branch"], { unique: false });
};
request.onsuccess = function () {
  console.log("database opened successfully");
  const db = request.result;

  const transaction = db.transaction("mystore", "readwrite");
  const store = transaction.objectStore("mystore");

  store.put({ id: 1, name: "jason", branch: "IT" });
  store.put({ id: 2, name: "praneeth", branch: "CSE" });
  store.put({ id: 3, name: "palli", branch: "EEE" });
  store.put({ id: 4, name: "abdul", branch: "IT" });
  store.put({ id: 4, name: "deevana", branch: "CSE" });

  const branchIndex = store.index("branch_db");
  const req = branchIndex.getAll(["CSE"]);
  req.onsuccess = function () {
    console.log("onsuccess");
    if (req.result !== undefined) {
      console.log("bots", req.result);
    } else {
      console.log("There are no such bots");
    }
  };
  req.onerror = (e) => {
    console.log("onerror", e);
  };
  transaction.oncomplete = function () {
    console.log("oncomplete");
    db.close();
  };
};

// ===
const request = indexedDB.open("task_mesh_db");
request.onupgradeneeded = () => {
  const db = request.result;
  const store = db.createObjectStore("mystore", { keyPath: "id" });
  store.createIndex("branch_db", ["branch"], { unique: false });
};
request.onsuccess = function () {
  console.log("database opened successfully");
  const db = request.result;

  const transaction = db.transaction("mystore", "readwrite");
  const store = transaction.objectStore("mystore");

  store.put({ id: 1, name: "jason", branch: "IT" });
  store.put({ id: 2, name: "praneeth", branch: "CSE" });
  store.put({ id: 3, name: "palli", branch: "EEE" });
  store.put({ id: 4, name: "abdul", branch: "IT" });
  store.put({ id: 4, name: "deevana", branch: "CSE" });

  const branchIndex = store.index("branch_db");
  const req = branchIndex.getAll(["CSE"]);
  req.onsuccess = function () {
    console.log("onsuccess");
    if (req.result !== undefined) {
      console.log("bots", req.result);
    } else {
      console.log("There are no such bots");
    }
  };
  req.onerror = (e) => {
    console.log("onerror", e);
  };
  transaction.oncomplete = function () {
    console.log("oncomplete");
    db.close();
  };
};

function apiOn(event) {
  return new Promise((resolve) => {
    api.on(event, (response) => resolve(response));
  });
}
