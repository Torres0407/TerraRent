
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PROPERTIES } from '../constants';

// Initialize the AI client using the mandatory environment variable
// FIX: Per coding guidelines, API_KEY must be used directly from process.env.
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelPlanAdviceStream = async (userMood: string, onChunk: (text: string) => void) => {
  try {
    const ai = getAIClient();
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: [{
        parts: [{
          text: `You are the TerraRent AI Concierge. Based on the mood or request: "${userMood}", which of these properties would you recommend? 
          Available properties: ${PROPERTIES.map(p => `${p.title} in ${p.location}`).join(', ')}.
          Give a short, friendly, and atmospheric recommendation. Explain the 'vibe' and why it fits. 
          Use a warm, architectural, and nature-inspired tone.`
        }]
      }],
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        onChunk(fullText);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini Streaming Error:", error);
    onChunk("I'm having a little trouble connecting to my travel brain right now, but any of our curated homes would be a great choice!");
    return "";
  }
};

export const searchPropertiesAI = async (query: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        parts: [{
          text: `The user is looking for a rental with this query: "${query}". 
          From our list of properties: ${JSON.stringify(PROPERTIES)}, return a JSON array of the IDs (as strings) of the top relevant properties. 
          Limit to the 3 best matches.`
        }]
      }],
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

export const getSuggestedReply = async (messages: { role: 'user' | 'owner'; text: string }[]) => {
  try {
    const ai = getAIClient();
    
    // Format the conversation history for the prompt
    const conversationHistory = messages
      .map(m => `${m.role === 'user' ? 'You' : 'Sarah'}: ${m.text}`)
      .join('\n');

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        parts: [{
          text: `You are the user, a renter looking for a place. Your name is Alex. This is your conversation history with Sarah, the property owner:\n\n${conversationHistory}\n\nSuggest a friendly, professional, and concise reply to Sarah's last message.`
        }]
      }],
    });
    
    // Clean up the response, removing potential quotation marks
    return response.text?.replace(/^"|"$/g, '').trim() || '';

  } catch (error) {
    console.error("Gemini Reply Suggestion Error:", error);
    return "Sorry, I couldn't think of a reply right now.";
  }
};