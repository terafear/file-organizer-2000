import { requestUrl } from "obsidian";
import { logMessage } from "../../utils";

async function useText(content: string, systemPrompt: string, apiKey: string) {
	//console.log("content", content);
	const data = {
		model: "dolphin-mistral",
		messages: [
			{
				role: "system",
				content: systemPrompt,
			},
			{
				role: "user",
				content: content,
			},
		],
		stream: false,
		temperature: 0,
	};
	//console.log("json'data", JSON.stringify(data));
	const response = await requestUrl({
		url: "http://localhost:11434/v1/chat/completions",
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const result = await response.json;
	logMessage("ollama result", result.choices[0].message.content.trim());

	return result.choices[0].message.content.trim();
}
export default useText;

// import { requestUrl } from "obsidian";
// import { logMessage } from "../../utils";

// async function useText(content: string, systemPrompt = "", apiKey: string) {
// 	const data = {
// 		model: "gpt-4-1106-preview",
// 		temperature: 0,
// 		messages: [
// 			{
// 				role: "system",
// 				content: systemPrompt,
// 			},
// 			{
// 				role: "user",
// 				content: content,
// 			},
// 		],
// 	};
// 	console.log("json'data", JSON.stringify(data));

// 	const response = await requestUrl({
// 		url: "https://api.openai.com/v1/chat/completions",
// 		method: "POST",
// 		body: JSON.stringify(data),
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${apiKey}`,
// 		},
// 	});
// 	const result = await response.json;
// 	logMessage("GPT result", result.choices[0].message.content);
// 	return result.choices[0].message.content.trim();
// }

// export default useText;
