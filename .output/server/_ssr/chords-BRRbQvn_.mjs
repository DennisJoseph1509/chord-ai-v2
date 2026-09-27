//#region node_modules/.nitro/vite/services/ssr/assets/chords-BRRbQvn_.js
var SHARP_NOTES = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B"
];
var FLAT_NOTES = [
	"C",
	"Db",
	"D",
	"Eb",
	"E",
	"F",
	"Gb",
	"G",
	"Ab",
	"A",
	"Bb",
	"B"
];
var NOTE_INDEX = {
	C: 0,
	"B#": 0,
	"C#": 1,
	Db: 1,
	D: 2,
	"D#": 3,
	Eb: 3,
	E: 4,
	Fb: 4,
	F: 5,
	"E#": 5,
	"F#": 6,
	Gb: 6,
	G: 7,
	"G#": 8,
	Ab: 8,
	A: 9,
	"A#": 10,
	Bb: 10,
	B: 11,
	Cb: 11
};
function noteToPc(note) {
	const n = note.charAt(0).toUpperCase() + note.slice(1);
	return n in NOTE_INDEX ? NOTE_INDEX[n] : null;
}
function pcToNote(pc, useFlats = false) {
	const i = (pc % 12 + 12) % 12;
	return useFlats ? FLAT_NOTES[i] : SHARP_NOTES[i];
}
/** Matches a chord token like C#m7/G# or Bbsus4 */
var CHORD_RE = /^([A-G](?:#|b)?)((?:maj|min|m|dim|aug|sus|add|M)?[0-9a-zA-Z+#°Δ()-]*)(?:\/([A-G](?:#|b)?))?$/;
function parseChord(token) {
	const m = CHORD_RE.exec(token.trim());
	if (!m) return null;
	const [, root, quality, bass] = m;
	if (!root) return null;
	return {
		root,
		quality: quality ?? "",
		...bass ? { bass } : {}
	};
}
function transposeChord(token, semitones, useFlats = false) {
	const parsed = parseChord(token);
	if (!parsed) return token;
	const rootPc = noteToPc(parsed.root);
	if (rootPc === null) return token;
	let out = pcToNote(rootPc + semitones, useFlats) + parsed.quality;
	if (parsed.bass) {
		const bassPc = noteToPc(parsed.bass);
		if (bassPc !== null) out += "/" + pcToNote(bassPc + semitones, useFlats);
	}
	return out;
}
//#endregion
export { transposeChord as a, pcToNote as i, noteToPc as n, parseChord as r, SHARP_NOTES as t };
