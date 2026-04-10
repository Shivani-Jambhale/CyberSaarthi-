import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mic, Send, Loader } from "lucide-react";
import { motion } from "motion/react";
import { sendMessageToAI, isAIConfigured } from "../services/aiService";
import { toast } from "sonner";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  isLoading?: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hello! I'm your AI safety assistant. I can help you understand scams, check if something is safe, or answer any questions about digital security. How can I help you today?",
  },
];

export default function AIAssistant() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check if API is configured
  useEffect(() => {
    if (!isAIConfigured()) {
      setError(
        "⚠️ API key not configured. Please set VITE_CLAUDE_API_KEY in your .env file"
      );
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      text: input,
    };

    // Add loading assistant message
    const loadingMessage: Message = {
      id: messages.length + 2,
      role: "assistant",
      text: "",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      // Prepare conversation history for the API
      const conversationHistory = messages
        .filter((m) => !m.isLoading)
        .map((m) => ({
          role: m.role,
          content: m.text,
        }));

      // Add the new user message
      conversationHistory.push({
        role: "user",
        content: userMessage.text,
      });

      // Get AI response
      const response = await sendMessageToAI(conversationHistory);

      if (response.success && response.message) {
        // Update the loading message with actual response
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.role === "assistant" && lastMsg.isLoading) {
            lastMsg.text = response.message || "";
            lastMsg.isLoading = false;
          }
          return updated;
        });
      } else {
        // Show error message
        const errorText =
          response.error || "Sorry, I couldn't process your question.";
        toast.error(errorText);
        setError(errorText);

        // Replace loading message with error
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: `Sorry, I encountered an error: ${errorText}`,
            isLoading: false,
          };
          return updated;
        });
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred";
      toast.error(errorMsg);
      setError(errorMsg);

      // Replace loading message
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: `Error: ${errorMsg}`,
          isLoading: false,
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#fffdf7] flex flex-col">
      <div className="bg-[#4a90e2] px-6 pt-12 pb-6 rounded-b-[2rem] shrink-0">
        <button
          onClick={() => navigate("/home")}
          className="mb-4 p-2 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-7 h-7 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold">AI Assistant</h1>
        <p className="text-white/90 text-lg mt-1">Ask me anything about digital safety</p>
      </div>

      {/* Error Banner */}
      {error && error.includes("not configured") && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-4 rounded">
          <p className="text-yellow-800 text-sm font-semibold">{error}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-white border-2 border-[#e8e3d8] text-gray-900"
              }`}
            >
              {message.isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              ) : (
                <p className="text-lg leading-relaxed whitespace-pre-wrap">{message.text}</p>
              )}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 px-6 pb-8 pt-4 bg-[#fffdf7]">
        <div className="flex items-center gap-3">
          <button
            disabled={isLoading}
            className="w-14 h-14 bg-[#4a90e2] rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0 disabled:opacity-50"
            title="Voice input (coming soon)"
          >
            <Mic className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-white border-2 border-[#e8e3d8] rounded-full px-5 py-3 shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  sendMessage();
                }
              }}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-lg text-gray-900 placeholder-gray-400 disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-[#4a90e2] rounded-full flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50"
              title="Send message"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
