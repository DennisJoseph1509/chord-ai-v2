import { a as __toESM } from "../_runtime.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as LayoutGrid, E as Guitar, F as AudioLines, S as Library, y as Mic } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$8 } from "./song._id-BpB-d9Mp.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/router-4Nm3UZdQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CW1id6vN.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var items = [
	{
		to: "/",
		label: "Library",
		Icon: Library
	},
	{
		to: "/analyze",
		label: "Analyze",
		Icon: AudioLines
	},
	{
		to: "/live",
		label: "Live",
		Icon: Mic
	},
	{
		to: "/chords",
		label: "Chords",
		Icon: LayoutGrid
	},
	{
		to: "/tuner",
		label: "Tuner",
		Icon: Guitar
	}
];
function BottomNav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/85 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mx-auto flex max-w-lg items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)]",
			children: items.map(({ to, label, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					className: "flex flex-col items-center gap-1 rounded-xl px-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors",
					activeOptions: { exact: to === "/" },
					activeProps: { className: "text-primary" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						strokeWidth: 2
					}), label]
				})
			}, to))
		})
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
			},
			{ title: "ChordLab — AI Chord & Lyric Sheets" },
			{
				name: "description",
				content: "Detect chords, key and tempo from any song, add Hinglish or Tanglish lyrics and export chord sheets."
			},
			{
				name: "theme-color",
				content: "#1b1e26"
			},
			{
				property: "og:title",
				content: "ChordLab — AI Chord & Lyric Sheets"
			},
			{
				property: "og:description",
				content: "On-device chord detection with printable chord sheets."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-screen pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})
		]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-BrZc5ZBr.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "ChordLab — AI Chord & Lyric Sheets for Any Song" },
		{
			name: "description",
			content: "Detect chords, key and tempo from any song on your phone, add Hinglish or Tanglish lyrics, and export an Ultimate-Guitar style chord sheet as PDF or image."
		},
		{
			property: "og:title",
			content: "ChordLab — AI Chord & Lyric Sheets"
		},
		{
			property: "og:description",
			content: "On-device chord detection, live mic mode, tuner, transliterated lyrics and PDF chord sheets."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./analyze-CNek8EOM.mjs");
var Route$5 = createFileRoute("/analyze")({
	head: () => ({ meta: [
		{ title: "Analyze a Song — ChordLab" },
		{
			name: "description",
			content: "Import a YouTube or Spotify link, pick an audio file or record what's playing, and get chords, key, tempo and a chord sheet with Hinglish and Tanglish lyrics."
		},
		{
			property: "og:title",
			content: "Analyze a Song — ChordLab"
		},
		{
			property: "og:description",
			content: "Chords, key and tempo from any track, right on your phone."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./chords-DLmz_DD7.mjs");
var Route$4 = createFileRoute("/chords")({
	head: () => ({ meta: [
		{ title: "Chord Library — Guitar, Piano, Ukulele, Bass & Banjo — ChordLab" },
		{
			name: "description",
			content: "Browse chord diagrams for guitar, drop D, bass, ukulele, banjo, mandolin and piano — every root and quality with alternative voicings."
		},
		{
			property: "og:title",
			content: "Chord Library — ChordLab"
		},
		{
			property: "og:description",
			content: "Chord shapes for every instrument, from major and minor to 7ths, sus and dim."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./live-CDpNsCkE.mjs");
var Route$3 = createFileRoute("/live")({
	head: () => ({ meta: [
		{ title: "Live Chord Detection — One Chord Per Beat — ChordLab" },
		{
			name: "description",
			content: "Point your phone at a speaker or instrument and see one chord locked in on every beat or half beat, with diagrams for guitar, piano, ukulele, bass and banjo."
		},
		{
			property: "og:title",
			content: "Live Chord Detection — ChordLab"
		},
		{
			property: "og:description",
			content: "Real-time chord recognition on a beat grid, for any instrument."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./tuner-B_9V33eq.mjs");
var Route$2 = createFileRoute("/tuner")({
	head: () => ({ meta: [
		{ title: "Guitar Tuner — ChordLab" },
		{
			name: "description",
			content: "A precise chromatic tuner for guitar, ukulele and voice built into ChordLab."
		},
		{
			property: "og:title",
			content: "Guitar Tuner — ChordLab"
		},
		{
			property: "og:description",
			content: "Chromatic instrument tuner with cent accuracy."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Proxy to a ChordMini backend (https://www.chordmini.me/docs).
*
* The audio file is forwarded as multipart/form-data to the ChordMini Flask
* backend for beat tracking and chord recognition. The base URL is private to
* the deployment and is read from CHORDMINI_API_URL at request time.
*/
var MAX_BYTES = 20971520;
function fail(reason, status = 200) {
	return Response.json({
		ok: false,
		reason
	}, { status });
}
async function callChordMini(base, path, file, model) {
	const body = new FormData();
	body.append("file", file, file.name || "audio");
	if (model) body.append("model", model);
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 12e4);
	try {
		const res = await fetch(`${base}${path}`, {
			method: "POST",
			body,
			signal: controller.signal
		});
		if (res.status === 429) throw new Error("rate-limited");
		if (!res.ok) throw new Error(`${path} returned ${res.status}`);
		return await res.json();
	} finally {
		clearTimeout(timer);
	}
}
var Route$1 = createFileRoute("/api/chordmini")({ server: { handlers: { POST: async ({ request }) => {
	const base = (processModule.env["CHORDMINI_API_URL"] ?? "").replace(/\/+$/, "");
	if (!base) return fail("ChordMini is not configured");
	if (!(request.headers.get("content-type") ?? "").includes("multipart/form-data")) return fail("Expected multipart/form-data", 415);
	let form;
	try {
		form = await request.formData();
	} catch {
		return fail("Could not read the uploaded audio", 400);
	}
	const file = form.get("file");
	if (!(file instanceof File)) return fail("No audio file provided", 400);
	if (file.size === 0) return fail("Audio file is empty", 400);
	if (file.size > MAX_BYTES) return fail("Audio file is larger than 20 MB", 413);
	const beatModel = String(form.get("beatModel") ?? "auto");
	const chordModel = String(form.get("chordModel") ?? "chord-cnn-lstm");
	const allowedBeat = /* @__PURE__ */ new Set([
		"auto",
		"madmom",
		"beat-transformer"
	]);
	const allowedChord = /* @__PURE__ */ new Set(["chord-cnn-lstm"]);
	if (!allowedBeat.has(beatModel) || !allowedChord.has(chordModel)) return fail("Unknown model requested", 400);
	try {
		const [beats, chords] = await Promise.all([callChordMini(base, "/api/detect-beats", file, beatModel), callChordMini(base, "/api/recognize-chords", file, chordModel)]);
		return Response.json({
			ok: true,
			beats,
			chords,
			models: {
				beatModel,
				chordModel
			}
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "unknown error";
		console.error("ChordMini proxy failed:", message);
		if (message === "rate-limited") return fail("ChordMini is rate-limited right now");
		if (message.includes("abort")) return fail("ChordMini timed out");
		return fail("ChordMini could not analyse this audio");
	}
} } } });
/**
* Stem separation proxy. POST an audio file to start a Demucs job on Replicate,
* GET `?id=` to poll it, GET `?download=` to stream a finished stem back to the
* app (keeps the API token server-side and avoids cross-origin fetch issues).
*/
var MODEL = "ryan5453/demucs";
function json(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" }
	});
}
var Route = createFileRoute("/api/separate")({ server: { handlers: {
	POST: async ({ request }) => {
		const token = processModule.env["REPLICATE_API_TOKEN"];
		if (!token) return json({ error: "Stem separation is not configured yet." }, 503);
		const file = (await request.formData()).get("file");
		if (!(file instanceof File)) return json({ error: "No audio file was sent." }, 400);
		if (file.size > 62914560) return json({ error: "That file is too large to separate (60 MB max)." }, 400);
		const upload = new FormData();
		upload.append("content", file, file.name || "audio.mp3");
		const uploaded = await fetch("https://api.replicate.com/v1/files", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
			body: upload
		});
		if (!uploaded.ok) return json({ error: `Upload failed (${uploaded.status}).` }, 502);
		const audioUrl = (await uploaded.json()).urls?.get;
		if (!audioUrl) return json({ error: "Upload failed." }, 502);
		const started = await fetch(`https://api.replicate.com/v1/models/${MODEL}/predictions`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ input: {
				audio: audioUrl,
				stem: "",
				output_format: "mp3"
			} })
		});
		const prediction = await started.json();
		if (!started.ok || !prediction.id) return json({ error: prediction.detail ?? "Could not start separation." }, 502);
		return json({ id: prediction.id });
	},
	GET: async ({ request }) => {
		const token = processModule.env["REPLICATE_API_TOKEN"];
		const url = new URL(request.url);
		const download = url.searchParams.get("download");
		if (download) {
			if (!/^https:\/\/[a-z0-9.-]*replicate\.(delivery|com)\//i.test(download)) return json({ error: "Unsupported download source." }, 400);
			const res = await fetch(download, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
			if (!res.ok || !res.body) return json({ error: "Download failed." }, 502);
			return new Response(res.body, { headers: { "Content-Type": res.headers.get("content-type") ?? "audio/mpeg" } });
		}
		if (!token) return json({ error: "Stem separation is not configured yet." }, 503);
		const id = url.searchParams.get("id");
		if (!id || !/^[a-z0-9]+$/i.test(id)) return json({ error: "Missing job id." }, 400);
		const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, { headers: { Authorization: `Bearer ${token}` } });
		const body = await res.json();
		if (!res.ok) return json({ error: "Could not check that job." }, 502);
		return json({
			status: body.status ?? "unknown",
			error: body.error ?? null,
			output: body.output ?? null
		});
	}
} } });
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AnalyzeRoute: Route$5.update({
		id: "/analyze",
		path: "/analyze",
		getParentRoute: () => Route$7
	}),
	ChordsRoute: Route$4.update({
		id: "/chords",
		path: "/chords",
		getParentRoute: () => Route$7
	}),
	LiveRoute: Route$3.update({
		id: "/live",
		path: "/live",
		getParentRoute: () => Route$7
	}),
	TunerRoute: Route$2.update({
		id: "/tuner",
		path: "/tuner",
		getParentRoute: () => Route$7
	}),
	ApiChordminiRoute: Route$1.update({
		id: "/api/chordmini",
		path: "/api/chordmini",
		getParentRoute: () => Route$7
	}),
	ApiSeparateRoute: Route.update({
		id: "/api/separate",
		path: "/api/separate",
		getParentRoute: () => Route$7
	}),
	SongIdRoute: Route$8.update({
		id: "/song/$id",
		path: "/song/$id",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
