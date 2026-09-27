import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/song._id-BpB-d9Mp.js
var $$splitComponentImporter = () => import("./song._id-CtQ_u4iU.mjs");
var Route = createFileRoute("/song/$id")({
	head: () => ({ meta: [
		{ title: "Chord Sheet — ChordLab" },
		{
			name: "description",
			content: "Your detected chord sheet with transposition, capo, autoscroll and PDF or image export."
		},
		{
			property: "og:title",
			content: "Chord Sheet — ChordLab"
		},
		{
			property: "og:description",
			content: "Chords, lyrics and transliteration in one printable sheet."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
