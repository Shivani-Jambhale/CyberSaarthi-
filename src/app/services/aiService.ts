// AI Assistant Service using Claude API

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-3-5-sonnet-20241022";

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

// Send message to Claude API
export const sendMessageToAI = async (
  conversationHistory: Message[]
): Promise<AIResponse> => {
  if (!API_KEY) {
    return {
      success: false,
      error: "API key not configured. Please set VITE_CLAUDE_API_KEY environment variable.",
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: conversationHistory,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Claude API Error:", error);

      // Handle specific error cases
      if (response.status === 401) {
        return {
          success: false,
          error: "Invalid API key. Please check your configuration.",
        };
      }

      if (response.status === 429) {
        return {
          success: false,
          error: "Rate limited. Please wait a moment and try again.",
        };
      }

      return {
        success: false,
        error: error.message || "Failed to get response from AI",
      };
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    return {
      success: true,
      message: assistantMessage,
    };
  } catch (error) {
    console.error("Error calling Claude API:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to connect to AI service",
    };
  }
};

// Stream response from Claude API (for better UX with longer responses)
export const streamMessageFromAI = async (
  conversationHistory: Message[],
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> => {
  if (!API_KEY) {
    onError(
      "API key not configured. Please set VITE_CLAUDE_API_KEY environment variable."
    );
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: conversationHistory,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      onError(error.message || "Failed to get response from AI");
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
        const line = lines[i];
        if (line.startsWith("data: ")) {
          const data = JSON.parse(line.slice(6));

          if (
            data.type === "content_block_delta" &&
            data.delta.type === "text_delta"
          ) {
            onChunk(data.delta.text);
          }
        }
      }

      buffer = lines[lines.length - 1];
    }

    onComplete();
  } catch (error) {
    console.error("Error streaming from Claude API:", error);
    onError(
      error instanceof Error
        ? error.message
        : "Failed to connect to AI service"
    );
  }
};

// Validate if API is configured
export const isAIConfigured = (): boolean => {
  return !!API_KEY;
};
