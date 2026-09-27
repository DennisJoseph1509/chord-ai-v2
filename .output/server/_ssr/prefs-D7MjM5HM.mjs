import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as Guitar } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { i as pcToNote, n as noteToPc, r as parseChord } from "./chords-BRRbQvn_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prefs-D7MjM5HM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INSTRUMENTS = [
	{
		id: "guitar",
		name: "Guitar (standard)",
		short: "Guitar",
		kind: "fretted",
		tuning: [
			40,
			45,
			50,
			55,
			59,
			64
		],
		labels: [
			"E",
			"A",
			"D",
			"G",
			"B",
			"E"
		],
		frets: 5
	},
	{
		id: "guitar-dropd",
		name: "Guitar (drop D)",
		short: "Drop D",
		kind: "fretted",
		tuning: [
			38,
			45,
			50,
			55,
			59,
			64
		],
		labels: [
			"D",
			"A",
			"D",
			"G",
			"B",
			"E"
		],
		frets: 5
	},
	{
		id: "bass",
		name: "Bass guitar",
		short: "Bass",
		kind: "fretted",
		tuning: [
			28,
			33,
			38,
			43
		],
		labels: [
			"E",
			"A",
			"D",
			"G"
		],
		frets: 5
	},
	{
		id: "ukulele",
		name: "Ukulele (GCEA)",
		short: "Ukulele",
		kind: "fretted",
		tuning: [
			67,
			60,
			64,
			69
		],
		labels: [
			"G",
			"C",
			"E",
			"A"
		],
		frets: 5
	},
	{
		id: "banjo",
		name: "Banjo (open G)",
		short: "Banjo",
		kind: "fretted",
		tuning: [
			67,
			50,
			55,
			59,
			62
		],
		labels: [
			"g",
			"D",
			"G",
			"B",
			"D"
		],
		frets: 5,
		drone: [0]
	},
	{
		id: "mandolin",
		name: "Mandolin (GDAE)",
		short: "Mandolin",
		kind: "fretted",
		tuning: [
			55,
			62,
			69,
			76
		],
		labels: [
			"G",
			"D",
			"A",
			"E"
		],
		frets: 5
	},
	{
		id: "piano",
		name: "Piano / keys",
		short: "Piano",
		kind: "keys",
		tuning: [],
		labels: [],
		frets: 0
	}
];
function getInstrument(id) {
	return INSTRUMENTS.find((i) => i.id === id) ?? INSTRUMENTS[0];
}
var QUALITY_INTERVALS = {
	"": [
		0,
		4,
		7
	],
	maj: [
		0,
		4,
		7
	],
	M: [
		0,
		4,
		7
	],
	"5": [0, 7],
	m: [
		0,
		3,
		7
	],
	min: [
		0,
		3,
		7
	],
	"-": [
		0,
		3,
		7
	],
	"6": [
		0,
		4,
		7,
		9
	],
	m6: [
		0,
		3,
		7,
		9
	],
	"69": [
		0,
		4,
		7,
		9,
		2
	],
	"7": [
		0,
		4,
		7,
		10
	],
	maj7: [
		0,
		4,
		7,
		11
	],
	M7: [
		0,
		4,
		7,
		11
	],
	Δ: [
		0,
		4,
		7,
		11
	],
	Δ7: [
		0,
		4,
		7,
		11
	],
	m7: [
		0,
		3,
		7,
		10
	],
	mmaj7: [
		0,
		3,
		7,
		11
	],
	"9": [
		0,
		4,
		7,
		10,
		2
	],
	maj9: [
		0,
		4,
		7,
		11,
		2
	],
	m9: [
		0,
		3,
		7,
		10,
		2
	],
	"11": [
		0,
		7,
		10,
		2,
		5
	],
	m11: [
		0,
		3,
		7,
		10,
		5
	],
	"13": [
		0,
		4,
		7,
		10,
		9
	],
	add9: [
		0,
		4,
		7,
		2
	],
	madd9: [
		0,
		3,
		7,
		2
	],
	sus: [
		0,
		5,
		7
	],
	sus2: [
		0,
		2,
		7
	],
	sus4: [
		0,
		5,
		7
	],
	"7sus4": [
		0,
		5,
		7,
		10
	],
	dim: [
		0,
		3,
		6
	],
	"°": [
		0,
		3,
		6
	],
	dim7: [
		0,
		3,
		6,
		9
	],
	"°7": [
		0,
		3,
		6,
		9
	],
	m7b5: [
		0,
		3,
		6,
		10
	],
	ø: [
		0,
		3,
		6,
		10
	],
	aug: [
		0,
		4,
		8
	],
	"+": [
		0,
		4,
		8
	],
	"7#5": [
		0,
		4,
		8,
		10
	],
	"7b9": [
		0,
		4,
		7,
		10,
		1
	]
};
function normalizeQuality(q) {
	return q.replace(/^min(?!aj)/, "m").replace(/^M(?=aj)/, "maj");
}
function chordTones(label) {
	const p = parseChord(label);
	if (!p) return null;
	const rootPc = noteToPc(p.root);
	if (rootPc === null) return null;
	const q = normalizeQuality(p.quality);
	const iv = QUALITY_INTERVALS[q] ?? QUALITY_INTERVALS[q.replace(/[()]/g, "")] ?? null ?? (/^m/.test(q) ? [
		0,
		3,
		7
	] : [
		0,
		4,
		7
	]);
	return {
		rootPc,
		bassPc: p.bass ? noteToPc(p.bass) ?? rootPc : rootPc,
		pcs: iv.map((i) => (rootPc + i) % 12),
		intervals: iv
	};
}
/** Note names of a chord, ordered low to high for a keyboard diagram. */
function pianoNotes(label, useFlats = false) {
	const t = chordTones(label);
	if (!t) return null;
	const pcs = [];
	if (t.bassPc !== t.rootPc) pcs.push(t.bassPc);
	let last = t.bassPc;
	for (const pc of t.pcs) {
		let v = pc;
		while (v < last) v += 12;
		pcs.push(v);
		last = v;
	}
	return {
		pcs,
		names: pcs.map((p) => pcToNote(p % 12, useFlats))
	};
}
var cache = /* @__PURE__ */ new Map();
/**
* Find playable voicings for a chord on a fretted instrument.
* Returns fret numbers per string, -1 = muted, 0 = open.
*/
function voicingsFor(label, instrument, max = 3) {
	const key = `${instrument.id}|${label}|${max}`;
	const hit = cache.get(key);
	if (hit) return hit.filter(Boolean);
	const tones = chordTones(label);
	if (!tones) {
		cache.set(key, []);
		return [];
	}
	const n = instrument.tuning.length;
	const span = 4;
	const required = new Set(tones.pcs.slice(0, 4));
	const candidates = [];
	for (let base = 0; base <= 9; base++) {
		const options = instrument.tuning.map((open, i) => {
			const pcSet = new Set(tones.pcs);
			const inChord = (f) => pcSet.has(((open + f) % 12 + 12) % 12);
			if (instrument.drone?.includes(i)) return inChord(0) ? [0, -1] : [-1];
			const list = [-1];
			if (base > 0 && inChord(0)) list.push(0);
			const lo = base === 0 ? 0 : base;
			for (let f = lo; f < lo + span; f++) if (inChord(f)) list.push(f);
			return Array.from(new Set(list));
		});
		const frets = new Array(n).fill(-1);
		const walk = (i) => {
			if (candidates.length > 4e3) return;
			if (i === n) {
				const score = scoreVoicing(frets, instrument, tones, required);
				if (score !== null) candidates.push({
					frets: [...frets],
					score
				});
				return;
			}
			for (const f of options[i]) {
				frets[i] = f;
				walk(i + 1);
			}
			frets[i] = -1;
		};
		walk(0);
	}
	candidates.sort((a, b) => a.score - b.score);
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const c of candidates) {
		const k = c.frets.join(",");
		if (seen.has(k)) continue;
		seen.add(k);
		out.push(c.frets);
		if (out.length >= max) break;
	}
	cache.set(key, out);
	return out;
}
function scoreVoicing(frets, instrument, tones, required) {
	const n = frets.length;
	const sounding = [];
	for (let i = 0; i < n; i++) {
		const f = frets[i];
		if (f < 0) continue;
		const midi = instrument.tuning[i] + f;
		sounding.push({
			pc: (midi % 12 + 12) % 12,
			midi,
			string: i
		});
	}
	const minVoices = Math.min(required.size, instrument.tuning.length >= 5 ? 4 : 3);
	if (sounding.length < minVoices) return null;
	const pcSet = new Set(tones.pcs);
	for (const s of sounding) if (!pcSet.has(s.pc)) return null;
	const have = new Set(sounding.map((s) => s.pc));
	let missing = 0;
	for (const pc of required) if (!have.has(pc)) missing++;
	if (missing > (required.size > 3 ? 1 : 0)) return null;
	const first = frets.findIndex((f) => f >= 0);
	const last = n - 1 - [...frets].reverse().findIndex((f) => f >= 0);
	for (let i = first; i <= last; i++) if (frets[i] < 0 && !instrument.drone?.includes(i)) return null;
	const fingered = frets.filter((f) => f > 0);
	const lowFret = fingered.length ? Math.min(...fingered) : 0;
	const highFret = fingered.length ? Math.max(...fingered) : 0;
	if (highFret - lowFret > 3) return null;
	const atLow = fingered.filter((f) => f === lowFret).length;
	const fingers = fingered.length - (atLow > 1 ? atLow - 1 : 0);
	if (fingers > 4) return null;
	const bass = sounding.reduce((a, b) => a.midi <= b.midi ? a : b);
	let score = 0;
	score += missing * 6;
	score += bass.pc === tones.bassPc ? 0 : bass.pc === tones.rootPc ? 2 : 8;
	score += (n - sounding.length) * 3;
	score += lowFret * 1.2;
	score += fingers * 1.5;
	score += (highFret - lowFret) * 1.5;
	return score;
}
var LIBRARY_ROOTS = [
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
var LIBRARY_QUALITIES = [
	{
		id: "",
		name: "Major"
	},
	{
		id: "m",
		name: "Minor"
	},
	{
		id: "7",
		name: "Dominant 7th"
	},
	{
		id: "maj7",
		name: "Major 7th"
	},
	{
		id: "m7",
		name: "Minor 7th"
	},
	{
		id: "sus2",
		name: "Sus2"
	},
	{
		id: "sus4",
		name: "Sus4"
	},
	{
		id: "6",
		name: "6th"
	},
	{
		id: "9",
		name: "9th"
	},
	{
		id: "dim",
		name: "Diminished"
	},
	{
		id: "aug",
		name: "Augmented"
	},
	{
		id: "add9",
		name: "Add9"
	}
];
function ChordDiagram({ chord, size = 76, instrument = "guitar", variant = 0, showLabel = true }) {
	const inst = getInstrument(instrument);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-fit flex-col items-center gap-1",
		children: [showLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "chord-token text-sm",
			children: chord
		}), inst.kind === "keys" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PianoDiagram, {
			chord,
			width: size * 1.5
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FretDiagram, {
			chord,
			instrument: inst,
			size,
			variant
		})]
	});
}
function FretDiagram({ chord, instrument, size, variant }) {
	const shapes = (0, import_react.useMemo)(() => voicingsFor(chord, instrument, 3), [chord, instrument]);
	const shape = shapes[Math.min(variant, Math.max(0, shapes.length - 1))] ?? null;
	const strings = instrument.tuning.length;
	const frets = instrument.frets;
	const w = size;
	const h = size * 1.3;
	const padX = w * .15;
	const padTop = h * .2;
	const padBottom = h * .12;
	const gridW = w - padX * 2;
	const gridH = h - padTop - padBottom;
	const sx = gridW / (strings - 1);
	const fy = gridH / frets;
	const played = (shape ?? []).filter((f) => f > 0);
	const minFret = played.length ? Math.min(...played) : 1;
	const baseFret = minFret > 4 ? minFret : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: w,
		height: h,
		viewBox: `0 0 ${w} ${h}`,
		role: "img",
		"aria-label": `${chord} chord for ${instrument.name}`,
		children: [!shape && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: w / 2,
			y: h / 2,
			textAnchor: "middle",
			fill: "var(--color-muted-foreground)",
			fontSize: w * .16,
			children: "?"
		}), shape && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			Array.from({ length: strings }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: padX + i * sx,
				y1: padTop,
				x2: padX + i * sx,
				y2: padTop + gridH,
				stroke: "var(--color-border)",
				strokeWidth: 1
			}, `s${i}`)),
			Array.from({ length: frets + 1 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: padX,
				y1: padTop + i * fy,
				x2: padX + gridW,
				y2: padTop + i * fy,
				stroke: "var(--color-border)",
				strokeWidth: i === 0 && baseFret === 1 ? 3 : 1
			}, `f${i}`)),
			baseFret > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: padX - 4,
				y: padTop + fy * .75,
				textAnchor: "end",
				fill: "var(--color-muted-foreground)",
				fontSize: w * .13,
				children: baseFret
			}),
			shape.map((fret, i) => {
				const x = padX + i * sx;
				if (fret === -1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x,
					y: padTop - 4,
					textAnchor: "middle",
					fill: "var(--color-muted-foreground)",
					fontSize: w * .14,
					children: "×"
				}, i);
				if (fret === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: padTop - w * .07,
					r: w * .045,
					fill: "none",
					stroke: "var(--color-muted-foreground)",
					strokeWidth: 1.5
				}, i);
				const rel = fret - baseFret + 1;
				if (rel < 1 || rel > frets) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: padTop + rel * fy - fy / 2,
					r: w * .07,
					fill: "var(--color-primary)"
				}, i);
			}),
			instrument.labels.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: padX + i * sx,
				y: h - 1,
				textAnchor: "middle",
				fill: "var(--color-muted-foreground)",
				fontSize: w * .11,
				children: l
			}, `l${i}`))
		] })]
	});
}
var WHITE_PC = [
	0,
	2,
	4,
	5,
	7,
	9,
	11
];
var BLACK_AFTER = [
	0,
	1,
	3,
	4,
	5
];
function PianoDiagram({ chord, width }) {
	const notes = pianoNotes(chord);
	const octaves = 2;
	const kw = width / 14;
	const kh = kw * 3.4;
	const bw = kw * .62;
	const bh = kh * .62;
	const active = new Set((notes?.pcs ?? []).map((p) => (p % 24 + 24) % 24));
	const isOn = (pc, octave) => {
		const rel = pc + octave * 12;
		return active.has(rel % 24) || active.has(rel);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width,
		height: kh + 2,
		viewBox: `0 0 ${width} ${kh + 2}`,
		role: "img",
		"aria-label": `${chord} on piano`,
		children: [Array.from({ length: octaves }).map((_, o) => WHITE_PC.map((pc, i) => {
			const x = (o * 7 + i) * kw;
			const on = isOn(pc, o);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x,
				y: 0,
				width: kw - 1,
				height: kh,
				rx: 2,
				fill: on ? "var(--color-primary)" : "var(--color-card)",
				stroke: "var(--color-border)"
			}, `w${o}-${i}`);
		})), Array.from({ length: octaves }).map((_, o) => BLACK_AFTER.map((i) => {
			const pc = WHITE_PC[i] + 1;
			const x = (o * 7 + i) * kw + kw - bw / 2;
			const on = isOn(pc, o);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x,
				y: 0,
				width: bw,
				height: bh,
				rx: 2,
				fill: on ? "var(--color-primary)" : "var(--color-foreground)",
				stroke: "var(--color-border)"
			}, `b${o}-${i}`);
		}))]
	});
}
function InstrumentPicker({ value, onChange, label = "Instrument", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guitar, { className: "size-4 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value,
					onValueChange: onChange,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "ml-auto w-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: INSTRUMENTS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: i.id,
						children: i.name
					}, i.id)) })]
				})
			]
		})
	});
}
var KEY = "chordlab.instrument";
var EVENT = "chordlab:instrument";
function getInstrumentPref() {
	if (typeof window === "undefined") return "guitar";
	return window.localStorage.getItem(KEY) ?? "guitar";
}
function setInstrumentPref(id) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY, id);
	window.dispatchEvent(new CustomEvent(EVENT));
}
/** Instrument preference shared across pages (read after hydration). */
function useInstrument() {
	const [id, setId] = (0, import_react.useState)("guitar");
	(0, import_react.useEffect)(() => {
		const sync = () => setId(getInstrumentPref());
		sync();
		window.addEventListener(EVENT, sync);
		return () => window.removeEventListener(EVENT, sync);
	}, []);
	return [id, (0, import_react.useCallback)((next) => {
		setId(next);
		setInstrumentPref(next);
	}, [])];
}
//#endregion
export { getInstrument as a, voicingsFor as c, LIBRARY_ROOTS as i, InstrumentPicker as n, pianoNotes as o, LIBRARY_QUALITIES as r, useInstrument as s, ChordDiagram as t };
