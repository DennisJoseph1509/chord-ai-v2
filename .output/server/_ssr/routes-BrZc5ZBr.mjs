import { a as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { E as Guitar, F as AudioLines, _ as Music2, d as Search, y as Mic } from "../_libs/lucide-react.mjs";
import { r as listSongs } from "./storage-CFCQBSG8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BrZc5ZBr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LibraryPage() {
	const [songs, setSongs] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const load = () => setSongs(listSongs());
		load();
		window.addEventListener("chordlab:songs", load);
		return () => window.removeEventListener("chordlab:songs", load);
	}, []);
	const filtered = songs.filter((s) => (s.title + " " + s.artist).toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
					children: "ChordLab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-semibold tracking-tight",
					children: "Your song library"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Chords, key, tempo, lyrics and printable sheets — all on your device."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/analyze",
						Icon: AudioLines,
						label: "Analyze"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/live",
						Icon: Mic,
						label: "Live"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/tuner",
						Icon: Guitar,
						label: "Tuner"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search your songs",
					className: "pl-9"
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-5 flex flex-col items-center gap-3 p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "size-8 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: songs.length === 0 ? "No songs analyzed yet" : "Nothing matches that search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Upload an audio file and ChordLab will work out the chords, key and tempo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/analyze",
							children: "Analyze your first song"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-2",
				children: filtered.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/song/$id",
					params: { id: s.id },
					className: "panel flex items-center gap-3 p-3 transition-colors hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chord-token text-sm",
							children: s.analysis.key
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: s.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: [
								s.artist || "Unknown artist",
								" · ",
								Math.round(s.analysis.bpm),
								" BPM ·",
								" ",
								s.analysis.chords.length,
								" changes"
							]
						})]
					})]
				}) }, s.id))
			})
		]
	});
}
function QuickAction({ to, Icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "panel flex flex-col items-center gap-1.5 py-4 transition-colors hover:border-primary/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium",
			children: label
		})]
	});
}
//#endregion
export { LibraryPage as component };
