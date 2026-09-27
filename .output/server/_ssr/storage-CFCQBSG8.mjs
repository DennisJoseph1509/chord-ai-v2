//#region node_modules/.nitro/vite/services/ssr/assets/storage-CFCQBSG8.js
var KEY = "chordlab.songs.v1";
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function write(songs) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY, JSON.stringify(songs));
	window.dispatchEvent(new CustomEvent("chordlab:songs"));
}
function listSongs() {
	return read().sort((a, b) => b.createdAt - a.createdAt);
}
function getSong(id) {
	return read().find((s) => s.id === id);
}
function saveSong(song) {
	const songs = read();
	const i = songs.findIndex((s) => s.id === song.id);
	if (i >= 0) songs[i] = song;
	else songs.push(song);
	write(songs);
}
function deleteSong(id) {
	write(read().filter((s) => s.id !== id));
}
function newId() {
	return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
//#endregion
export { saveSong as a, newId as i, getSong as n, listSongs as r, deleteSong as t };
