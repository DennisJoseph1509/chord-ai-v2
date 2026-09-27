import { t as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-gateway.server-CmUQntrp.js
function createLovableAiGatewayProvider(apiKey) {
	return createOpenAICompatible({
		name: "lovable",
		baseURL: "https://ai.gateway.lovable.dev/v1",
		headers: { "Lovable-API-Key": apiKey }
	});
}
//#endregion
export { createLovableAiGatewayProvider };
