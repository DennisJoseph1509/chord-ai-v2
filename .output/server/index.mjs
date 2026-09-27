globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-27T05:09:03.251Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-27T05:09:03.252Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/analyze-CpZEOF_F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b7f-cb5qwsQMOGxl8Ffj4Gij/rk+ASc\"",
		"mtime": "2026-09-27T05:09:01.370Z",
		"size": 23423,
		"path": "../public/assets/analyze-CpZEOF_F.js"
	},
	"/assets/audio-analysis-g2qwSPhN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d26-ROmZZtkCg7id6eJfSdwsRBxTDGE\"",
		"mtime": "2026-09-27T05:09:01.370Z",
		"size": 15654,
		"path": "../public/assets/audio-analysis-g2qwSPhN.js"
	},
	"/assets/audio-store-1Tn_VEDu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"380-fS88+vMIu9a+l2KUKdCmolr+OYM\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 896,
		"path": "../public/assets/audio-store-1Tn_VEDu.js"
	},
	"/assets/button-D94UfORJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7e77-/HW7Zv9W+RlHWqqRBBNkOKnvyWA\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 32375,
		"path": "../public/assets/button-D94UfORJ.js"
	},
	"/assets/chords-CTZuWCpl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9e-UuxqB+FWg8gsWNc/R+0uwdlHc7M\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 3742,
		"path": "../public/assets/chords-CTZuWCpl.js"
	},
	"/assets/chords-DHLJtVbO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32d-cCwUUVrGlQxYbggv7VbRHAUpep4\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 813,
		"path": "../public/assets/chords-DHLJtVbO.js"
	},
	"/assets/createLucideIcon-CrbgW4pO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"337a-xPOGFfmlkiNNRHzrKDXaznDTDTQ\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 13178,
		"path": "../public/assets/createLucideIcon-CrbgW4pO.js"
	},
	"/assets/es-BOAyukm3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30da-7QCw7oqhREYLtBu0XwsK50HV1KY\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 12506,
		"path": "../public/assets/es-BOAyukm3.js"
	},
	"/assets/index-CYS4jVs0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d9e5-hKXIq2gX7TbAUxGTlZ0sppbE9ns\"",
		"mtime": "2026-09-27T05:09:01.370Z",
		"size": 383461,
		"path": "../public/assets/index-CYS4jVs0.js"
	},
	"/assets/index.es-BnroMYBe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f83-vnKSXULGtHDg+qU8/IJp9xkvDKo\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 151427,
		"path": "../public/assets/index.es-BnroMYBe.js"
	},
	"/assets/input-D8Xm7spA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29a-JwBYPswgGWBpTZ2EtWaLRKyVf/w\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 666,
		"path": "../public/assets/input-D8Xm7spA.js"
	},
	"/assets/jspdf.es.min-BarH-ISQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61698-43cldsjvgpWzTLIH5cHff2aV6Cw\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 399e3,
		"path": "../public/assets/jspdf.es.min-BarH-ISQ.js"
	},
	"/assets/link-DH-N-9sl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5afd-ntLfuinxDk5mgEvnf4VyIxJ/1oI\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 23293,
		"path": "../public/assets/link-DH-N-9sl.js"
	},
	"/assets/live-DvUzOkyl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1290-Bii9ZGIZ5vRxG/xqe+B+zV7ye8o\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 4752,
		"path": "../public/assets/live-DvUzOkyl.js"
	},
	"/assets/music-2-al4ht0Hw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa-GF0uM915cq52+1n3T35n0WfZgbY\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 170,
		"path": "../public/assets/music-2-al4ht0Hw.js"
	},
	"/assets/prefs-F4OV2ftC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2d-pk1livwAdpnDnLkVvikIdVCvtMw\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 7981,
		"path": "../public/assets/prefs-F4OV2ftC.js"
	},
	"/assets/purify.es-ByxKKxy8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6db4-uR8yHa3mxAT+uGvnUvKVTdPEEME\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 28084,
		"path": "../public/assets/purify.es-ByxKKxy8.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-cXuNNkgR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d14-RkZeZQlefm1nwq8Mws5PBJAyPLQ\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 3348,
		"path": "../public/assets/routes-cXuNNkgR.js"
	},
	"/assets/select-DLd3qzT5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14f38-yy0JwtlwZeAzizjfAzXGbGBq92Q\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 85816,
		"path": "../public/assets/select-DLd3qzT5.js"
	},
	"/assets/slider-Dg-Qa5Me.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2983-9nE9+Sz0enLZ/Rsc5diDenu/82o\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 10627,
		"path": "../public/assets/slider-Dg-Qa5Me.js"
	},
	"/assets/song._id-BXYBhmv6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82fb-ZSNrniX1VxShHCvZZiBTjL+mB6A\"",
		"mtime": "2026-09-27T05:09:01.372Z",
		"size": 33531,
		"path": "../public/assets/song._id-BXYBhmv6.js"
	},
	"/assets/html2canvas-ydWbLPCJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30b46-IP/zQEbfXqt4Hk0jNBNNzCpjikQ\"",
		"mtime": "2026-09-27T05:09:01.371Z",
		"size": 199494,
		"path": "../public/assets/html2canvas-ydWbLPCJ.js"
	},
	"/assets/soundtouch-NZoMe1cn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3458-uzAf/qhc+pfQmJaGxOzMuCZUeF8\"",
		"mtime": "2026-09-27T05:09:01.373Z",
		"size": 13400,
		"path": "../public/assets/soundtouch-NZoMe1cn.js"
	},
	"/assets/storage-6oyTDrZF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27a-rtTfbpFDq/h7q3E+fNC50lrU2i8\"",
		"mtime": "2026-09-27T05:09:01.373Z",
		"size": 634,
		"path": "../public/assets/storage-6oyTDrZF.js"
	},
	"/assets/tuner-4AMfA2Zf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7c-+KnLO37/3oGMyX3SqLLl5ohAcyE\"",
		"mtime": "2026-09-27T05:09:01.373Z",
		"size": 3196,
		"path": "../public/assets/tuner-4AMfA2Zf.js"
	},
	"/assets/styles-CW1id6vN.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13066-RnpuoOcFZhMg0xnCfZvYfBj7S40\"",
		"mtime": "2026-09-27T05:09:01.373Z",
		"size": 77926,
		"path": "../public/assets/styles-CW1id6vN.css"
	},
	"/assets/typeof-B5XbjTb1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f-yPXEOGyFHb1Ws7OoWyWNEEBz4mQ\"",
		"mtime": "2026-09-27T05:09:01.373Z",
		"size": 271,
		"path": "../public/assets/typeof-B5XbjTb1.js"
	},
	"/assets/useRouter-CrDp9MmQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-LSjOJssuur1JWSyNFwKGHCfqZH8\"",
		"mtime": "2026-09-27T05:09:01.373Z",
		"size": 252,
		"path": "../public/assets/useRouter-CrDp9MmQ.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_RhriC1 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_RhriC1
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
