//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BYTMViiZ.js
var manifest = {
	"72c91f808a39d8fc2551eea02a869abba19a1d802a5fb4adc21c96c5dd068b84": {
		functionName: "romanizeLyrics_createServerFn_handler",
		importer: () => import("./_ssr/lyrics.functions-wWoKshs0.mjs")
	},
	"ab72c86b3b185f929b03576fa049821eac96e98a267d7ed99d4b38dd9357565e": {
		functionName: "fetchSyncedLyrics_createServerFn_handler",
		importer: () => import("./_ssr/lyrics-fetch.functions-CYt3hwP8.mjs")
	},
	"b298ce232634a17964ab65d82ac46e095e9fea5f92fe8bd9d28c0d9d7bd13be7": {
		functionName: "importLink_createServerFn_handler",
		importer: () => import("./_ssr/link-import.functions-COSCLJhi.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
