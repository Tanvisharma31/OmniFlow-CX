import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google AI (Gemini)
// This uses the API Key method which is easier for development/free-tier
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export { model };
