import { OPENAI_API_KEY } from "@/api-key";

const requestBody = {
  prompt: "",
  max_tokens: 4000,
  temperature: 0.9, //每次返回答案相似度0~1(0:每次都一致,1:每次都不同)
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.6,
  stop: ["Human:\n", "AI:\n"],
};

const aiModel = {
  API_KEY: OPENAI_API_KEY,
  model_engine: "text-davinci-003",
  reqBody: requestBody,
};

export function getOpenAiModel(doubtInfo: string) {
  console.info("doubtInfo: " + doubtInfo);
  aiModel.reqBody.prompt = doubtInfo;
  return aiModel;
}
