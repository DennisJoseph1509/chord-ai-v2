import { a as __toESM } from "../_runtime.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { A as FileImage, D as Gauge, I as ArrowLeft, O as Flag, T as Headphones, _ as Music2, a as Type, b as LoaderCircle, f as Repeat, h as Pause, k as FileText, m as Play, n as VolumeX, o as Trash2, p as Plus, r as Volume2, s as Timer, u as SlidersHorizontal, v as Minus, w as Languages } from "../_libs/lucide-react.mjs";
import { a as transposeChord } from "./chords-BRRbQvn_.mjs";
import { n as getAudio, r as putAudio, t as deleteAudio } from "./audio-store-ClwueBhG.mjs";
import { a as saveSong, n as getSong, t as deleteSong } from "./storage-CFCQBSG8.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as InstrumentPicker, s as useInstrument, t as ChordDiagram } from "./prefs-D7MjM5HM.mjs";
import { t as Slider } from "./slider-lX4rQHvT.mjs";
import { t as Route } from "./song._id-BpB-d9Mp.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/song._id-CtQ_u4iU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
/** Ultimate-Guitar style monospace chord sheet. */
var ChordSheetView = (0, import_react.forwardRef)(function ChordSheetView({ sheet, title, artist, keyLabel, bpm, capo, transpose, useFlats, showRoman, fontSize, activeChordTime }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "rounded-xl bg-sheet p-4 text-sheet-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4 border-b border-border pb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold leading-tight",
					children: title || "Untitled"
				}),
				artist && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: artist
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-[11px] text-muted-foreground",
					children: [
						"Key ",
						keyLabel,
						" · ",
						Math.round(bpm),
						" BPM · Capo ",
						capo ? `fret ${capo}` : "none",
						transpose ? ` · Transposed ${transpose > 0 ? "+" : ""}${transpose}` : ""
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				fontSize: `${fontSize}px`,
				lineHeight: 1.45
			},
			className: "font-mono",
			children: sheet.sections.map((section, si) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mb-1 font-sans text-xs font-bold uppercase tracking-widest text-accent",
					children: [
						"[",
						section.name,
						"]"
					]
				}), section.lines.map((line, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1",
					children: [
						line.chords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "whitespace-pre font-mono",
							children: renderChordLine(line.chords, transpose, useFlats, activeChordTime)
						}),
						line.lyric && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "whitespace-pre-wrap",
							children: line.lyric
						}),
						showRoman && line.roman && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "whitespace-pre-wrap text-muted-foreground",
							children: line.roman
						})
					]
				}, li))]
			}, si))
		})]
	});
});
function renderChordLine(chords, transpose, useFlats, activeTime) {
	const out = [];
	let col = 0;
	chords.forEach((c, i) => {
		if (c.pos > col) {
			out.push(" ".repeat(c.pos - col));
			col = c.pos;
		}
		const label = transposeChord(c.label, transpose, useFlats);
		const active = activeTime != null && Math.abs(activeTime - c.time) < .001;
		out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: active ? "chord-token rounded bg-primary/25 px-0.5" : "chord-token",
			children: label
		}, i));
		out.push(" ");
		col += label.length + 1;
	});
	return out;
}
/**
* Practice player: independent speed and pitch control, per-stem mixing,
* a beat-locked metronome with count-in, and A/B section looping.
* Everything runs in the browser on top of Web Audio + SoundTouch.
*/
var STEMS = [
	"vocals",
	"drums",
	"bass",
	"other"
];
var STEM_LABELS = {
	full: "Original",
	vocals: "Vocals",
	drums: "Drums",
	bass: "Bass",
	other: "Other"
};
var StudioPlayer = class {
	ctx;
	master;
	tracks = /* @__PURE__ */ new Map();
	PitchShifter = null;
	raf = 0;
	schedTimer = 0;
	startCtxTime = 0;
	startPos = 0;
	beatIdx = 0;
	duration = 0;
	position = 0;
	playing = false;
	tempo = 1;
	semitones = 0;
	loop = null;
	metronome = false;
	countIn = false;
	beats = [];
	beatsPerBar = 4;
	onTick = null;
	constructor() {
		const Ctor = window.AudioContext ?? window.webkitAudioContext;
		this.ctx = new Ctor();
		this.master = this.ctx.createGain();
		this.master.connect(this.ctx.destination);
	}
	get stems() {
		return [...this.tracks.keys()];
	}
	async load(name, blob) {
		const buffer = await this.ctx.decodeAudioData(await blob.arrayBuffer());
		const gain = this.ctx.createGain();
		gain.connect(this.master);
		const existing = this.tracks.get(name);
		existing?.shifter?.disconnect();
		this.tracks.set(name, {
			buffer,
			gain,
			shifter: null,
			volume: existing?.volume ?? 1,
			muted: existing?.muted ?? false
		});
		this.duration = Math.max(this.duration, buffer.duration);
		this.applyMix();
	}
	/** Only these tracks are audible; the rest are silenced. */
	setActive(names) {
		for (const [name, t] of this.tracks) t.muted = !names.includes(name);
		this.applyMix();
	}
	setVolume(name, volume) {
		const t = this.tracks.get(name);
		if (!t) return;
		t.volume = volume;
		this.applyMix();
	}
	setMuted(name, muted) {
		const t = this.tracks.get(name);
		if (!t) return;
		t.muted = muted;
		this.applyMix();
	}
	isMuted(name) {
		return this.tracks.get(name)?.muted ?? false;
	}
	volumeOf(name) {
		return this.tracks.get(name)?.volume ?? 1;
	}
	applyMix() {
		for (const t of this.tracks.values()) t.gain.gain.value = t.muted ? 0 : t.volume;
	}
	setTempo(tempo) {
		this.tempo = tempo;
		if (this.playing) {
			this.rebase();
			for (const t of this.tracks.values()) if (t.shifter) t.shifter.tempo = tempo;
		}
	}
	setPitch(semitones) {
		this.semitones = semitones;
		if (this.playing) {
			for (const t of this.tracks.values()) if (t.shifter) t.shifter.pitchSemitones = semitones;
		}
	}
	rebase() {
		this.position = this.currentPosition();
		this.startPos = this.position;
		this.startCtxTime = this.ctx.currentTime;
		this.beatIdx = this.beats.findIndex((b) => b > this.position);
		if (this.beatIdx < 0) this.beatIdx = this.beats.length;
	}
	currentPosition() {
		if (!this.playing) return this.position;
		const elapsed = (this.ctx.currentTime - this.startCtxTime) * this.tempo;
		return Math.max(this.startPos, Math.min(this.duration, this.startPos + elapsed));
	}
	async play() {
		if (this.playing || this.tracks.size === 0) return;
		if (this.ctx.state === "suspended") await this.ctx.resume();
		if (!this.PitchShifter) this.PitchShifter = (await import("../_libs/soundtouchjs.mjs").then((n) => n.t)).PitchShifter;
		const Shifter = this.PitchShifter;
		const beatLen = this.beats.length > 1 ? this.beats[1] - this.beats[0] || .5 : .5;
		const lead = this.countIn && this.metronome ? this.beatsPerBar * beatLen / this.tempo : 0;
		this.playing = true;
		this.startPos = this.position;
		this.startCtxTime = this.ctx.currentTime + lead;
		this.beatIdx = Math.max(0, this.beats.findIndex((b) => b > this.position));
		if (lead > 0) for (let i = 0; i < this.beatsPerBar; i++) this.click(this.ctx.currentTime + i * beatLen / this.tempo, i === 0);
		const start = () => {
			if (!this.playing) return;
			for (const t of this.tracks.values()) {
				const shifter = new Shifter(this.ctx, t.buffer, 4096);
				if (!shifter) continue;
				shifter.tempo = this.tempo;
				shifter.pitchSemitones = this.semitones;
				shifter.percentagePlayed = this.duration ? this.position / this.duration : 0;
				shifter.connect(t.gain);
				t.shifter = shifter;
			}
		};
		if (lead > 0) window.setTimeout(start, lead * 1e3);
		else start();
		this.schedTimer = window.setInterval(() => this.schedule(), 25);
		const tick = () => {
			if (!this.playing) return;
			this.position = this.currentPosition();
			if (this.loop && this.position >= this.loop.end) this.seek(this.loop.start);
			else if (this.position >= this.duration - .05) {
				this.pause();
				this.position = this.duration;
			}
			this.onTick?.(this.position);
			this.raf = requestAnimationFrame(tick);
		};
		this.raf = requestAnimationFrame(tick);
	}
	pause() {
		if (!this.playing) return;
		this.position = this.currentPosition();
		this.playing = false;
		cancelAnimationFrame(this.raf);
		window.clearInterval(this.schedTimer);
		for (const t of this.tracks.values()) {
			t.shifter?.disconnect();
			t.shifter = null;
		}
		this.onTick?.(this.position);
	}
	seek(time) {
		const target = Math.max(0, Math.min(this.duration, time));
		if (!this.playing) {
			this.position = target;
			this.onTick?.(target);
			return;
		}
		this.position = target;
		this.startPos = target;
		this.startCtxTime = this.ctx.currentTime;
		this.beatIdx = Math.max(0, this.beats.findIndex((b) => b > target));
		for (const t of this.tracks.values()) {
			if (!t.shifter) continue;
			t.shifter.percentagePlayed = this.duration ? target / this.duration : 0;
		}
		this.onTick?.(target);
	}
	/** Schedules metronome clicks a short way ahead of the audio clock. */
	schedule() {
		if (!this.metronome || !this.playing) return;
		const horizon = this.currentPosition() + .3 * this.tempo;
		while (this.beatIdx < this.beats.length && this.beats[this.beatIdx] <= horizon) {
			const beat = this.beats[this.beatIdx];
			const when = this.startCtxTime + (beat - this.startPos) / this.tempo;
			if (when > this.ctx.currentTime) this.click(when, this.beatIdx % this.beatsPerBar === 0);
			this.beatIdx++;
		}
	}
	click(when, accent) {
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.frequency.value = accent ? 1600 : 1e3;
		gain.gain.setValueAtTime(accent ? .5 : .28, when);
		gain.gain.exponentialRampToValueAtTime(1e-4, when + .06);
		osc.connect(gain);
		gain.connect(this.master);
		osc.start(when);
		osc.stop(when + .07);
	}
	destroy() {
		this.pause();
		this.ctx.close();
	}
};
async function startSeparation(file) {
	const form = new FormData();
	form.append("file", file, "audio");
	const res = await fetch("/api/separate", {
		method: "POST",
		body: form
	});
	const body = await res.json();
	if (!res.ok || !body.id) throw new Error(body.error ?? "Could not start separation.");
	return body.id;
}
async function pollSeparation(id) {
	const res = await fetch(`/api/separate?id=${encodeURIComponent(id)}`);
	const body = await res.json();
	if (!res.ok) throw new Error(body.error ?? "Could not check that job.");
	return body;
}
async function fetchStem(url) {
	const res = await fetch(`/api/separate?download=${encodeURIComponent(url)}`);
	if (!res.ok) throw new Error("Could not download a separated track.");
	return await res.blob();
}
/** Picks the four stems out of whatever the model returned. */
function stemUrls(output) {
	return STEMS.flatMap((name) => {
		const url = output[name];
		return url ? [{
			name,
			url
		}] : [];
	});
}
/** Practice studio: mix stems, change speed and key, loop a section, click track. */
function StudioPanel({ song }) {
	const playerRef = (0, import_react.useRef)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [position, setPosition] = (0, import_react.useState)(0);
	const [speed, setSpeed] = (0, import_react.useState)(100);
	const [pitch, setPitch] = (0, import_react.useState)(0);
	const [metronome, setMetronome] = (0, import_react.useState)(false);
	const [countIn, setCountIn] = (0, import_react.useState)(true);
	const [loop, setLoop] = (0, import_react.useState)(null);
	const [loopA, setLoopA] = (0, import_react.useState)(null);
	const [tracks, setTracks] = (0, import_react.useState)([]);
	const [mix, setMix] = (0, import_react.useState)({});
	const [separating, setSeparating] = (0, import_react.useState)(false);
	const [sepStage, setSepStage] = (0, import_react.useState)("");
	const duration = song.analysis.duration || 1;
	const markers = (0, import_react.useMemo)(() => {
		const out = [];
		for (const line of song.syncedLyrics ?? []) {
			const m = /^\s*\[([^\]]+)\]/.exec(line.text);
			if (m) out.push({
				time: line.time,
				label: m[1]
			});
		}
		if (out.length === 0) {
			const beats = song.analysis.beats;
			const bar = song.analysis.timeSignature || 4;
			for (let i = 0; i < beats.length; i += bar * 8) out.push({
				time: beats[i],
				label: `Bar ${Math.floor(i / bar) + 1}`
			});
		}
		return out.slice(0, 24);
	}, [song]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const player = new StudioPlayer();
		playerRef.current = player;
		player.beats = song.analysis.beats;
		player.beatsPerBar = song.analysis.timeSignature || 4;
		player.onTick = (p) => {
			setPosition(p);
			setPlaying(player.playing);
		};
		(async () => {
			const loaded = [];
			const full = await getAudio(song.id);
			if (full) {
				await player.load("full", full);
				loaded.push("full");
			}
			for (const stem of STEMS) {
				const blob = await getAudio(`${song.id}::${stem}`);
				if (blob) {
					await player.load(stem, blob);
					loaded.push(stem);
				}
			}
			if (cancelled) return;
			if (loaded.length > 1) player.setMuted("full", true);
			setTracks(loaded);
			setMix(Object.fromEntries(loaded.map((n) => [n, {
				volume: 1,
				muted: n === "full" && loaded.length > 1
			}])));
			setReady(loaded.length > 0);
		})();
		return () => {
			cancelled = true;
			player.destroy();
			playerRef.current = null;
		};
	}, [
		song.id,
		song.analysis.beats,
		song.analysis.timeSignature
	]);
	function toggle() {
		const p = playerRef.current;
		if (!p) return;
		if (p.playing) {
			p.pause();
			setPlaying(false);
		} else {
			p.play();
			setPlaying(true);
		}
	}
	function seek(t) {
		playerRef.current?.seek(t);
		setPosition(t);
	}
	async function separate() {
		const blob = await getAudio(song.id);
		if (!blob) {
			toast.error("The audio for this song isn't saved on this device");
			return;
		}
		setSeparating(true);
		setSepStage("Uploading");
		try {
			const id = await startSeparation(blob);
			setSepStage("Separating (this can take a few minutes)");
			let output = null;
			for (let i = 0; i < 300; i++) {
				await new Promise((r) => setTimeout(r, 4e3));
				const res = await pollSeparation(id);
				if (res.status === "succeeded") {
					output = res.output;
					break;
				}
				if (res.status === "failed" || res.status === "canceled") throw new Error(res.error ?? "Separation failed");
			}
			if (!output) throw new Error("Separation timed out");
			setSepStage("Downloading tracks");
			const player = playerRef.current;
			const loaded = ["full"];
			for (const { name, url } of stemUrls(output)) {
				const stemBlob = await fetchStem(url);
				await putAudio(`${song.id}::${name}`, stemBlob);
				await player?.load(name, stemBlob);
				loaded.push(name);
			}
			player?.setMuted("full", true);
			setTracks(loaded);
			setMix(Object.fromEntries(loaded.map((n) => [n, {
				volume: 1,
				muted: n === "full"
			}])));
			toast.success("Tracks separated");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Separation failed");
		} finally {
			setSeparating(false);
			setSepStage("");
		}
	}
	const hasStems = tracks.some((t) => t !== "full");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel mt-4 space-y-5 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Practice studio"
				})]
			}),
			!ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "The audio for this song isn't available on this device."
			}),
			ready && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							onClick: toggle,
							children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							className: "flex-1",
							min: 0,
							max: Math.round(duration),
							step: 1,
							value: [Math.min(position, duration)],
							onValueChange: ([v]) => seek(v ?? 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-muted-foreground",
							children: [
								fmt$1(position),
								" / ",
								fmt$1(duration)
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-4 text-muted-foreground" }),
						label: "Speed",
						value: `${speed}%`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							className: "w-40",
							min: 40,
							max: 150,
							step: 5,
							value: [speed],
							onValueChange: ([v]) => {
								const next = v ?? 100;
								setSpeed(next);
								playerRef.current?.setTempo(next / 100);
							}
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "size-4 text-muted-foreground" }),
						label: "Pitch",
						value: `${pitch > 0 ? "+" : ""}${pitch}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							className: "w-40",
							min: -6,
							max: 6,
							step: 1,
							value: [pitch],
							onValueChange: ([v]) => {
								const next = v ?? 0;
								setPitch(next);
								playerRef.current?.setPitch(next);
							}
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4 text-muted-foreground" }),
						label: "Metronome",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: metronome,
							onCheckedChange: (v) => {
								setMetronome(v);
								if (playerRef.current) playerRef.current.metronome = v;
							}
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4 text-muted-foreground" }),
						label: "One bar count-in",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: countIn,
							onCheckedChange: (v) => {
								setCountIn(v);
								if (playerRef.current) playerRef.current.countIn = v;
							}
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "size-4 text-muted-foreground" }), " Loop section"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: loopA !== null ? "default" : "secondary",
							onClick: () => {
								if (loopA === null) {
									setLoopA(position);
									toast.success(`Loop start at ${fmt$1(position)}`);
								} else if (position > loopA + 1) {
									const region = {
										start: loopA,
										end: position
									};
									setLoop(region);
									setLoopA(null);
									if (playerRef.current) playerRef.current.loop = region;
									toast.success(`Looping ${fmt$1(region.start)} – ${fmt$1(region.end)}`);
								} else toast.error("Play a little further before setting the end");
							},
							children: loopA === null ? "Set A" : "Set B"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => {
								setLoop(null);
								setLoopA(null);
								if (playerRef.current) playerRef.current.loop = null;
							},
							children: "Clear"
						})]
					})]
				}), loop && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-primary",
					children: [
						"Looping ",
						fmt$1(loop.start),
						" – ",
						fmt$1(loop.end)
					]
				})] }),
				markers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4 text-muted-foreground" }), " Sections"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: markers.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => seek(m.time),
						className: "rounded-full border border-border bg-surface-2 px-3 py-1 text-xs transition-colors hover:border-primary/60",
						children: [
							m.label,
							" · ",
							fmt$1(m.time)
						]
					}, `${m.time}-${i}`))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "size-4 text-muted-foreground" }), " Tracks"]
						}), !hasStems && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "secondary",
							disabled: separating,
							onClick: () => void separate(),
							children: [separating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, separating ? "Separating…" : "Separate vocals & instruments"]
						})]
					}),
					separating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: sepStage
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: tracks.map((name) => {
							const state = mix[name] ?? {
								volume: 1,
								muted: false
							};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-muted-foreground",
										"aria-label": `${state.muted ? "Unmute" : "Mute"} ${STEM_LABELS[name]}`,
										onClick: () => {
											const muted = !state.muted;
											playerRef.current?.setMuted(name, muted);
											setMix((m) => ({
												...m,
												[name]: {
													...state,
													muted
												}
											}));
										},
										children: state.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-16 text-xs",
										children: STEM_LABELS[name]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
										className: "flex-1",
										min: 0,
										max: 100,
										step: 5,
										value: [Math.round(state.volume * 100)],
										onValueChange: ([v]) => {
											const volume = (v ?? 100) / 100;
											playerRef.current?.setVolume(name, volume);
											setMix((m) => ({
												...m,
												[name]: {
													...state,
													volume
												}
											}));
										}
									})
								]
							}, name);
						})
					})
				] })
			] })
		]
	});
}
function Row({ icon, label, value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2 text-sm",
			children: [
				icon,
				" ",
				label,
				value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted-foreground",
					children: value
				})
			]
		}), children]
	});
}
function fmt$1(s) {
	return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}
async function downloadSheetPdf(text, filename) {
	const { jsPDF } = await import("../_libs/jspdf.mjs").then((n) => n.t);
	const doc = new jsPDF({
		unit: "pt",
		format: "a4"
	});
	const margin = 40;
	const lineHeight = 13;
	const pageHeight = doc.internal.pageSize.getHeight();
	let y = margin;
	const lines = text.split("\n");
	doc.setFont("courier", "normal");
	doc.setFontSize(10);
	for (const line of lines) {
		if (y > pageHeight - margin) {
			doc.addPage();
			y = margin;
		}
		const wrapped = doc.splitTextToSize(line || " ", 515);
		for (const w of wrapped) {
			doc.text(w, margin, y);
			y += lineHeight;
		}
	}
	doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}
async function downloadSheetImage(node, filename) {
	const { toPng } = await import("../_libs/html-to-image.mjs").then((n) => n.t);
	const dataUrl = await toPng(node, {
		pixelRatio: 2,
		backgroundColor: getComputedStyle(document.body).backgroundColor || "#0d0f14",
		cacheBust: true
	});
	const a = document.createElement("a");
	a.href = dataUrl;
	a.download = filename.endsWith(".png") ? filename : `${filename}.png`;
	a.click();
}
function downloadText(text, filename) {
	const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
	a.click();
	setTimeout(() => URL.revokeObjectURL(a.href), 1e3);
}
var SECTION_WORDS = "intro|verse|pre[- ]?chorus|chorus|hook|bridge|refrain|interlude|solo|outro|coda|charanam|pallavi|anupallavi|mukhda|antara";
/** Bracketed marker, e.g. [Chorus 2] or (Bridge). */
var BRACKET_SECTION_RE = /^\s*[[(]\s*([^\]\n)]{1,40})\s*[\])]\s*:?\s*$/;
/** Bare marker on its own line, e.g. "Chorus:" or "Verse 2". */
var BARE_SECTION_RE = new RegExp(`^\\s*(${SECTION_WORDS})\\s*\\d{0,2}\\s*:?\\s*$`, "i");
function sectionNameOf(line) {
	const bracket = BRACKET_SECTION_RE.exec(line);
	if (bracket) return titleCase(bracket[1].trim());
	if (BARE_SECTION_RE.exec(line)) return titleCase(line.replace(/[:]/g, "").trim());
	return null;
}
function isSectionLine(line) {
	return sectionNameOf(line) !== null;
}
/** Collapse repeated chords and drop no-chord regions. */
function condenseChords(events) {
	const out = [];
	for (const e of events) {
		if (e.label === "N") continue;
		const last = out[out.length - 1];
		if (last && last.label === e.label) last.end = e.end;
		else out.push({ ...e });
	}
	return out;
}
function splitBlocks(lyrics) {
	const blocks = [];
	let current = null;
	let n = 0;
	for (const raw of lyrics.replace(/\r/g, "").split("\n")) {
		const line = raw.trimEnd();
		const sectionName = sectionNameOf(line);
		if (sectionName) {
			current = {
				name: sectionName,
				lines: []
			};
			blocks.push(current);
			continue;
		}
		if (!line.trim()) {
			current = null;
			continue;
		}
		if (!current) {
			n += 1;
			current = {
				name: `Part ${n}`,
				lines: []
			};
			blocks.push(current);
		}
		current.lines.push(line);
	}
	return blocks.filter((b) => b.lines.length > 0);
}
function titleCase(s) {
	return s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}
/** Snap a column to the nearest word start so chords sit above syllables. */
function snapToWord(line, col) {
	if (col <= 0) return 0;
	if (col >= line.length) return line.length;
	const starts = [];
	let inWord = false;
	for (let i = 0; i < line.length; i++) {
		const ws = /\s/.test(line[i]);
		if (!ws && !inWord) starts.push(i);
		inWord = !ws;
	}
	if (starts.length === 0) return col;
	return starts.reduce((a, b) => Math.abs(b - col) < Math.abs(a - col) ? b : a, starts[0]);
}
function normalizeForMatch(s) {
	return s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}
/**
* Map each lyric line to the timestamped line it corresponds to, in order.
* Returns null when too few lines match to trust the timings.
*/
function windowsFromSynced(allLines, synced, songEnd) {
	if (synced.length < 2) return null;
	const times = allLines.map(() => null);
	let si = 0;
	let matched = 0;
	for (let i = 0; i < allLines.length; i++) {
		const target = normalizeForMatch(allLines[i]);
		if (!target) continue;
		for (let probe = si; probe < Math.min(synced.length, si + 8); probe++) {
			const candidate = normalizeForMatch(synced[probe].text);
			if (!candidate) continue;
			if (candidate === target || candidate.startsWith(target) || target.startsWith(candidate)) {
				times[i] = synced[probe].time;
				si = probe + 1;
				matched += 1;
				break;
			}
		}
	}
	if (matched < Math.max(2, Math.ceil(allLines.length * .5))) return null;
	const first = times.findIndex((t) => t !== null);
	const last = times.length - 1 - [...times].reverse().findIndex((t) => t !== null);
	for (let i = 0; i < first; i++) times[i] = synced[0].time;
	for (let i = last + 1; i < times.length; i++) times[i] = times[last];
	for (let i = first; i <= last; i++) {
		if (times[i] !== null) continue;
		let j = i;
		while (j <= last && times[j] === null) j += 1;
		const before = times[i - 1];
		const after = times[j] ?? before;
		const steps = j - i + 1;
		for (let k = i; k < j; k++) times[k] = before + (after - before) * (k - i + 1) / steps;
		i = j - 1;
	}
	const end = Math.max(songEnd, times[last] + 4);
	return times.map((t, i) => ({
		from: t,
		to: i + 1 < times.length ? Math.max(t + .2, times[i + 1]) : end
	}));
}
function buildSheet(analysis, lyrics, romanized = "", synced = []) {
	const chords = condenseChords(analysis.chords);
	const romanLines = romanized.replace(/\r/g, "").split("\n").filter((l) => l.trim() && !isSectionLine(l));
	if (!lyrics.trim()) return instrumentalSheet(analysis, chords);
	const blocks = splitBlocks(lyrics);
	const allLines = blocks.flatMap((b) => b.lines);
	if (allLines.length === 0 || chords.length === 0) return instrumentalSheet(analysis, chords);
	const songStart = chords[0].start;
	const songEnd = chords[chords.length - 1].end;
	const span = Math.max(.001, songEnd - songStart);
	let windows = windowsFromSynced(allLines, synced, songEnd);
	if (!windows) {
		const weights = allLines.map((l) => Math.max(4, l.trim().length));
		const totalWeight = weights.reduce((a, b) => a + b, 0);
		windows = [];
		let acc = 0;
		for (const w of weights) {
			const from = songStart + acc / totalWeight * span;
			acc += w;
			windows.push({
				from,
				to: songStart + acc / totalWeight * span
			});
		}
	}
	const perLine = allLines.map(() => []);
	let li = 0;
	for (const c of chords) {
		while (li < windows.length - 1 && c.start >= windows[li].to) li += 1;
		const win = windows[li];
		const lyric = allLines[li];
		const frac = Math.min(1, Math.max(0, (c.start - win.from) / Math.max(.001, win.to - win.from)));
		const target = Math.round(frac * Math.max(lyric.length - 1, 1));
		perLine[li].push({
			pos: target,
			label: c.label,
			time: c.start
		});
	}
	let carry = null;
	for (let i = 0; i < perLine.length; i++) {
		const list = perLine[i];
		if (list.length === 0) {
			if (carry) list.push({
				...carry,
				pos: 0
			});
		} else carry = list[list.length - 1];
	}
	const laidOut = perLine.map((list, i) => {
		const lyric = allLines[i];
		const placed = [];
		for (const c of list) {
			let pos = lyric.trim() ? snapToWord(lyric, c.pos) : c.pos;
			const prev = placed[placed.length - 1];
			if (prev) {
				if (prev.label === c.label && pos <= prev.pos + prev.label.length + 1) continue;
				if (pos <= prev.pos + prev.label.length) pos = prev.pos + prev.label.length + 1;
			}
			if (pos > lyric.length && placed.length > 0) continue;
			placed.push({
				...c,
				pos
			});
		}
		return placed;
	});
	let idx = 0;
	let romanIdx = 0;
	return { sections: blocks.map((block) => ({
		name: block.name,
		lines: block.lines.map((lyric) => {
			const placed = laidOut[idx++] ?? [];
			const roman = romanLines[romanIdx++];
			return {
				chords: placed,
				lyric,
				...roman && roman.trim() !== lyric.trim() ? { roman } : {}
			};
		})
	})) };
}
function instrumentalSheet(analysis, chords) {
	const barLen = 60 / (analysis.bpm || 120) * analysis.timeSignature;
	const bars = [];
	for (const c of chords) {
		const barIdx = Math.floor(c.start / barLen);
		bars[barIdx] = bars[barIdx] ?? [];
		bars[barIdx].push(c);
	}
	return { sections: [{
		name: "Progression",
		lines: chunk(bars.filter(Boolean), 4).map((group) => {
			const flat = group.flat();
			let col = 0;
			const placed = [];
			for (const c of flat) {
				placed.push({
					pos: col,
					label: c.label,
					time: c.start
				});
				col += Math.max(c.label.length + 1, 6);
			}
			return {
				chords: placed,
				lyric: ""
			};
		})
	}] };
}
function chunk(arr, size) {
	const out = [];
	for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
	return out;
}
function chordLineToText(chords, semitones, useFlats) {
	let out = "";
	for (const c of chords) {
		if (c.pos > out.length) out += " ".repeat(c.pos - out.length);
		out += transposeChord(c.label, semitones, useFlats) + " ";
	}
	return out.trimEnd();
}
function sheetToText(sheet, o) {
	const head = [
		o.title || "Untitled",
		o.artist ? `by ${o.artist}` : "",
		`Key: ${o.key}   Tempo: ${Math.round(o.bpm)} BPM   Capo: ${o.capo ? `${o.capo}th fret` : "none"}`,
		""
	].filter((l) => l !== null);
	const body = [];
	for (const section of sheet.sections) {
		body.push(`[${section.name}]`);
		for (const line of section.lines) {
			const cl = chordLineToText(line.chords, o.transpose, o.useFlats);
			if (cl) body.push(cl);
			if (line.lyric) body.push(line.lyric);
			if (o.showRoman && line.roman) body.push(line.roman);
		}
		body.push("");
	}
	return [...head, ...body].join("\n");
}
function uniqueChords(sheet, semitones, useFlats) {
	const set = /* @__PURE__ */ new Set();
	for (const s of sheet.sections) for (const l of s.lines) for (const c of l.chords) set.add(transposeChord(c.label, semitones, useFlats));
	return [...set];
}
function SongPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [song, setSong] = (0, import_react.useState)(null);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [instrument, setInstrument] = useInstrument();
	const [fontSize, setFontSize] = (0, import_react.useState)(13);
	const [showRoman, setShowRoman] = (0, import_react.useState)(true);
	const [useFlats, setUseFlats] = (0, import_react.useState)(false);
	const [scrollSpeed, setScrollSpeed] = (0, import_react.useState)(0);
	const [audioUrl, setAudioUrl] = (0, import_react.useState)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [time, setTime] = (0, import_react.useState)(0);
	const sheetRef = (0, import_react.useRef)(null);
	const audioRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setSong(getSong(id) ?? null);
		setLoaded(true);
	}, [id]);
	(0, import_react.useEffect)(() => {
		let url = null;
		getAudio(id).then((blob) => {
			if (blob) {
				url = URL.createObjectURL(blob);
				setAudioUrl(url);
			}
		});
		return () => {
			if (url) URL.revokeObjectURL(url);
		};
	}, [id]);
	(0, import_react.useEffect)(() => {
		if (!scrollSpeed) return;
		const iv = window.setInterval(() => window.scrollBy(0, scrollSpeed), 60);
		return () => window.clearInterval(iv);
	}, [scrollSpeed]);
	const sheet = (0, import_react.useMemo)(() => song ? buildSheet(song.analysis, song.lyrics, song.romanized, song.syncedLyrics ?? []) : null, [song]);
	const activeChord = (0, import_react.useMemo)(() => {
		if (!song) return null;
		return song.analysis.chords.find((c) => time >= c.start && time < c.end) ?? null;
	}, [song, time]);
	const chordList = (0, import_react.useMemo)(() => sheet ? uniqueChords(sheet, song?.transpose ?? 0, useFlats) : [], [
		sheet,
		song?.transpose,
		useFlats
	]);
	if (!loaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (!song || !sheet) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "That song is no longer in your library."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Back to library"
			})
		})]
	});
	function update(patch) {
		if (!song) return;
		const next = {
			...song,
			...patch
		};
		setSong(next);
		saveSong(next);
	}
	const textOptions = {
		title: song.title,
		artist: song.artist,
		key: song.analysis.key,
		bpm: song.analysis.bpm,
		capo: song.capo,
		transpose: song.transpose,
		useFlats,
		showRoman
	};
	const slug = (song.title || "chord-sheet").toLowerCase().replace(/[^a-z0-9]+/g, "-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Library"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => {
						deleteSong(song.id);
						deleteAudio(song.id);
						toast.success("Deleted");
						navigate({ to: "/" });
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-2 space-y-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
							label: "Transpose",
							value: song.transpose,
							display: `${song.transpose > 0 ? "+" : ""}${song.transpose}`,
							onChange: (v) => update({ transpose: Math.max(-11, Math.min(11, v)) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
							label: "Capo",
							value: song.capo,
							display: song.capo ? `Fret ${song.capo}` : "None",
							onChange: (v) => update({ capo: Math.max(0, Math.min(11, v)) })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { className: "size-4 text-muted-foreground" }), " Text size"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							className: "w-36",
							min: 10,
							max: 22,
							step: 1,
							value: [fontSize],
							onValueChange: ([v]) => setFontSize(v ?? 13)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-4 text-muted-foreground" }), " Show transliteration"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: showRoman,
							onCheckedChange: setShowRoman
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Use flats (♭)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: useFlats,
							onCheckedChange: setUseFlats
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Autoscroll"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							className: "w-36",
							min: 0,
							max: 6,
							step: 1,
							value: [scrollSpeed],
							onValueChange: ([v]) => setScrollSpeed(v ?? 0)
						})]
					})
				]
			}),
			audioUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							onClick: () => {
								const a = audioRef.current;
								if (!a) return;
								if (a.paused) {
									a.play();
									setPlaying(true);
								} else {
									a.pause();
									setPlaying(false);
								}
							},
							children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "chord-token text-2xl leading-none",
								children: activeChord && activeChord.label !== "N" ? activeChord.label : "—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-primary",
									style: { width: `${time / (song.analysis.duration || 1) * 100}%` }
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-muted-foreground",
							children: [
								fmt(time),
								" / ",
								fmt(song.analysis.duration)
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
					ref: audioRef,
					src: audioUrl,
					onTimeUpdate: (e) => setTime(e.currentTarget.currentTime),
					onEnded: () => setPlaying(false),
					className: "hidden"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioPanel, { song }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Chords used"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstrumentPicker, {
						className: "mt-3",
						value: instrument,
						onChange: setInstrument
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-3",
						children: chordList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChordDiagram, {
							chord: c,
							instrument
						}, c))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel mt-4 p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChordSheetView, {
					ref: sheetRef,
					sheet,
					title: song.title,
					artist: song.artist,
					keyLabel: song.analysis.key,
					bpm: song.analysis.bpm,
					capo: song.capo,
					transpose: song.transpose,
					useFlats,
					showRoman,
					fontSize,
					activeChordTime: activeChord?.start ?? null
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => void downloadSheetPdf(sheetToText(sheet, textOptions), slug),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), " PDF"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: async () => {
							if (!sheetRef.current) return;
							try {
								await downloadSheetImage(sheetRef.current, slug);
							} catch {
								toast.error("Image export failed");
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "size-4" }), " Image"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => downloadText(sheetToText(sheet, textOptions), slug),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { className: "size-4" }), " Text"]
					})
				]
			})
		]
	});
}
function Stepper({ label, value, display, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface-2 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center text-[11px] uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => onChange(value - 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-sm",
					children: display
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => onChange(value + 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})
			]
		})]
	});
}
function fmt(s) {
	return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}
//#endregion
export { SongPage as component };
