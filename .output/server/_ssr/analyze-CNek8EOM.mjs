import { a as __toESM } from "../_runtime.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BYTMViiZ.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input$2 } from "./input-DicJzR9-.mjs";
import { b as LoaderCircle, c as TextSearch, g as Music4, i as Upload, j as Cpu, l as Square, t as WandSparkles, x as Link2, y as Mic } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { i as pcToNote, n as noteToPc } from "./chords-BRRbQvn_.mjs";
import { n as analyzeAudioBuffer } from "./audio-analysis-B2s289hv.mjs";
import { r as putAudio } from "./audio-store-ClwueBhG.mjs";
import { a as saveSong, i as newId } from "./storage-CFCQBSG8.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as Root$1, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze-CNek8EOM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root$1.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var DEFAULT_CHORDMINI_MODELS = {
	beatModel: "auto",
	chordModel: "chord-cnn-lstm"
};
var QUALITY_MAP = {
	"": "",
	maj: "",
	major: "",
	min: "m",
	minor: "m",
	dim: "dim",
	aug: "aug",
	maj6: "6",
	"6": "6",
	min6: "m6",
	maj7: "maj7",
	min7: "m7",
	minmaj7: "mMaj7",
	"7": "7",
	dim7: "dim7",
	hdim7: "m7b5",
	sus2: "sus2",
	sus4: "sus4",
	"9": "9",
	maj9: "maj9",
	min9: "m9",
	"11": "11",
	min11: "m11",
	"13": "13",
	maj13: "maj13",
	min13: "m13"
};
/** "A:min7/b3" -> "Am7"; "N" / "X" -> "N". */
function normalizeChordLabel(raw) {
	const token = (raw ?? "").trim();
	if (!token || token === "N" || token === "X" || /^n\.?c\.?$/i.test(token)) return "N";
	const [core] = token.split("/");
	const [rootPart, qualityPart = ""] = (core ?? "").split(":");
	const root = (rootPart ?? "").trim();
	if (noteToPc(root) === null) return token;
	const mapped = QUALITY_MAP[qualityPart.replace(/\(.*?\)/g, "").trim().toLowerCase()];
	if (mapped !== void 0) return root + mapped;
	return root + qualityPart.trim();
}
function num(v) {
	const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
	return Number.isFinite(n) ? n : null;
}
function firstArray(source, keys) {
	for (const k of keys) {
		const v = source[k];
		if (Array.isArray(v)) return v;
	}
	for (const k of keys) {
		const nested = source[k];
		if (nested && typeof nested === "object") {
			const inner = firstArray(nested, keys);
			if (inner.length) return inner;
		}
	}
	return [];
}
function firstNumber(source, keys) {
	for (const k of keys) {
		const n = num(source[k]);
		if (n !== null) return n;
	}
	for (const k of Object.keys(source)) {
		const nested = source[k];
		if (nested && typeof nested === "object" && !Array.isArray(nested)) {
			const inner = firstNumber(nested, keys);
			if (inner !== null) return inner;
		}
	}
	return null;
}
function parseBeats(payload) {
	const toTime = (b) => {
		if (typeof b === "number") return Number.isFinite(b) ? b : null;
		if (b && typeof b === "object") {
			const o = b;
			return num(o["time"]) ?? num(o["timestamp"]) ?? num(o["start"]) ?? num(o["beat_time"]);
		}
		return num(b);
	};
	return {
		beats: firstArray(payload, [
			"beats",
			"beat_times",
			"beatTimes"
		]).map(toTime).filter((t) => t !== null).sort((a, b) => a - b),
		downbeats: firstArray(payload, [
			"downbeats",
			"downbeat_times",
			"downbeatTimes"
		]).map(toTime).filter((t) => t !== null).sort((a, b) => a - b)
	};
}
function parseChords(payload) {
	const raw = firstArray(payload, [
		"chords",
		"chord_sequence",
		"chordSequence",
		"segments"
	]);
	const out = [];
	for (const item of raw) {
		if (!item || typeof item !== "object") continue;
		const o = item;
		const start = num(o["start"]) ?? num(o["start_time"]) ?? num(o["time"]) ?? num(o["timestamp"]);
		const end = num(o["end"]) ?? num(o["end_time"]);
		const labelRaw = o["chord"] ?? o["label"] ?? o["name"] ?? o["chord_label"];
		if (start === null || typeof labelRaw !== "string") continue;
		out.push({
			start,
			end: end !== null && end > start ? end : start,
			label: normalizeChordLabel(labelRaw),
			confidence: num(o["confidence"]) ?? .8
		});
	}
	out.sort((a, b) => a.start - b.start);
	for (let i = 0; i < out.length; i++) {
		const cur = out[i];
		const next = out[i + 1];
		if (cur.end <= cur.start) cur.end = next ? next.start : cur.start + 2;
	}
	return out;
}
var MAJOR_PROFILE = [
	6.35,
	2.23,
	3.48,
	2.33,
	4.38,
	4.09,
	2.52,
	5.19,
	2.39,
	3.66,
	2.29,
	2.88
];
var MINOR_PROFILE = [
	6.33,
	2.68,
	3.52,
	5.38,
	2.6,
	3.53,
	2.54,
	4.75,
	3.98,
	2.69,
	3.34,
	3.17
];
function chordTones(label) {
	const m = /^([A-G](?:#|b)?)(.*)$/.exec(label);
	if (!m) return [];
	const root = noteToPc(m[1]);
	if (root === null) return [];
	const q = m[2];
	const third = /^(m|min)(?!aj)/.test(q) || /dim/.test(q) ? 3 : 4;
	const fifth = /dim/.test(q) ? 6 : /aug/.test(q) ? 8 : 7;
	const tones = [
		root,
		(root + third) % 12,
		(root + fifth) % 12
	];
	if (/7/.test(q)) tones.push((root + (/maj7/i.test(q) ? 11 : /dim7/.test(q) ? 9 : 10)) % 12);
	return tones;
}
function estimateKeyFromChords(chords) {
	const chroma = new Array(12).fill(0);
	for (const c of chords) {
		if (c.label === "N") continue;
		const dur = Math.max(.1, c.end - c.start);
		chordTones(c.label).forEach((pc, i) => {
			chroma[pc] += dur * (i === 0 ? 1.6 : 1);
		});
	}
	const total = chroma.reduce((a, b) => a + b, 0) || 1;
	const norm = chroma.map((v) => v / total);
	let best = {
		pc: 0,
		mode: "major",
		score: -Infinity
	};
	for (let shift = 0; shift < 12; shift++) {
		let maj = 0;
		let min = 0;
		for (let i = 0; i < 12; i++) {
			const v = norm[(i + shift) % 12];
			maj += v * MAJOR_PROFILE[i];
			min += v * MINOR_PROFILE[i];
		}
		if (maj > best.score) best = {
			pc: shift,
			mode: "major",
			score: maj
		};
		if (min > best.score) best = {
			pc: shift,
			mode: "minor",
			score: min
		};
	}
	return {
		pc: best.pc,
		mode: best.mode
	};
}
function medianInterval(beats) {
	if (beats.length < 4) return null;
	const gaps = [];
	for (let i = 1; i < beats.length; i++) {
		const g = beats[i] - beats[i - 1];
		if (g > .15 && g < 2) gaps.push(g);
	}
	if (gaps.length === 0) return null;
	gaps.sort((a, b) => a - b);
	return gaps[Math.floor(gaps.length / 2)];
}
function toAnalysisResult(beatsPayload, chordsPayload, duration) {
	const { beats, downbeats } = parseBeats(beatsPayload);
	const chords = parseChords(chordsPayload);
	if (chords.length === 0) throw new Error("ChordMini returned no chords");
	const gap = medianInterval(beats);
	const reportedBpm = firstNumber(beatsPayload, [
		"bpm",
		"tempo",
		"BPM",
		"estimated_bpm"
	]);
	const bpm = Math.round(reportedBpm && reportedBpm > 40 && reportedBpm < 240 ? reportedBpm : gap ? 60 / gap : 120);
	let timeSignature = firstNumber(beatsPayload, [
		"time_signature",
		"timeSignature",
		"beats_per_bar"
	]) ?? 0;
	if (!timeSignature || timeSignature < 2 || timeSignature > 12) if (downbeats.length > 1 && gap) {
		const barGaps = [];
		for (let i = 1; i < downbeats.length; i++) barGaps.push(downbeats[i] - downbeats[i - 1]);
		barGaps.sort((a, b) => a - b);
		const barLen = barGaps[Math.floor(barGaps.length / 2)] ?? 0;
		timeSignature = Math.round(barLen / gap) || 4;
	} else timeSignature = 4;
	if (timeSignature < 2 || timeSignature > 12) timeSignature = 4;
	const total = Math.max(duration || 0, chords[chords.length - 1].end, beats[beats.length - 1] ?? 0);
	const grid = beats.length >= 4 ? beats : buildGrid(total, 60 / bpm);
	const beatChords = grid.map((t) => {
		const hit = chords.find((c) => t >= c.start && t < c.end);
		return hit ? hit.label : "N";
	});
	const key = estimateKeyFromChords(chords);
	return {
		duration: total,
		bpm,
		beats: grid,
		key: pcToNote(key.pc) + (key.mode === "minor" ? "m" : ""),
		keyPc: key.pc,
		mode: key.mode,
		timeSignature: Math.round(timeSignature),
		chords,
		beatChords
	};
}
function buildGrid(duration, beatLen) {
	const out = [];
	for (let t = 0; t < duration; t += beatLen) out.push(t);
	return out;
}
async function analyzeWithChordMini(file, duration, models = DEFAULT_CHORDMINI_MODELS) {
	const body = new FormData();
	body.append("file", file, file.name || "audio");
	body.append("beatModel", models.beatModel);
	body.append("chordModel", models.chordModel);
	try {
		const json = await (await fetch("/api/chordmini", {
			method: "POST",
			body
		})).json();
		if (!json["ok"]) return {
			ok: false,
			reason: String(json["reason"] ?? "ChordMini is unavailable")
		};
		return {
			ok: true,
			analysis: toAnalysisResult(json["beats"] ?? {}, json["chords"] ?? {}, duration),
			models
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			reason: "Could not reach ChordMini"
		};
	}
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Import public metadata for a YouTube or Spotify link via oEmbed.
* Streaming platforms do not permit downloading their audio, so only the
* title, artist and artwork are imported — the audio itself comes from a
* file the user picks or records.
*/
var importLink = createServerFn({ method: "POST" }).inputValidator((data) => objectType({ url: stringType().url() }).parse(data)).handler(createSsrRpc("b298ce232634a17964ab65d82ac46e095e9fea5f92fe8bd9d28c0d9d7bd13be7"));
var Input$1 = objectType({
	title: stringType().min(1).max(200),
	artist: stringType().max(200).optional(),
	duration: numberType().min(0).max(3600).optional()
});
/**
* Fetch time-synced lyrics from LRCLIB (the same source ChordMini's
* /api/lrclib-lyrics endpoint uses). Public, key-free and read-only.
*/
var fetchSyncedLyrics = createServerFn({ method: "POST" }).inputValidator((data) => Input$1.parse(data)).handler(createSsrRpc("ab72c86b3b185f929b03576fa049821eac96e98a267d7ed99d4b38dd9357565e"));
var Input = objectType({
	lyrics: stringType().min(1),
	style: enumType([
		"hinglish",
		"tanglish",
		"auto",
		"english"
	])
});
/**
* Transliterates lyric text the user supplied themselves. It never fetches or
* generates song lyrics — it only converts the user's own input line by line.
*/
var romanizeLyrics = createServerFn({ method: "POST" }).inputValidator((input) => Input.parse(input)).handler(createSsrRpc("72c91f808a39d8fc2551eea02a869abba19a1d802a5fb4adc21c96c5dd068b84"));
function AnalyzePage() {
	const navigate = useNavigate();
	const fileRef = (0, import_react.useRef)(null);
	const recorderRef = (0, import_react.useRef)(null);
	const [file, setFile] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [artist, setArtist] = (0, import_react.useState)("");
	const [lyrics, setLyrics] = (0, import_react.useState)("");
	const [synced, setSynced] = (0, import_react.useState)([]);
	const [style, setStyle] = (0, import_react.useState)("auto");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [stage, setStage] = (0, import_react.useState)("");
	const [link, setLink] = (0, import_react.useState)("");
	const [artwork, setArtwork] = (0, import_react.useState)("");
	const [importing, setImporting] = (0, import_react.useState)(false);
	const [fetchingLyrics, setFetchingLyrics] = (0, import_react.useState)(false);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [recSecs, setRecSecs] = (0, import_react.useState)(0);
	const [beatModel, setBeatModel] = (0, import_react.useState)("auto");
	const [chordModel] = (0, import_react.useState)("chord-cnn-lstm");
	const [useChordMini, setUseChordMini] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!recording) return;
		const iv = window.setInterval(() => setRecSecs((s) => s + 1), 1e3);
		return () => window.clearInterval(iv);
	}, [recording]);
	function onPick(f) {
		if (!f) return;
		setFile(f);
		if (!title) setTitle(f.name.replace(/\.[^.]+$/, ""));
	}
	async function runImport() {
		if (!link.trim()) return;
		setImporting(true);
		try {
			const meta = await importLink({ data: { url: link.trim() } });
			setTitle(meta.title);
			if (meta.artist) setArtist(meta.artist);
			setArtwork(meta.thumbnail);
			toast.success(`Imported details from ${meta.source === "youtube" ? "YouTube" : "Spotify"}`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not read that link");
		} finally {
			setImporting(false);
		}
	}
	async function grabLyrics(silent = false) {
		if (!title.trim()) {
			if (!silent) toast.error("Add a title first");
			return [];
		}
		setFetchingLyrics(true);
		try {
			const res = await fetchSyncedLyrics({ data: {
				title: title.trim(),
				...artist.trim() ? { artist: artist.trim() } : {}
			} });
			if (!res.found) {
				if (!silent) toast.error("No lyrics found for that title");
				return [];
			}
			setLyrics(res.plain);
			setSynced(res.synced);
			if (!silent) toast.success(res.synced.length ? "Found time-synced lyrics" : "Found lyrics (no timings available)");
			return res.synced;
		} catch {
			if (!silent) toast.error("Lyrics lookup failed");
			return [];
		} finally {
			setFetchingLyrics(false);
		}
	}
	async function toggleRecord() {
		if (recording) {
			recorderRef.current?.stop();
			return;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: {
				echoCancellation: false,
				noiseSuppression: false,
				autoGainControl: false
			} });
			const rec = new MediaRecorder(stream);
			recorderRef.current = rec;
			const chunks = [];
			rec.ondataavailable = (e) => chunks.push(e.data);
			rec.onstop = () => {
				stream.getTracks().forEach((t) => t.stop());
				const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
				const f = new File([blob], "recording.webm", { type: blob.type });
				setFile(f);
				setRecording(false);
				if (!title) setTitle("Recording");
				toast.success("Recording captured — tap Detect chords");
			};
			setRecSecs(0);
			rec.start();
			setRecording(true);
		} catch {
			toast.error("Microphone access was blocked");
		}
	}
	async function run() {
		if (!file) {
			toast.error("Choose an audio file first");
			return;
		}
		setBusy(true);
		setProgress(2);
		setStage("Decoding audio");
		try {
			const arrayBuffer = await file.arrayBuffer();
			const decoded = await new OfflineAudioContext(1, 1, 22050).decodeAudioData(arrayBuffer.slice(0));
			let analysis = null;
			let engine = "local";
			let models;
			if (useChordMini) {
				setStage("Analysing with ChordMini");
				setProgress(15);
				const outcome = await analyzeWithChordMini(file, decoded.duration, {
					beatModel,
					chordModel
				});
				if (outcome.ok) {
					analysis = outcome.analysis;
					engine = "chordmini";
					models = outcome.models;
					setProgress(85);
				} else toast.warning(`${outcome.reason} — analysing on device instead`);
			}
			if (!analysis) {
				const off = new OfflineAudioContext(1, Math.ceil(decoded.duration * 22050), 22050);
				const src = off.createBufferSource();
				src.buffer = decoded;
				src.connect(off.destination);
				src.start();
				const mono = await off.startRendering();
				analysis = await analyzeAudioBuffer(mono, { onProgress: (p, s) => {
					setProgress(Math.min(85, p * .85));
					setStage(s);
				} });
			}
			let lyricText = lyrics;
			let syncedLines = synced;
			if (!lyricText.trim() && title.trim()) {
				setStage("Looking up lyrics");
				setProgress(88);
				const found = await grabLyrics(true);
				if (found.length) syncedLines = found;
				lyricText = found.length ? found.map((l) => l.text).join("\n") : lyricText;
			}
			let romanized = "";
			if (lyricText.trim() && style !== "english") {
				setStage("Transliterating lyrics");
				setProgress(93);
				try {
					romanized = (await romanizeLyrics({ data: {
						lyrics: lyricText,
						style
					} })).text;
				} catch (e) {
					toast.warning(e instanceof Error ? e.message : "Transliteration skipped");
				}
			}
			const id = newId();
			setStage("Saving");
			setProgress(97);
			await putAudio(id, file);
			saveSong({
				id,
				title: title.trim() || "Untitled",
				artist: artist.trim(),
				createdAt: Date.now(),
				analysis,
				lyrics: lyricText,
				romanized,
				romanizationStyle: style,
				capo: 0,
				transpose: 0,
				notes: "",
				engine,
				...models ? { models } : {},
				...syncedLines.length ? { syncedLyrics: syncedLines } : {}
			});
			setProgress(100);
			toast.success(engine === "chordmini" ? "Analysed with ChordMini" : "Analysis complete (on device)");
			navigate({
				to: "/song/$id",
				params: { id }
			});
		} catch (e) {
			console.error(e);
			toast.error(e instanceof Error ? e.message : "Could not analyze that file");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Analyze a song"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "ChordMini handles beat and chord detection, with on-device analysis as backup."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-5 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "link",
						children: "YouTube or Spotify link"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Imports the title, artist and artwork. Streaming apps don't allow their audio to be downloaded, so record the track as it plays or pick the file below."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$2, {
							id: "link",
							value: link,
							placeholder: "https://youtu.be/… or open.spotify.com/track/…",
							onChange: (e) => setLink(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => void runImport(),
							disabled: importing,
							children: importing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-4" })
						})]
					}),
					artwork && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: artwork,
						alt: `Artwork for ${title || "the imported track"}`,
						loading: "lazy",
						className: "mt-3 h-24 w-full rounded-lg object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: recording ? "destructive" : "secondary",
						className: "mt-3 w-full",
						onClick: () => void toggleRecord(),
						children: [recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), recording ? `Stop recording (${recSecs}s)` : "Record what's playing"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "audio/*",
						className: "hidden",
						onChange: (e) => onPick(e.target.files?.[0] ?? null)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => fileRef.current?.click(),
						className: "flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-surface-2/40 px-4 py-8 text-center transition-colors hover:border-primary/60",
						children: file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music4, { className: "size-7 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: file.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Tap to choose another file"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-7 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Choose an audio file"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "MP3, WAV, M4A, FLAC, OGG"
							})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "title",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$2, {
								id: "title",
								value: title,
								onChange: (e) => setTitle(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "artist",
								children: "Artist"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$2, {
								id: "artist",
								value: artist,
								onChange: (e) => setArtist(e.target.value)
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Analysis engine" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: useChordMini ? beatModel : "local",
						onValueChange: (v) => {
							if (v === "local") setUseChordMini(false);
							else {
								setUseChordMini(true);
								setBeatModel(v);
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "auto",
								children: "ChordMini · auto beat model"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "madmom",
								children: "ChordMini · madmom (fast, 3/4 & 4/4)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "beat-transformer",
								children: "ChordMini · beat-transformer (slow, complex mixes)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "local",
								children: "On-device only (offline)"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: useChordMini ? "Chords via chord-cnn-lstm. ChordMini allows 2 analyses per minute — if it's busy, the on-device engine takes over automatically." : "Everything runs on your device — your audio never leaves the phone."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "lyrics",
							children: "Lyrics (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => void grabLyrics(),
							disabled: fetchingLyrics,
							children: [fetchingLyrics ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextSearch, { className: "size-4" }), "Fetch lyrics"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Fetch time-synced lyrics by title and artist, or paste your own. Add markers like [Verse] or [Chorus] to shape the sheet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "lyrics",
						value: lyrics,
						onChange: (e) => {
							setLyrics(e.target.value);
							setSynced([]);
						},
						rows: 7,
						placeholder: "[Verse]\nyour lyric line here\nanother line\n\n[Chorus]\n...",
						className: "mt-2 font-mono text-xs"
					}),
					synced.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-primary",
						children: [synced.length, " timed lines — chords will align to the exact words."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Transliteration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: style,
							onValueChange: (v) => setStyle(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "auto",
									children: "Auto detect (Hinglish / Tanglish / other)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "hinglish",
									children: "Hinglish (Hindi in Roman script)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "tanglish",
									children: "Tanglish (Tamil in Roman script)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "english",
									children: "None"
								})
							] })]
						})]
					})
				]
			}),
			busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-primary" }), stage]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: progress,
					className: "mt-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "lg",
				className: "mt-5 w-full",
				onClick: run,
				disabled: busy || !file,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-4" }), busy ? "Analyzing…" : "Detect chords"]
			})
		]
	});
}
//#endregion
export { AnalyzePage as component };
