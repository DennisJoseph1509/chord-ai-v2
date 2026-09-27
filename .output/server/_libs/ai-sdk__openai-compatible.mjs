import { $ as withUserAgentSuffix, C as createNullLanguageModelUsage, Dt as TooManyEmbeddingValuesForCallError, F as isCustomReasoning, H as parseProviderOptions, M as getTopLevelMediaType, S as createLanguageModelResponseMetadata, T as downloadBlob, Tt as InvalidResponseDataError, U as postFormDataToApi, W as postJsonToApi, Z as serializeModelOptions, _t as object, b as createJsonErrorResponseHandler, bt as union, ct as array, et as withoutTrailingSlash, g as convertToFormData, gt as number, h as convertToBase64, it as _enum, k as generateId, kt as UnsupportedFunctionalityError, l as StreamingToolCallTracker, lt as boolean, m as convertBase64ToUint8Array, mt as looseObject, nt as WORKFLOW_DESERIALIZE, p as combineHeaders, pt as literal, q as resolveFullMediaType, rt as WORKFLOW_SERIALIZE, st as any, v as createEventSourceResponseHandler, vt as record, wt as InvalidPromptError, x as createJsonResponseHandler, yt as string } from "./@ai-sdk/gateway+[...].mjs";
//#region node_modules/@ai-sdk/openai-compatible/dist/index.js
function toCamelCase(str) {
	return str.replace(/[_-]([a-z])/g, (g) => g[1].toUpperCase());
}
function resolveProviderOptionsKey(rawName, providerOptions) {
	const camelName = toCamelCase(rawName);
	if (camelName !== rawName && providerOptions?.[camelName] != null) return camelName;
	return rawName;
}
function warnIfDeprecatedProviderOptionsKey({ rawName, providerOptions, warnings }) {
	const camelName = toCamelCase(rawName);
	if (camelName !== rawName && providerOptions?.[rawName] != null) warnings.push({
		type: "deprecated",
		setting: `providerOptions key '${rawName}'`,
		message: `Use '${camelName}' instead.`
	});
}
var defaultOpenAICompatibleErrorStructure = {
	errorSchema: object({ error: object({
		message: string(),
		type: string().nullish(),
		param: any().nullish(),
		code: union([string(), number()]).nullish()
	}) }),
	errorToMessage: (data) => data.error.message
};
function convertOpenAICompatibleChatUsage(usage) {
	if (usage == null) return createNullLanguageModelUsage();
	const promptTokens = usage.prompt_tokens ?? 0;
	const completionTokens = usage.completion_tokens ?? 0;
	const cacheReadTokens = usage.prompt_tokens_details?.cached_tokens ?? 0;
	const reasoningTokens = usage.completion_tokens_details?.reasoning_tokens ?? 0;
	return {
		inputTokens: {
			total: promptTokens,
			noCache: promptTokens - cacheReadTokens,
			cacheRead: cacheReadTokens,
			cacheWrite: void 0
		},
		outputTokens: {
			total: completionTokens,
			text: Math.max(0, completionTokens - reasoningTokens),
			reasoning: reasoningTokens
		},
		raw: usage
	};
}
function getOpenAIMetadata(message) {
	return message?.providerOptions?.openaiCompatible ?? {};
}
function getAudioFormat(mediaType) {
	switch (mediaType) {
		case "audio/wav": return "wav";
		case "audio/mp3":
		case "audio/mpeg": return "mp3";
		default: return null;
	}
}
function convertToOpenAICompatibleChatMessages(prompt, { providerOptionsKey = "google" } = {}) {
	const messages = [];
	for (const { role, content, ...message } of prompt) {
		const metadata = getOpenAIMetadata({ ...message });
		switch (role) {
			case "system":
				messages.push({
					role: "system",
					content,
					...metadata
				});
				break;
			case "user":
				if (content.length === 1 && content[0].type === "text") {
					messages.push({
						role: "user",
						content: content[0].text,
						...getOpenAIMetadata(content[0])
					});
					break;
				}
				messages.push({
					role: "user",
					content: content.map((part) => {
						const partMetadata = getOpenAIMetadata(part);
						switch (part.type) {
							case "text": return {
								type: "text",
								text: part.text,
								...partMetadata
							};
							case "file": switch (part.data.type) {
								case "reference": throw new UnsupportedFunctionalityError({ functionality: "file parts with provider references" });
								case "text": throw new UnsupportedFunctionalityError({ functionality: "text file parts" });
								case "url":
								case "data": {
									const topLevel = getTopLevelMediaType(part.mediaType);
									if (topLevel === "image") return {
										type: "image_url",
										image_url: { url: part.data.type === "url" ? part.data.url.toString() : `data:${resolveFullMediaType({ part })};base64,${convertToBase64(part.data.data)}` },
										...partMetadata
									};
									if (topLevel === "video") return {
										type: "video_url",
										video_url: { url: part.data.type === "url" ? part.data.url.toString() : `data:${resolveFullMediaType({ part })};base64,${convertToBase64(part.data.data)}` },
										...partMetadata
									};
									if (topLevel === "audio") {
										if (part.data.type === "url") throw new UnsupportedFunctionalityError({ functionality: "audio file parts with URLs" });
										const fullMediaType = resolveFullMediaType({ part });
										const format = getAudioFormat(fullMediaType);
										if (format === null) throw new UnsupportedFunctionalityError({ functionality: `audio media type ${fullMediaType}` });
										return {
											type: "input_audio",
											input_audio: {
												data: convertToBase64(part.data.data),
												format
											},
											...partMetadata
										};
									}
									if (topLevel === "application") {
										if (part.data.type === "url") throw new UnsupportedFunctionalityError({ functionality: "PDF file parts with URLs" });
										const fullMediaType = resolveFullMediaType({ part });
										if (fullMediaType !== "application/pdf") throw new UnsupportedFunctionalityError({ functionality: `file part media type ${fullMediaType}` });
										return {
											type: "file",
											file: {
												filename: part.filename ?? "document.pdf",
												file_data: `data:application/pdf;base64,${convertToBase64(part.data.data)}`
											},
											...partMetadata
										};
									}
									if (topLevel === "text") return {
										type: "text",
										text: part.data.type === "url" ? part.data.url.toString() : typeof part.data.data === "string" ? new TextDecoder().decode(convertBase64ToUint8Array(part.data.data)) : new TextDecoder().decode(part.data.data),
										...partMetadata
									};
									throw new UnsupportedFunctionalityError({ functionality: `file part media type ${part.mediaType}` });
								}
							}
						}
					}),
					...metadata
				});
				break;
			case "assistant": {
				let text = "";
				let reasoning = "";
				const toolCalls = [];
				for (const part of content) {
					const partMetadata = getOpenAIMetadata(part);
					switch (part.type) {
						case "text":
							text += part.text;
							break;
						case "reasoning":
							reasoning += part.text;
							break;
						case "tool-call": {
							const thoughtSignature = part.providerOptions?.[providerOptionsKey]?.thoughtSignature ?? part.providerOptions?.google?.thoughtSignature;
							toolCalls.push({
								id: part.toolCallId,
								type: "function",
								function: {
									name: part.toolName,
									arguments: JSON.stringify(part.input)
								},
								...partMetadata,
								...thoughtSignature ? { extra_content: { google: { thought_signature: String(thoughtSignature) } } } : {}
							});
							break;
						}
					}
				}
				messages.push({
					role: "assistant",
					content: toolCalls.length > 0 ? text || null : text,
					...reasoning.length > 0 ? { reasoning_content: reasoning } : {},
					tool_calls: toolCalls.length > 0 ? toolCalls : void 0,
					...metadata
				});
				break;
			}
			case "tool":
				for (const toolResponse of content) {
					if (toolResponse.type === "tool-approval-response") continue;
					const output = toolResponse.output;
					let contentValue;
					switch (output.type) {
						case "text":
						case "error-text":
							contentValue = output.value;
							break;
						case "execution-denied":
							contentValue = output.reason ?? "Tool call execution denied.";
							break;
						case "content":
						case "json":
						case "error-json": contentValue = JSON.stringify(output.value);
					}
					const toolResponseMetadata = getOpenAIMetadata(toolResponse);
					messages.push({
						role: "tool",
						tool_call_id: toolResponse.toolCallId,
						content: contentValue,
						...toolResponseMetadata
					});
				}
				break;
			default: throw new Error(`Unsupported role: ${role}`);
		}
	}
	return messages;
}
function getResponseMetadata({ id, model, created }) {
	return createLanguageModelResponseMetadata({
		id,
		model,
		created: created || void 0
	});
}
function mapOpenAICompatibleFinishReason(finishReason) {
	switch (finishReason) {
		case "stop": return "stop";
		case "length": return "length";
		case "content_filter": return "content-filter";
		case "function_call":
		case "tool_calls": return "tool-calls";
		default: return "other";
	}
}
var openaiCompatibleLanguageModelChatOptions = object({
	/**
	* A unique identifier representing your end-user, which can help the provider to
	* monitor and detect abuse.
	*/
	user: string().optional(),
	/**
	* Reasoning effort for reasoning models. Defaults to `medium`.
	*/
	reasoningEffort: string().optional(),
	/**
	* Controls the verbosity of the generated text. Defaults to `medium`.
	*/
	textVerbosity: string().optional(),
	/**
	* Whether to use strict JSON schema validation.
	* When true, the model uses constrained decoding to guarantee schema compliance.
	* Only used when the provider supports structured outputs and a schema is provided.
	*
	* @default true
	*/
	strictJsonSchema: boolean().optional()
});
function prepareTools({ tools, toolChoice }) {
	tools = tools?.length ? tools : void 0;
	const toolWarnings = [];
	if (tools == null) return {
		tools: void 0,
		toolChoice: void 0,
		toolWarnings
	};
	const openaiCompatTools = [];
	for (const tool of tools) if (tool.type === "provider") toolWarnings.push({
		type: "unsupported",
		feature: `provider-defined tool ${tool.id}`
	});
	else openaiCompatTools.push({
		type: "function",
		function: {
			name: tool.name,
			description: tool.description,
			parameters: tool.inputSchema,
			...tool.strict != null ? { strict: tool.strict } : {}
		}
	});
	if (toolChoice == null) return {
		tools: openaiCompatTools,
		toolChoice: void 0,
		toolWarnings
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto":
		case "none":
		case "required": return {
			tools: openaiCompatTools,
			toolChoice: type,
			toolWarnings
		};
		case "tool": return {
			tools: openaiCompatTools,
			toolChoice: {
				type: "function",
				function: { name: toolChoice.toolName }
			},
			toolWarnings
		};
		default: throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${type}` });
	}
}
var OpenAICompatibleChatLanguageModel = class _OpenAICompatibleChatLanguageModel {
	constructor(modelId, config) {
		this.specificationVersion = "v4";
		this.modelId = modelId;
		this.config = config;
		const errorStructure = config.errorStructure ?? defaultOpenAICompatibleErrorStructure;
		this.chunkSchema = createOpenAICompatibleChatChunkSchema(errorStructure.errorSchema);
		this.failedResponseHandler = createJsonErrorResponseHandler(errorStructure);
		this.supportsStructuredOutputs = config.supportsStructuredOutputs ?? false;
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _OpenAICompatibleChatLanguageModel(options.modelId, options.config);
	}
	get provider() {
		return this.config.provider;
	}
	get providerOptionsName() {
		return this.config.provider.split(".")[0].trim();
	}
	get supportedUrls() {
		return this.config.supportedUrls?.() ?? {};
	}
	transformRequestBody(args) {
		return this.config.transformRequestBody?.(args) ?? args;
	}
	convertUsage(usage) {
		return this.config.convertUsage?.(usage) ?? convertOpenAICompatibleChatUsage(usage);
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, reasoning, providerOptions, stopSequences, responseFormat, seed, toolChoice, tools }) {
		const warnings = [];
		const deprecatedOptions = await parseProviderOptions({
			provider: "openai-compatible",
			providerOptions,
			schema: openaiCompatibleLanguageModelChatOptions
		});
		if (deprecatedOptions != null) warnings.push({
			type: "deprecated",
			setting: "providerOptions key 'openai-compatible'",
			message: "Use 'openaiCompatible' instead."
		});
		warnIfDeprecatedProviderOptionsKey({
			rawName: this.providerOptionsName,
			providerOptions,
			warnings
		});
		const compatibleOptions = Object.assign(deprecatedOptions ?? {}, await parseProviderOptions({
			provider: "openaiCompatible",
			providerOptions,
			schema: openaiCompatibleLanguageModelChatOptions
		}) ?? {}, await parseProviderOptions({
			provider: this.providerOptionsName,
			providerOptions,
			schema: openaiCompatibleLanguageModelChatOptions
		}) ?? {}, await parseProviderOptions({
			provider: toCamelCase(this.providerOptionsName),
			providerOptions,
			schema: openaiCompatibleLanguageModelChatOptions
		}) ?? {});
		const strictJsonSchema = compatibleOptions?.strictJsonSchema ?? true;
		if (topK != null) warnings.push({
			type: "unsupported",
			feature: "topK"
		});
		if (responseFormat?.type === "json" && responseFormat.schema != null && !this.supportsStructuredOutputs) warnings.push({
			type: "unsupported",
			feature: "responseFormat",
			details: "JSON response format schema is only supported with structuredOutputs"
		});
		const { tools: openaiTools, toolChoice: openaiToolChoice, toolWarnings } = prepareTools({
			tools,
			toolChoice
		});
		const metadataKey = resolveProviderOptionsKey(this.providerOptionsName, providerOptions);
		return {
			metadataKey,
			args: {
				model: this.modelId,
				user: compatibleOptions.user,
				max_tokens: maxOutputTokens,
				temperature,
				top_p: topP,
				frequency_penalty: frequencyPenalty,
				presence_penalty: presencePenalty,
				response_format: responseFormat?.type === "json" ? this.supportsStructuredOutputs === true && responseFormat.schema != null ? {
					type: "json_schema",
					json_schema: {
						schema: responseFormat.schema,
						strict: strictJsonSchema,
						name: responseFormat.name ?? "response",
						description: responseFormat.description
					}
				} : { type: "json_object" } : void 0,
				stop: stopSequences,
				seed,
				...Object.fromEntries(Object.entries({
					...providerOptions?.[this.providerOptionsName],
					...providerOptions?.[toCamelCase(this.providerOptionsName)]
				}).filter(([key]) => !Object.keys(openaiCompatibleLanguageModelChatOptions.shape).includes(key))),
				reasoning_effort: compatibleOptions.reasoningEffort ?? (isCustomReasoning(reasoning) ? reasoning : void 0),
				verbosity: compatibleOptions.textVerbosity,
				messages: convertToOpenAICompatibleChatMessages(prompt, { providerOptionsKey: metadataKey }),
				tools: openaiTools,
				tool_choice: openaiToolChoice
			},
			warnings: [...warnings, ...toolWarnings]
		};
	}
	async doGenerate(options) {
		const { args, warnings, metadataKey } = await this.getArgs({ ...options });
		const transformedBody = this.transformRequestBody(args);
		const body = JSON.stringify(transformedBody);
		const { responseHeaders, value: responseBody, rawValue: rawResponse } = await postJsonToApi({
			url: this.config.url({
				path: "/chat/completions",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers?.(), options.headers),
			body: transformedBody,
			failedResponseHandler: this.failedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(OpenAICompatibleChatResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const choice = responseBody.choices[0];
		if (choice == null) throw new InvalidResponseDataError({
			data: rawResponse,
			message: "Response did not contain any choices."
		});
		const content = [];
		content.push(...convertOpenAICompatibleContent(choice.message.content));
		const reasoning = choice.message.reasoning_content ?? choice.message.reasoning;
		if (reasoning != null && reasoning.length > 0) content.push({
			type: "reasoning",
			text: reasoning
		});
		if (choice.message.tool_calls != null) for (const toolCall of choice.message.tool_calls) {
			const thoughtSignature = toolCall.extra_content?.google?.thought_signature;
			content.push({
				type: "tool-call",
				toolCallId: toolCall.id || generateId(),
				toolName: toolCall.function.name,
				input: toolCall.function.arguments,
				...thoughtSignature ? { providerMetadata: { [metadataKey]: { thoughtSignature } } } : {}
			});
		}
		const providerMetadata = {
			[metadataKey]: {},
			...await this.config.metadataExtractor?.extractMetadata?.({ parsedBody: rawResponse })
		};
		const completionTokenDetails = responseBody.usage?.completion_tokens_details;
		if (completionTokenDetails?.accepted_prediction_tokens != null) providerMetadata[metadataKey].acceptedPredictionTokens = completionTokenDetails?.accepted_prediction_tokens;
		if (completionTokenDetails?.rejected_prediction_tokens != null) providerMetadata[metadataKey].rejectedPredictionTokens = completionTokenDetails?.rejected_prediction_tokens;
		return {
			content,
			finishReason: {
				unified: mapOpenAICompatibleFinishReason(choice.finish_reason),
				raw: choice.finish_reason ?? void 0
			},
			usage: this.convertUsage(responseBody.usage),
			providerMetadata,
			request: { body },
			response: {
				...getResponseMetadata(responseBody),
				headers: responseHeaders,
				body: rawResponse
			},
			warnings
		};
	}
	async doStream(options) {
		const { args, warnings, metadataKey } = await this.getArgs({ ...options });
		const body = this.transformRequestBody({
			...args,
			stream: true,
			stream_options: this.config.includeUsage ? { include_usage: true } : void 0
		});
		const metadataExtractor = this.config.metadataExtractor?.createStreamExtractor();
		const { responseHeaders, value: response } = await postJsonToApi({
			url: this.config.url({
				path: "/chat/completions",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers?.(), options.headers),
			body,
			failedResponseHandler: this.failedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(this.chunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const providerOptionsName = metadataKey;
		let toolCallTracker;
		const pendingToolCalls = /* @__PURE__ */ new Map();
		const forwardedToolCallIndices = /* @__PURE__ */ new Set();
		const processToolCallDelta = (toolCallDelta) => {
			const index = toolCallDelta.index;
			if (index == null || forwardedToolCallIndices.has(index)) {
				toolCallTracker.processDelta(toolCallDelta);
				return;
			}
			let pending = pendingToolCalls.get(index);
			if (pending == null) {
				pending = {
					id: toolCallDelta.id ?? null,
					bufferedArguments: "",
					extraContent: toolCallDelta.extra_content ?? null
				};
				pendingToolCalls.set(index, pending);
			} else {
				if (pending.id == null && toolCallDelta.id != null) pending.id = toolCallDelta.id;
				if (pending.extraContent == null && toolCallDelta.extra_content != null) pending.extraContent = toolCallDelta.extra_content;
			}
			const argumentsDelta = toolCallDelta.function?.arguments;
			if (argumentsDelta != null) pending.bufferedArguments += argumentsDelta;
			const name = toolCallDelta.function?.name;
			if (name != null) {
				const forwardDelta = {
					index,
					id: pending.id,
					function: {
						name,
						arguments: pending.bufferedArguments
					},
					extra_content: pending.extraContent ?? void 0
				};
				toolCallTracker.processDelta(forwardDelta);
				pendingToolCalls.delete(index);
				forwardedToolCallIndices.add(index);
			}
		};
		let finishReason;
		let usage = void 0;
		let metadataExtracted = false;
		let isActiveReasoning = false;
		let isActiveText = false;
		const convertUsage = (usage2) => this.convertUsage(usage2);
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					toolCallTracker = new StreamingToolCallTracker(controller, {
						generateId,
						extractMetadata: (delta) => {
							const thoughtSignature = delta.extra_content?.google?.thought_signature;
							return thoughtSignature ? { [providerOptionsName]: { thoughtSignature } } : void 0;
						},
						buildToolCallProviderMetadata: (metadata) => metadata
					});
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						finishReason = {
							unified: "error",
							raw: void 0
						};
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					metadataExtractor?.processChunk(chunk.rawValue);
					if ("error" in chunk.value) {
						finishReason = {
							unified: "error",
							raw: void 0
						};
						controller.enqueue({
							type: "error",
							error: chunk.value.error
						});
						return;
					}
					const value = chunk.value;
					if (!metadataExtracted) {
						const metadata = getResponseMetadata(value);
						if (Object.values(metadata).some(Boolean)) {
							metadataExtracted = true;
							controller.enqueue({
								type: "response-metadata",
								...metadata
							});
						}
					}
					if (value.usage != null) usage = value.usage;
					const choice = value.choices[0];
					if (choice?.finish_reason != null) finishReason = {
						unified: mapOpenAICompatibleFinishReason(choice.finish_reason),
						raw: choice.finish_reason ?? void 0
					};
					if (choice?.delta == null) return;
					const delta = choice.delta;
					const enqueueReasoningDelta = (reasoningDelta) => {
						if (isActiveText) {
							controller.enqueue({
								type: "text-end",
								id: "txt-0"
							});
							isActiveText = false;
						}
						if (!isActiveReasoning) {
							controller.enqueue({
								type: "reasoning-start",
								id: "reasoning-0"
							});
							isActiveReasoning = true;
						}
						controller.enqueue({
							type: "reasoning-delta",
							id: "reasoning-0",
							delta: reasoningDelta
						});
					};
					const enqueueTextDelta = (textDelta) => {
						if (isActiveReasoning) {
							controller.enqueue({
								type: "reasoning-end",
								id: "reasoning-0"
							});
							isActiveReasoning = false;
						}
						if (!isActiveText) {
							controller.enqueue({
								type: "text-start",
								id: "txt-0"
							});
							isActiveText = true;
						}
						controller.enqueue({
							type: "text-delta",
							id: "txt-0",
							delta: textDelta
						});
					};
					const reasoningContent = delta.reasoning_content ?? delta.reasoning;
					if (reasoningContent) enqueueReasoningDelta(reasoningContent);
					for (const contentPart of convertOpenAICompatibleContent(delta.content)) if (contentPart.type === "reasoning") enqueueReasoningDelta(contentPart.text);
					else enqueueTextDelta(contentPart.text);
					if (delta.tool_calls != null && delta.tool_calls.length > 0) {
						if (isActiveReasoning) {
							controller.enqueue({
								type: "reasoning-end",
								id: "reasoning-0"
							});
							isActiveReasoning = false;
						}
						for (const toolCallDelta of delta.tool_calls) processToolCallDelta(toolCallDelta);
					}
				},
				flush(controller) {
					if (isActiveReasoning) controller.enqueue({
						type: "reasoning-end",
						id: "reasoning-0"
					});
					if (isActiveText) controller.enqueue({
						type: "text-end",
						id: "txt-0"
					});
					for (const [index, pending] of pendingToolCalls) toolCallTracker.processDelta({
						index,
						id: pending.id,
						function: { arguments: pending.bufferedArguments }
					});
					pendingToolCalls.clear();
					toolCallTracker.flush();
					if (finishReason == null) {
						finishReason = {
							unified: "error",
							raw: void 0
						};
						controller.enqueue({
							type: "error",
							error: new InvalidResponseDataError({
								data: void 0,
								message: "Response stream ended without a finish reason."
							})
						});
					}
					const providerMetadata = {
						[providerOptionsName]: {},
						...metadataExtractor?.buildMetadata()
					};
					if (usage?.completion_tokens_details?.accepted_prediction_tokens != null) providerMetadata[providerOptionsName].acceptedPredictionTokens = usage?.completion_tokens_details?.accepted_prediction_tokens;
					if (usage?.completion_tokens_details?.rejected_prediction_tokens != null) providerMetadata[providerOptionsName].rejectedPredictionTokens = usage?.completion_tokens_details?.rejected_prediction_tokens;
					controller.enqueue({
						type: "finish",
						finishReason,
						usage: convertUsage(usage),
						providerMetadata
					});
				}
			})),
			request: { body },
			response: { headers: responseHeaders }
		};
	}
};
var openaiCompatibleTokenUsageSchema = looseObject({
	prompt_tokens: number().nullish(),
	completion_tokens: number().nullish(),
	total_tokens: number().nullish(),
	prompt_tokens_details: looseObject({ cached_tokens: number().nullish() }).nullish(),
	completion_tokens_details: looseObject({
		reasoning_tokens: number().nullish(),
		accepted_prediction_tokens: number().nullish(),
		rejected_prediction_tokens: number().nullish()
	}).nullish()
}).nullish();
var openAICompatibleContentSchema = union([string(), array(looseObject({ type: string() }))]).nullish();
function convertOpenAICompatibleContent(content) {
	if (content == null) return [];
	if (typeof content === "string") return content.length > 0 ? [{
		type: "text",
		text: content
	}] : [];
	const result = [];
	for (const part of content) if (part.type === "text" && typeof part.text === "string") {
		if (part.text.length > 0) result.push({
			type: "text",
			text: part.text
		});
	} else if (part.type === "thinking" && Array.isArray(part.thinking)) {
		const reasoningText = part.thinking.filter((chunk) => chunk != null && typeof chunk === "object" && "type" in chunk && chunk.type === "text" && "text" in chunk && typeof chunk.text === "string").map((chunk) => chunk.text).join("");
		if (reasoningText.length > 0) result.push({
			type: "reasoning",
			text: reasoningText
		});
	}
	return result;
}
var OpenAICompatibleChatResponseSchema = looseObject({
	id: string().nullish(),
	created: number().nullish(),
	model: string().nullish(),
	choices: array(object({
		message: object({
			role: literal("assistant").nullish(),
			content: openAICompatibleContentSchema,
			reasoning_content: string().nullish(),
			reasoning: string().nullish(),
			tool_calls: array(object({
				id: string().nullish(),
				function: object({
					name: string(),
					arguments: string()
				}),
				extra_content: object({ google: object({ thought_signature: string().nullish() }).nullish() }).nullish()
			})).nullish()
		}),
		finish_reason: string().nullish()
	})),
	usage: openaiCompatibleTokenUsageSchema
});
var chunkBaseSchema = looseObject({
	id: string().nullish(),
	created: number().nullish(),
	model: string().nullish(),
	choices: array(object({
		delta: object({
			role: _enum(["assistant", ""]).nullish(),
			content: openAICompatibleContentSchema,
			reasoning_content: string().nullish(),
			reasoning: string().nullish(),
			tool_calls: array(object({
				index: number().nullish(),
				id: string().nullish(),
				function: object({
					name: string().nullish(),
					arguments: string().nullish()
				}),
				extra_content: object({ google: object({ thought_signature: string().nullish() }).nullish() }).nullish()
			})).nullish()
		}).nullish(),
		finish_reason: string().nullish()
	})),
	usage: openaiCompatibleTokenUsageSchema
});
var createOpenAICompatibleChatChunkSchema = (errorSchema) => union([chunkBaseSchema, errorSchema]);
function convertOpenAICompatibleCompletionUsage(usage) {
	if (usage == null) return createNullLanguageModelUsage();
	const promptTokens = usage.prompt_tokens ?? 0;
	const completionTokens = usage.completion_tokens ?? 0;
	return {
		inputTokens: {
			total: promptTokens,
			noCache: promptTokens,
			cacheRead: void 0,
			cacheWrite: void 0
		},
		outputTokens: {
			total: completionTokens,
			text: completionTokens,
			reasoning: void 0
		},
		raw: usage
	};
}
function convertToOpenAICompatibleCompletionPrompt({ prompt, user = "user", assistant = "assistant" }) {
	let text = "";
	if (prompt[0].role === "system") {
		text += `${prompt[0].content}

`;
		prompt = prompt.slice(1);
	}
	for (const { role, content } of prompt) switch (role) {
		case "system": throw new InvalidPromptError({
			message: "Unexpected system message in prompt: ${content}",
			prompt
		});
		case "user": {
			const userMessage = content.map((part) => {
				switch (part.type) {
					case "text": return part.text;
				}
			}).filter(Boolean).join("");
			text += `${user}:
${userMessage}

`;
			break;
		}
		case "assistant": {
			const assistantMessage = content.map((part) => {
				switch (part.type) {
					case "text": return part.text;
					case "tool-call": throw new UnsupportedFunctionalityError({ functionality: "tool-call messages" });
				}
			}).join("");
			text += `${assistant}:
${assistantMessage}

`;
			break;
		}
		case "tool": throw new UnsupportedFunctionalityError({ functionality: "tool messages" });
		default: throw new Error(`Unsupported role: ${role}`);
	}
	text += `${assistant}:
`;
	return {
		prompt: text,
		stopSequences: [`
${user}:`]
	};
}
function mapOpenAICompatibleFinishReason2(finishReason) {
	switch (finishReason) {
		case "stop": return "stop";
		case "length": return "length";
		case "content_filter": return "content-filter";
		case "function_call":
		case "tool_calls": return "tool-calls";
		default: return "other";
	}
}
var openaiCompatibleLanguageModelCompletionOptions = object({
	/**
	* Echo back the prompt in addition to the completion.
	*/
	echo: boolean().optional(),
	/**
	* Modify the likelihood of specified tokens appearing in the completion.
	*
	* Accepts a JSON object that maps tokens (specified by their token ID in
	* the GPT tokenizer) to an associated bias value from -100 to 100.
	*/
	logitBias: record(string(), number()).optional(),
	/**
	* The suffix that comes after a completion of inserted text.
	*/
	suffix: string().optional(),
	/**
	* A unique identifier representing your end-user, which can help providers to
	* monitor and detect abuse.
	*/
	user: string().optional()
});
var OpenAICompatibleCompletionLanguageModel = class _OpenAICompatibleCompletionLanguageModel {
	constructor(modelId, config) {
		this.specificationVersion = "v4";
		this.modelId = modelId;
		this.config = config;
		const errorStructure = config.errorStructure ?? defaultOpenAICompatibleErrorStructure;
		this.chunkSchema = createOpenAICompatibleCompletionChunkSchema(errorStructure.errorSchema);
		this.failedResponseHandler = createJsonErrorResponseHandler(errorStructure);
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _OpenAICompatibleCompletionLanguageModel(options.modelId, options.config);
	}
	get provider() {
		return this.config.provider;
	}
	get providerOptionsName() {
		return this.config.provider.split(".")[0].trim();
	}
	get supportedUrls() {
		return this.config.supportedUrls?.() ?? {};
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences: userStopSequences, responseFormat, seed, providerOptions, tools, toolChoice }) {
		const warnings = [];
		warnIfDeprecatedProviderOptionsKey({
			rawName: this.providerOptionsName,
			providerOptions,
			warnings
		});
		const completionOptions = Object.assign(await parseProviderOptions({
			provider: this.providerOptionsName,
			providerOptions,
			schema: openaiCompatibleLanguageModelCompletionOptions
		}) ?? {}, await parseProviderOptions({
			provider: toCamelCase(this.providerOptionsName),
			providerOptions,
			schema: openaiCompatibleLanguageModelCompletionOptions
		}) ?? {});
		if (topK != null) warnings.push({
			type: "unsupported",
			feature: "topK"
		});
		if (tools?.length) warnings.push({
			type: "unsupported",
			feature: "tools"
		});
		if (toolChoice != null) warnings.push({
			type: "unsupported",
			feature: "toolChoice"
		});
		if (responseFormat != null && responseFormat.type !== "text") warnings.push({
			type: "unsupported",
			feature: "responseFormat",
			details: "JSON response format is not supported."
		});
		const { prompt: completionPrompt, stopSequences } = convertToOpenAICompatibleCompletionPrompt({ prompt });
		const stop = [...stopSequences ?? [], ...userStopSequences ?? []];
		return {
			args: {
				model: this.modelId,
				echo: completionOptions.echo,
				logit_bias: completionOptions.logitBias,
				suffix: completionOptions.suffix,
				user: completionOptions.user,
				max_tokens: maxOutputTokens,
				temperature,
				top_p: topP,
				frequency_penalty: frequencyPenalty,
				presence_penalty: presencePenalty,
				seed,
				...providerOptions?.[this.providerOptionsName],
				...providerOptions?.[toCamelCase(this.providerOptionsName)],
				prompt: completionPrompt,
				stop: stop.length > 0 ? stop : void 0
			},
			warnings
		};
	}
	async doGenerate(options) {
		const { args, warnings } = await this.getArgs(options);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: this.config.url({
				path: "/completions",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers?.(), options.headers),
			body: args,
			failedResponseHandler: this.failedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(openaiCompatibleCompletionResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const choice = response.choices[0];
		const content = [];
		if (choice.text != null && choice.text.length > 0) content.push({
			type: "text",
			text: choice.text
		});
		return {
			content,
			usage: convertOpenAICompatibleCompletionUsage(response.usage),
			finishReason: {
				unified: mapOpenAICompatibleFinishReason2(choice.finish_reason),
				raw: choice.finish_reason
			},
			request: { body: args },
			response: {
				...createLanguageModelResponseMetadata(response),
				headers: responseHeaders,
				body: rawResponse
			},
			warnings
		};
	}
	async doStream(options) {
		const { args, warnings } = await this.getArgs(options);
		const body = {
			...args,
			stream: true,
			stream_options: this.config.includeUsage ? { include_usage: true } : void 0
		};
		const { responseHeaders, value: response } = await postJsonToApi({
			url: this.config.url({
				path: "/completions",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers?.(), options.headers),
			body,
			failedResponseHandler: this.failedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(this.chunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = {
			unified: "other",
			raw: void 0
		};
		let usage = void 0;
		let isFirstChunk = true;
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						finishReason = {
							unified: "error",
							raw: void 0
						};
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					const value = chunk.value;
					if ("error" in value) {
						finishReason = {
							unified: "error",
							raw: void 0
						};
						controller.enqueue({
							type: "error",
							error: value.error
						});
						return;
					}
					if (isFirstChunk) {
						isFirstChunk = false;
						controller.enqueue({
							type: "response-metadata",
							...createLanguageModelResponseMetadata(value)
						});
						controller.enqueue({
							type: "text-start",
							id: "0"
						});
					}
					if (value.usage != null) usage = value.usage;
					const choice = value.choices[0];
					if (choice?.finish_reason != null) finishReason = {
						unified: mapOpenAICompatibleFinishReason2(choice.finish_reason),
						raw: choice.finish_reason ?? void 0
					};
					if (choice?.text != null) controller.enqueue({
						type: "text-delta",
						id: "0",
						delta: choice.text
					});
				},
				flush(controller) {
					if (!isFirstChunk) controller.enqueue({
						type: "text-end",
						id: "0"
					});
					controller.enqueue({
						type: "finish",
						finishReason,
						usage: convertOpenAICompatibleCompletionUsage(usage)
					});
				}
			})),
			request: { body },
			response: { headers: responseHeaders }
		};
	}
};
var usageSchema = looseObject({
	prompt_tokens: number(),
	completion_tokens: number(),
	total_tokens: number()
});
var openaiCompatibleCompletionResponseSchema = object({
	id: string().nullish(),
	created: number().nullish(),
	model: string().nullish(),
	choices: array(object({
		text: string(),
		finish_reason: string()
	})),
	usage: usageSchema.nullish()
});
var createOpenAICompatibleCompletionChunkSchema = (errorSchema) => union([object({
	id: string().nullish(),
	created: number().nullish(),
	model: string().nullish(),
	choices: array(object({
		text: string(),
		finish_reason: string().nullish(),
		index: number()
	})),
	usage: usageSchema.nullish()
}), errorSchema]);
var openaiCompatibleEmbeddingModelOptions = object({
	/**
	* The number of dimensions the resulting output embeddings should have.
	* Only supported in text-embedding-3 and later models.
	*/
	dimensions: number().optional(),
	/**
	* A unique identifier representing your end-user, which can help providers to
	* monitor and detect abuse.
	*/
	user: string().optional()
});
var OpenAICompatibleEmbeddingModel = class _OpenAICompatibleEmbeddingModel {
	constructor(modelId, config) {
		this.specificationVersion = "v4";
		this.modelId = modelId;
		this.config = config;
	}
	get provider() {
		return this.config.provider;
	}
	get maxEmbeddingsPerCall() {
		return this.config.maxEmbeddingsPerCall ?? 2048;
	}
	get supportsParallelCalls() {
		return this.config.supportsParallelCalls ?? true;
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _OpenAICompatibleEmbeddingModel(options.modelId, options.config);
	}
	get providerOptionsName() {
		return this.config.provider.split(".")[0].trim();
	}
	async doEmbed({ values, headers, abortSignal, providerOptions }) {
		const warnings = [];
		const deprecatedOptions = await parseProviderOptions({
			provider: "openai-compatible",
			providerOptions,
			schema: openaiCompatibleEmbeddingModelOptions
		});
		if (deprecatedOptions != null) warnings.push({
			type: "deprecated",
			setting: "providerOptions key 'openai-compatible'",
			message: "Use 'openaiCompatible' instead."
		});
		warnIfDeprecatedProviderOptionsKey({
			rawName: this.providerOptionsName,
			providerOptions,
			warnings
		});
		const compatibleOptions = Object.assign(deprecatedOptions ?? {}, await parseProviderOptions({
			provider: "openaiCompatible",
			providerOptions,
			schema: openaiCompatibleEmbeddingModelOptions
		}) ?? {}, await parseProviderOptions({
			provider: this.providerOptionsName,
			providerOptions,
			schema: openaiCompatibleEmbeddingModelOptions
		}) ?? {});
		if (values.length > this.maxEmbeddingsPerCall) throw new TooManyEmbeddingValuesForCallError({
			provider: this.provider,
			modelId: this.modelId,
			maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
			values
		});
		const { responseHeaders, value: response, rawValue } = await postJsonToApi({
			url: this.config.url({
				path: "/embeddings",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers?.(), headers),
			body: {
				model: this.modelId,
				input: values,
				encoding_format: "float",
				dimensions: compatibleOptions.dimensions,
				user: compatibleOptions.user
			},
			failedResponseHandler: createJsonErrorResponseHandler(this.config.errorStructure ?? defaultOpenAICompatibleErrorStructure),
			successfulResponseHandler: createJsonResponseHandler(openaiTextEmbeddingResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		return {
			warnings,
			embeddings: response.data.map((item) => item.embedding),
			usage: response.usage ? { tokens: response.usage.prompt_tokens } : void 0,
			providerMetadata: response.providerMetadata,
			response: {
				headers: responseHeaders,
				body: rawValue
			}
		};
	}
};
var openaiTextEmbeddingResponseSchema = object({
	data: array(object({ embedding: array(number()) })),
	usage: object({ prompt_tokens: number() }).nullish(),
	providerMetadata: record(string(), record(string(), any())).optional()
});
var OpenAICompatibleImageModel = class _OpenAICompatibleImageModel {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v4";
		this.maxImagesPerCall = 10;
	}
	get provider() {
		return this.config.provider;
	}
	/**
	* The provider options key used to extract provider-specific options.
	*/
	get providerOptionsKey() {
		return this.config.provider.split(".")[0].trim();
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _OpenAICompatibleImageModel(options.modelId, options.config);
	}
	getArgs(providerOptions, warnings) {
		warnIfDeprecatedProviderOptionsKey({
			rawName: this.providerOptionsKey,
			providerOptions,
			warnings
		});
		return {
			...providerOptions[this.providerOptionsKey],
			...providerOptions[toCamelCase(this.providerOptionsKey)]
		};
	}
	async doGenerate({ prompt, n, size, aspectRatio, seed, providerOptions, headers, abortSignal, files, mask }) {
		const warnings = [];
		if (aspectRatio != null) warnings.push({
			type: "unsupported",
			feature: "aspectRatio",
			details: "This model does not support aspect ratio. Use `size` instead."
		});
		if (seed != null) warnings.push({
			type: "unsupported",
			feature: "seed"
		});
		const currentDate = this.config._internal?.currentDate?.() ?? /* @__PURE__ */ new Date();
		const args = this.getArgs(providerOptions, warnings);
		if (files != null && files.length > 0) {
			const { value: response2, responseHeaders: responseHeaders2 } = await postFormDataToApi({
				url: this.config.url({
					path: "/images/edits",
					modelId: this.modelId
				}),
				headers: combineHeaders(this.config.headers?.(), headers),
				formData: convertToFormData({
					model: this.modelId,
					prompt,
					image: await Promise.all(files.map((file) => fileToBlob(file))),
					mask: mask != null ? await fileToBlob(mask) : void 0,
					n,
					size,
					...args
				}),
				failedResponseHandler: createJsonErrorResponseHandler(this.config.errorStructure ?? defaultOpenAICompatibleErrorStructure),
				successfulResponseHandler: createJsonResponseHandler(openaiCompatibleImageResponseSchema),
				abortSignal,
				fetch: this.config.fetch
			});
			return {
				images: response2.data.map((item) => item.b64_json),
				warnings,
				usage: mapImageUsage(response2.usage),
				response: {
					timestamp: currentDate,
					modelId: this.modelId,
					headers: responseHeaders2
				}
			};
		}
		const { value: response, responseHeaders } = await postJsonToApi({
			url: this.config.url({
				path: "/images/generations",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers?.(), headers),
			body: {
				model: this.modelId,
				prompt,
				n,
				size,
				...args
			},
			failedResponseHandler: createJsonErrorResponseHandler(this.config.errorStructure ?? defaultOpenAICompatibleErrorStructure),
			successfulResponseHandler: createJsonResponseHandler(openaiCompatibleImageResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		return {
			images: response.data.map((item) => item.b64_json),
			warnings,
			usage: mapImageUsage(response.usage),
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders
			}
		};
	}
};
function mapImageUsage(usage) {
	return usage == null ? void 0 : {
		inputTokens: usage.input_tokens ?? void 0,
		outputTokens: usage.output_tokens ?? void 0,
		totalTokens: usage.total_tokens ?? void 0
	};
}
var openaiCompatibleImageResponseSchema = object({
	data: array(object({ b64_json: string() })),
	usage: object({
		input_tokens: number().nullish(),
		output_tokens: number().nullish(),
		total_tokens: number().nullish()
	}).nullish()
});
async function fileToBlob(file) {
	if (file.type === "url") return downloadBlob(file.url);
	const data = file.data instanceof Uint8Array ? file.data : convertBase64ToUint8Array(file.data);
	return new Blob([data], { type: file.mediaType });
}
var VERSION = "3.0.57";
function createOpenAICompatible(options) {
	const baseURL = withoutTrailingSlash(options.baseURL);
	const providerName = options.name;
	const headers = {
		...options.apiKey && { Authorization: `Bearer ${options.apiKey}` },
		...options.headers
	};
	const getHeaders = () => withUserAgentSuffix(headers, `ai-sdk/openai-compatible/${VERSION}`);
	const getCommonModelConfig = (modelType) => ({
		provider: `${providerName}.${modelType}`,
		url: ({ path }) => {
			const url = new URL(`${baseURL}${path}`);
			if (options.queryParams) url.search = new URLSearchParams(options.queryParams).toString();
			return url.toString();
		},
		headers: getHeaders,
		fetch: options.fetch
	});
	const createLanguageModel = (modelId) => createChatModel(modelId);
	const createChatModel = (modelId) => new OpenAICompatibleChatLanguageModel(modelId, {
		...getCommonModelConfig("chat"),
		includeUsage: options.includeUsage,
		supportsStructuredOutputs: options.supportsStructuredOutputs,
		supportedUrls: options.supportedUrls,
		transformRequestBody: options.transformRequestBody,
		metadataExtractor: options.metadataExtractor,
		convertUsage: options.convertUsage
	});
	const createCompletionModel = (modelId) => new OpenAICompatibleCompletionLanguageModel(modelId, {
		...getCommonModelConfig("completion"),
		includeUsage: options.includeUsage
	});
	const createEmbeddingModel = (modelId) => new OpenAICompatibleEmbeddingModel(modelId, { ...getCommonModelConfig("embedding") });
	const createImageModel = (modelId) => new OpenAICompatibleImageModel(modelId, getCommonModelConfig("image"));
	const provider = (modelId) => createLanguageModel(modelId);
	provider.specificationVersion = "v4";
	provider.languageModel = createLanguageModel;
	provider.chatModel = createChatModel;
	provider.completionModel = createCompletionModel;
	provider.embeddingModel = createEmbeddingModel;
	provider.textEmbeddingModel = createEmbeddingModel;
	provider.imageModel = createImageModel;
	return provider;
}
//#endregion
export { createOpenAICompatible as t };
