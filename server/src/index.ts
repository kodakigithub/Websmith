import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY as string;


const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "explain why i am the best in a few words",
  });
  console.log(response.text);
}

main();
