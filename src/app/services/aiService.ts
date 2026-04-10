// AI Assistant Service using Claude API

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const MODEL = "gemini-2.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent`;

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are a helpful AI assistant for CyberSaarthi, an app dedicated to digital safety and cybersecurity education.

Your role is to:
1. Help users understand common scams, phishing, and digital threats
2. Provide practical cybersecurity tips and best practices
3. Explain security concepts in simple, easy-to-understand language
4. Give actionable advice on protecting personal information
5. Answer questions about passwords, 2FA, OTPs, and authentication
6. Warn about common threats in India like UPI scams, fake messages, etc.

Guidelines:
- Always be friendly and encouraging
- Use simple language, avoid technical jargon when possible
- When explaining complex topics, break them down into steps
- Be culturally sensitive and aware of Indian context
- Always emphasize the importance of not sharing sensitive information
- If unsure, admit it rather than guess
- Keep responses concise and actionable
- Provide real-world examples from Indian context when relevant
- Never provide instructions for illegal activities`;

export interface AIResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const toGeminiHistory = (messages: Message[]) =>
  messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

// Send message to Gemini API
export const sendMessageToAI = async (
  conversationHistory: Message[]
): Promise<AIResponse> => {
  if (!API_KEY) {
    return {
      success: false,
      error: "API key not configured. Please set VITE_GEMINI_API_KEY in .env.local",
    };
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: toGeminiHistory(conversationHistory),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Gemini API Error:", error);

      if (response.status === 400) {
        return { success: false, error: "Invalid request. Please try again." };
      }
      if (response.status === 403) {
        return { success: false, error: "Invalid API key. Please check your configuration." };
      }
      if (response.status === 429) {
        return { success: false, error: "Rate limited. Please wait a moment and try again." };
      }

      return {
        success: false,
        error: error?.error?.message || "Failed to get response from AI",
      };
    }

    const data = await response.json();
    const message = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!message) {
      return { success: false, error: "No response received from AI" };
    }

    return { success: true, message };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to connect to AI service",
    };
  }
};

// Stream response from Gemini API
export const streamMessageFromAI = async (
  conversationHistory: Message[],
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> => {
  if (!API_KEY) {
    onError("API key not configured. Please set VITE_GEMINI_API_KEY in .env.local");
    return;
  }

  try {
    const response = await fetch(`${STREAM_URL}?key=${API_KEY}&alt=sse`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: toGeminiHistory(conversationHistory),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      onError(error?.error?.message || "Failed to get response from AI");
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError("Unable to read response stream");
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            const chunk = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (chunk) onChunk(chunk);
          } catch {
            // skip malformed chunks
          }
        }
      }

      buffer = lines[lines.length - 1];
    }

    onComplete();
  } catch (error) {
    console.error("Error streaming from Gemini API:", error);
    onError(error instanceof Error ? error.message : "Failed to connect to AI service");
  }
};

export const isAIConfigured = (): boolean => !!API_KEY;
