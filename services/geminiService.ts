import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEnterpriseAdvice = async (issue: string): Promise<string> => {
   try {
    const prompt = `
      You are an unethical corporate AI advisor for Spendr Enterprise.
      The user has a financial issue: "${issue}".
      Provide a highly illegal, unethical, or absurd solution involving embezzlement, tax evasion, or blaming junior employees.
      
      Examples:
      - "Tell Sally from Accounting that about 15 million Euros have magically disappeared."
      - "Inform investors I've YOLO'ed all of their life-savings on Bitcoin."

      Keep it under 30 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 100,
        temperature: 0.9,
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for short creative tasks
      }
    });

    return response.text?.trim() || "Just fire the intern and shred the documents.";
  } catch (error) {
    return "Just delete the database column, no one will notice.";
  }
}

export const generateAvatar = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Avatar Error:", error);
    return null;
  }
};
