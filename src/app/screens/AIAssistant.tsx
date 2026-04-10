import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mic, Send } from "lucide-react";
import { motion } from "motion/react";

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Hello! I'm your AI safety assistant. I can help you understand scams, check if something is safe, or answer any questions about digital security. How can I help you today?",
  },
];

export default function AIAssistant() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { id: messages.length + 1, role: "user", text: input },
      {
        id: messages.length + 2,
        role: "assistant",
        text: "That's a great question! Let me help you understand this better. Always remember: never share your OTP, PIN, or password with anyone, even if they claim to be from your bank.",
      },
    ]);
    setInput("");
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

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-white border-2 border-[#e8e3d8] text-gray-900"
              }`}
            >
              <p className="text-lg leading-relaxed">{message.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="shrink-0 px-6 pb-8 pt-4 bg-[#fffdf7]">
        <div className="flex items-center gap-3">
          <button className="w-14 h-14 bg-[#4a90e2] rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0">
            <Mic className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-white border-2 border-[#e8e3d8] rounded-full px-5 py-3 shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your question..."
              className="flex-1 bg-transparent outline-none text-lg text-gray-900 placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-[#4a90e2] rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
