import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/link-import.functions-COSCLJhi.js
var importLink_createServerFn_handler = createServerRpc({
	id: "b298ce232634a17964ab65d82ac46e095e9fea5f92fe8bd9d28c0d9d7bd13be7",
	name: "importLink",
	filename: "src/lib/link-import.functions.ts"
}, (opts) => importLink.__executeServer(opts));
var importLink = createServerFn({ method: "POST" }).inputValidator((data) => objectType({ url: stringType().url() }).parse(data)).handler(importLink_createServerFn_handler, async ({ data }) => {
	const url = data.url.trim();
	const host = new URL(url).hostname.replace(/^www\./, "");
	const source = /youtube\.com|youtu\.be/.test(host) ? "youtube" : /spotify\.com/.test(host) ? "spotify" : "other";
	if (source === "other") throw new Error("Paste a YouTube or Spotify link");
	const endpoint = source === "youtube" ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}` : `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
	const res = await fetch(endpoint, { headers: { accept: "application/json" } });
	if (!res.ok) throw new Error("Could not read that link");
	const json = await res.json();
	let title = (json.title ?? "").trim();
	let artist = (json.author_name ?? "").replace(/\s*-\s*Topic$/i, "").trim();
	const dash = title.match(/^(.{1,60}?)\s+[-–—]\s+(.+)$/);
	if (dash) {
		artist = dash[1].trim();
		title = dash[2].trim();
	}
	title = title.replace(/\s*[([][^)\]]*(official|video|lyric|audio|hd|4k)[^)\]]*[)\]]/gi, "").trim();
	return {
		source,
		title,
		artist,
		thumbnail: json.thumbnail_url ?? "",
		url
	};
});
//#endregion
export { importLink_createServerFn_handler };
