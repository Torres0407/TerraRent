
import { GoogleGenAI, Type } from "@google/genai";
import { PROPERTIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTravelPlanAdvice = async (userMood: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the mood or request: "${userMood}", which of these properties would you recommend? 
      Available properties: ${PROPERTIES.map(p => `${p.title} in ${p.location}`).join(', ')}.
      Give a short, friendly recommendation and explain why it fits the mood.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a little trouble connecting to my travel brain right now, but any of our curated homes would be a great choice!";
  }
};

export const searchPropertiesAI = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is looking for a rental with this query: "${query}". 
      From our list of properties: ${JSON.stringify(PROPERTIES)}, return a JSON array of the IDs (as strings) of the top 2 most relevant properties.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
};
