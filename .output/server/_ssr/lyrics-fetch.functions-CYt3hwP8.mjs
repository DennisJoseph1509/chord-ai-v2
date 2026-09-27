import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { i as stringType, n as numberType, r as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lyrics-fetch.functions-CYt3hwP8.js
var Input = objectType({
	title: stringType().min(1).max(200),
	artist: stringType().max(200).optional(),
	duration: numberType().min(0).max(3600).optional()
});
/** Parse an LRC body into timestamped lines. */
function parseLrc(lrc) {
	const out = [];
	for (const raw of lrc.replace(/\r/g, "").split("\n")) {
		const stamps = [...raw.matchAll(/\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\]/g)];
		if (stamps.length === 0) continue;
		const text = raw.replace(/\[[^\]]*\]/g, "").trim();
		if (!text) continue;
		for (const s of stamps) {
			const frac = s[3] ? Number(`0.${s[3]}`) : 0;
			out.push({
				time: Number(s[1]) * 60 + Number(s[2]) + frac,
				text
			});
		}
	}
	return out.sort((a, b) => a.time - b.time);
}
var fetchSyncedLyrics_createServerFn_handler = createServerRpc({
	id: "ab72c86b3b185f929b03576fa049821eac96e98a267d7ed99d4b38dd9357565e",
	name: "fetchSyncedLyrics",
	filename: "src/lib/lyrics-fetch.functions.ts"
}, (opts) => fetchSyncedLyrics.__executeServer(opts));
var fetchSyncedLyrics = createServerFn({ method: "POST" }).inputValidator((data) => Input.parse(data)).handler(fetchSyncedLyrics_createServerFn_handler, async ({ data }) => {
	const params = new URLSearchParams();
	params.set("track_name", data.title.trim());
	if (data.artist?.trim()) params.set("artist_name", data.artist.trim());
	let hits = [];
	try {
		const res = await fetch(`https://lrclib.net/api/search?${params.toString()}`, { headers: {
			accept: "application/json",
			"user-agent": "ChordLab (chord sheet app)"
		} });
		if (res.ok) hits = await res.json();
	} catch (error) {
		console.error("LRCLIB search failed", error);
	}
	if (!Array.isArray(hits) || hits.length === 0) return {
		found: false,
		plain: "",
		synced: []
	};
	const best = hits.map((h) => {
		let score = 0;
		if (h.syncedLyrics) score += 10;
		if (h.plainLyrics) score += 2;
		if (data.duration && h.duration) score += Math.max(0, 6 - Math.abs(h.duration - data.duration) / 2);
		return {
			h,
			score
		};
	}).sort((a, b) => b.score - a.score)[0].h;
	const synced = best.syncedLyrics ? parseLrc(best.syncedLyrics) : [];
	const plain = (best.plainLyrics ?? synced.map((l) => l.text).join("\n")).trim();
	return {
		found: Boolean(plain || synced.length),
		plain,
		synced,
		...best.trackName ? { trackName: best.trackName } : {},
		...best.artistName ? { artistName: best.artistName } : {}
	};
});
//#endregion
export { fetchSyncedLyrics_createServerFn_handler };
