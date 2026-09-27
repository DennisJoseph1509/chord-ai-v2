import { a as __toESM } from "../_runtime.mjs";
import { n as init_performance, r as performance_default } from "../_libs/canvg+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { l as Square, o as Trash2, s as Timer, y as Mic } from "../_libs/lucide-react.mjs";
import { t as SHARP_NOTES } from "./chords-BRRbQvn_.mjs";
import { t as LiveChordDetector } from "./audio-analysis-B2s289hv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as InstrumentPicker, s as useInstrument, t as ChordDiagram } from "./prefs-D7MjM5HM.mjs";
import { t as Slider } from "./slider-lX4rQHvT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-CDpNsCkE.js
init_performance();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LivePage() {
	const detectorRef = (0, import_react.useRef)(null);
	const latestRef = (0, import_react.useRef)("N");
	const tapsRef = (0, import_react.useRef)([]);
	const countRef = (0, import_react.useRef)(0);
	const [instrument, setInstrument] = useInstrument();
	const [running, setRunning] = (0, import_react.useState)(false);
	const [chord, setChord] = (0, import_react.useState)("—");
	const [chroma, setChroma] = (0, import_react.useState)(Array(12).fill(0));
	const [grid, setGrid] = (0, import_react.useState)([]);
	const [bpm, setBpm] = (0, import_react.useState)(90);
	const [division, setDivision] = (0, import_react.useState)(1);
	const [pulse, setPulse] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => () => detectorRef.current?.stop(), []);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const ms = 60 / bpm * 1e3 * (division === 2 ? .5 : 1);
		const iv = window.setInterval(() => {
			const label = latestRef.current;
			const n = countRef.current++;
			const perBar = 4 * division;
			setPulse(n % perBar);
			setGrid((g) => [...g, {
				label: label === "N" ? "–" : label,
				bar: Math.floor(n / perBar) + 1,
				beat: n % perBar + 1
			}].slice(-64));
		}, ms);
		return () => window.clearInterval(iv);
	}, [
		running,
		bpm,
		division
	]);
	const tap = (0, import_react.useCallback)(() => {
		const now = performance_default.now();
		const taps = tapsRef.current.filter((t) => now - t < 3e3);
		taps.push(now);
		tapsRef.current = taps;
		if (taps.length >= 2) {
			const gaps = taps.slice(1).map((t, i) => t - taps[i]);
			const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
			const next = Math.round(6e4 / avg);
			if (next >= 40 && next <= 220) setBpm(next);
		}
	}, []);
	async function start() {
		try {
			const d = new LiveChordDetector();
			detectorRef.current = d;
			await d.start((label, c) => {
				latestRef.current = label;
				setChord(label === "N" ? "—" : label);
				setChroma(Array.from(c));
			});
			countRef.current = 0;
			setGrid([]);
			setRunning(true);
		} catch {
			toast.error("Microphone access was blocked");
		}
	}
	function stop() {
		detectorRef.current?.stop();
		detectorRef.current = null;
		setRunning(false);
		setChord("—");
	}
	const perBar = 4 * division;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Live chords"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"One chord is locked in on every ",
					division === 2 ? "half beat" : "beat",
					" while you play."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-5 flex flex-col items-center gap-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-28 items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chord-token text-6xl",
							children: chord
						})
					}),
					chord !== "—" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChordDiagram, {
						chord,
						size: 96,
						instrument
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 grid w-full grid-cols-12 gap-1",
						children: chroma.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-16 w-full items-end rounded bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded bg-accent transition-[height] duration-100",
									style: { height: `${Math.max(2, v * 100)}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-muted-foreground",
								children: SHARP_NOTES[i]
							})]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "w-full",
						variant: running ? "destructive" : "default",
						onClick: running ? stop : start,
						children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), running ? "Stop listening" : "Start listening"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 space-y-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstrumentPicker, {
						value: instrument,
						onChange: setInstrument
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Resolution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: division === 1 ? "default" : "secondary",
								onClick: () => setDivision(1),
								children: "1 / beat"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: division === 2 ? "default" : "secondary",
								onClick: () => setDivision(2),
								children: "1 / half beat"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Tempo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-sm text-chord",
							children: [bpm, " BPM"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 40,
						max: 200,
						step: 1,
						value: [bpm],
						onValueChange: ([v]) => setBpm(v ?? 90)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						className: "w-full",
						onClick: tap,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4" }), " Tap tempo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center gap-2",
						children: Array.from({ length: perBar }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2.5 rounded-full transition-colors ${running && pulse === i ? "bg-primary" : "bg-surface-2"}` }, i))
					})
				]
			}),
			grid.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Beat grid"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setGrid([]),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-1",
						style: { gridTemplateColumns: `repeat(${perBar}, minmax(0, 1fr))` },
						children: grid.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-md px-1 py-2 text-center font-mono text-xs ${c.beat === 1 ? "bg-surface-2 text-chord" : "bg-surface-2/50 text-chord"}`,
							children: c.label
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[11px] text-muted-foreground",
						children: [
							"Each cell is one ",
							division === 2 ? "half beat" : "beat",
							"; each row is a bar of 4."
						]
					})
				]
			})
		]
	});
}
//#endregion
export { LivePage as component };
