import { GoogleGenerativeAI } from "@google/genai";

let genAIInstance: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!genAIInstance) {
    const apiKey = process.env.GEMINI_API_KEY || "";
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
}

export const genAI = getGeminiClient();
