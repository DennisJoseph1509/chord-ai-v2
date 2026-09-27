import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { l as Square, y as Mic } from "../_libs/lucide-react.mjs";
import { i as pcToNote } from "./chords-BRRbQvn_.mjs";
import { r as detectPitch } from "./audio-analysis-B2s289hv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tuner-B_9V33eq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STANDARD = [
	"E2",
	"A2",
	"D3",
	"G3",
	"B3",
	"E4"
];
function TunerPage() {
	const [running, setRunning] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("—");
	const [cents, setCents] = (0, import_react.useState)(0);
	const [freq, setFreq] = (0, import_react.useState)(0);
	const ctxRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const rafRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => () => cleanup(), []);
	function cleanup() {
		cancelAnimationFrame(rafRef.current);
		streamRef.current?.getTracks().forEach((t) => t.stop());
		ctxRef.current?.close();
		ctxRef.current = null;
		streamRef.current = null;
	}
	async function start() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: {
				echoCancellation: false,
				noiseSuppression: false,
				autoGainControl: false
			} });
			streamRef.current = stream;
			const ctx = new AudioContext();
			ctxRef.current = ctx;
			const analyser = ctx.createAnalyser();
			analyser.fftSize = 4096;
			ctx.createMediaStreamSource(stream).connect(analyser);
			const buf = new Float32Array(analyser.fftSize);
			const loop = () => {
				analyser.getFloatTimeDomainData(buf);
				const f = detectPitch(buf, ctx.sampleRate);
				if (f && f > 55 && f < 1400) {
					const midi = 69 + 12 * Math.log2(f / 440);
					const rounded = Math.round(midi);
					setNote(pcToNote((rounded % 12 + 12) % 12) + (Math.floor(rounded / 12) - 1));
					setCents(Math.round((midi - rounded) * 100));
					setFreq(Math.round(f * 10) / 10);
				}
				rafRef.current = requestAnimationFrame(loop);
			};
			loop();
			setRunning(true);
		} catch {
			toast.error("Microphone access was blocked");
		}
	}
	function stop() {
		cleanup();
		setRunning(false);
		setNote("—");
		setCents(0);
		setFreq(0);
	}
	const inTune = Math.abs(cents) <= 5 && note !== "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Tuner"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Chromatic, accurate to a few cents."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-5 flex flex-col items-center gap-5 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: inTune ? "text-7xl font-bold text-accent transition-colors" : "text-7xl font-bold text-foreground transition-colors",
						children: note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: freq ? `${freq} Hz` : "listening…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-3 w-full rounded-full bg-surface-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-[-6px] h-6 w-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: inTune ? "absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-all" : "absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-all",
							style: { left: `${Math.min(100, Math.max(0, 50 + cents))}%` }
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: note === "—" ? "Play a note" : `${cents > 0 ? "+" : ""}${cents} cents`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "w-full",
						variant: running ? "destructive" : "default",
						onClick: running ? stop : start,
						children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), running ? "Stop" : "Start tuner"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Standard tuning"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex justify-between",
					children: STANDARD.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: note === s ? "rounded-lg bg-primary px-3 py-1.5 font-mono text-sm text-primary-foreground" : "rounded-lg bg-surface-2 px-3 py-1.5 font-mono text-sm text-muted-foreground",
						children: s
					}, s))
				})]
			})
		]
	});
}
//#endregion
export { TunerPage as component };
