import dotenv from "dotenv"
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { basePrompt as nodeBasePrompt } from "./defaults/node.js";
import { basePrompt as reactBasePrompt } from "./defaults/react.js";
import { BASE_PROMPT, getSystemPrompt } from "./prompts.js";
import cors from "cors";


dotenv.config();

const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY as string;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const app = express();

app.use(express.json());
app.use(cors());

app.post("/template", async (req, res) => {
  const prompt: any = req.body.prompt;

  const response  = await  ai.models.generateContent({
    model: 'gemini-2.5-flash',
    config: {systemInstruction: "Return either node or React based on what you think this project should be in. Return either 'node' or 'react'. Return ONLY ONE WORD. Do not add anything extra. If you return anything else, the response is invalid. ",
    },
    contents: [
      {
        role: "user",
        parts: [{ text: prompt}]
      }
    ]
  })

  const answer = response.text as string; // react or node
  if (answer == "react"){
    res.json({
       prompts: [BASE_PROMPT, reactBasePrompt],
       uiPrompts: [reactBasePrompt]
    })
    return;
  }
  if( answer == "node") {
    res.json({
      prompts: [nodeBasePrompt],
      uiPrompts: [nodeBasePrompt]
    })
    return;
  }

  res.json(403).json({
    msg: "bad output by LLM"
  })
  return;
})

app.post("/chat", async (req, res) => {
  const message: string = req.body.message;
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    config: {systemInstruction: getSystemPrompt() },
    contents: [
      {
        role: "user",
        parts: [{ text: message }]
      }
    ]
  })

  res.json({
    response: response.text
  })
})

app.listen(3000);

