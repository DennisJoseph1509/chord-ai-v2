import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { a as getInstrument, c as voicingsFor, i as LIBRARY_ROOTS, n as InstrumentPicker, o as pianoNotes, r as LIBRARY_QUALITIES, s as useInstrument, t as ChordDiagram } from "./prefs-D7MjM5HM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chords-DLmz_DD7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChordLibraryPage() {
	const [instrument, setInstrument] = useInstrument();
	const [root, setRoot] = (0, import_react.useState)("C");
	const [quality, setQuality] = (0, import_react.useState)("");
	const [q, setQ] = (0, import_react.useState)("");
	const inst = getInstrument(instrument);
	const chord = root + quality;
	const results = (0, import_react.useMemo)(() => {
		const term = q.trim();
		if (!term) return null;
		return LIBRARY_ROOTS.flatMap((r) => LIBRARY_QUALITIES.map((x) => r + x.id).filter((c) => c.toLowerCase().startsWith(term.toLowerCase()))).slice(0, 24);
	}, [q]);
	const voicings = (0, import_react.useMemo)(() => inst.kind === "fretted" ? voicingsFor(chord, inst, 3) : [], [chord, inst]);
	const keys = inst.kind === "keys" ? pianoNotes(chord) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Chord library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Every chord, drawn for whichever instrument you play."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-5 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstrumentPicker, {
					value: instrument,
					onChange: setInstrument
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-3",
					placeholder: "Search a chord, e.g. F#m7",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			}),
			results ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-4 grid grid-cols-3 gap-3 p-4",
				children: [results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-3 text-sm text-muted-foreground",
					children: "No chord matches that."
				}), results.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setQ("");
						const m = /^([A-G]#?)(.*)$/.exec(c);
						if (m) {
							setRoot(m[1]);
							setQuality(m[2]);
						}
					},
					className: "flex justify-center rounded-lg p-1 transition-colors hover:bg-surface-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChordDiagram, {
						chord: c,
						instrument,
						size: 72
					})
				}, c))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel mt-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-wide text-muted-foreground",
							children: "Root"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-6 gap-2",
							children: LIBRARY_ROOTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: r === root ? "default" : "secondary",
								onClick: () => setRoot(r),
								children: r
							}, r))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[11px] uppercase tracking-wide text-muted-foreground",
							children: "Type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: LIBRARY_QUALITIES.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: x.id === quality ? "default" : "secondary",
								onClick: () => setQuality(x.id),
								children: x.name
							}, x.id || "maj"))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel mt-4 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "chord-token text-2xl",
							children: chord
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: inst.name
						})]
					}), inst.kind === "keys" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChordDiagram, {
							chord,
							instrument,
							size: 140,
							showLabel: false
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm text-chord",
							children: keys?.names.join(" · ")
						})]
					}) : voicings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: [
							"No playable shape for ",
							chord,
							" on ",
							inst.short,
							"."
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap justify-center gap-5",
						children: voicings.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChordDiagram, {
								chord,
								instrument,
								size: 92,
								variant: i,
								showLabel: false
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground",
								children: i === 0 ? "Easiest" : `Voicing ${i + 1}`
							})]
						}, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel mt-4 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-sm font-semibold",
						children: [
							"All ",
							LIBRARY_QUALITIES.find((x) => x.id === quality)?.name.toLowerCase(),
							" chords"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-3 gap-3",
						children: LIBRARY_ROOTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRoot(r),
							className: "flex justify-center rounded-lg p-1 transition-colors hover:bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChordDiagram, {
								chord: r + quality,
								instrument,
								size: 72
							})
						}, r))
					})]
				})
			] })
		]
	});
}
//#endregion
export { ChordLibraryPage as component };
