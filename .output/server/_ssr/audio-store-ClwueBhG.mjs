//#region node_modules/.nitro/vite/services/ssr/assets/audio-store-ClwueBhG.js
var DB_NAME = "chordlab-audio";
var STORE = "files";
function open() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function putAudio(id, blob) {
	try {
		const db = await open();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.objectStore(STORE).put(blob, id);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	} catch {}
}
async function getAudio(id) {
	try {
		const db = await open();
		return await new Promise((resolve) => {
			const req = db.transaction(STORE, "readonly").objectStore(STORE).get(id);
			req.onsuccess = () => resolve(req.result ?? null);
			req.onerror = () => resolve(null);
		});
	} catch {
		return null;
	}
}
async function deleteAudio(id) {
	try {
		(await open()).transaction(STORE, "readwrite").objectStore(STORE).delete(id);
	} catch {}
}
//#endregion
export { getAudio as n, putAudio as r, deleteAudio as t };
