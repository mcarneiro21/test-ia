import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

const image = fileToGenerativePart("TESTE.jpeg", "image/jpeg");

const imagePdf = fileToGenerativePart("TESTE.pdf", "application/pdf");

async function run() {
    const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = "Descrever imagem.";
    const imageParts = [
      imagePdf
    ];
    const generatedContent = await gemini.generateContent([prompt, ...imageParts]);
    console.log(generatedContent.response.text());
  }
  
  run();