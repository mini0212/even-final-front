import type { PostDraft } from "@/types/editor";

const DB_NAME = "community-post-db";
const STORE_KEY = "post-draft";

export async function saveDraft(draft: PostDraft): Promise<void> {
  const db = await openDB();
  const tx = db.transaction("drafts", "readwrite");
  tx.objectStore("drafts").put({ id: STORE_KEY, ...draft });
}

export async function loadDraft(): Promise<PostDraft | null> {
  const db = await openDB();
  const tx = db.transaction("drafts", "readonly");
  return new Promise((resolve) => {
    const req = tx.objectStore("drafts").get(STORE_KEY);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => resolve(null);
  });
}

export async function clearDraft(): Promise<void> {
  const db = await openDB();
  const tx = db.transaction("drafts", "readwrite");
  tx.objectStore("drafts").delete(STORE_KEY);
}

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("drafts")) {
        db.createObjectStore("drafts", { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
