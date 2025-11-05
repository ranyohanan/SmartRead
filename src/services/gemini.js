import { GoogleGenAI } from "@google/genai";
import { env } from '../config/env.js';

if (!env.GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY in .env');
}

export const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY
});