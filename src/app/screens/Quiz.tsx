import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "motion/react";

const tabs = ["Deepfake", "Scam SMS", "Phishing"];

const questions = {
  Deepfake: {
    image: "🎭",
    question: "Does this video look authentic?",
    current: 1,
    total: 10,
  },
  "Scam SMS": {
    image: "📱",
    question: "Is this SMS message safe?",
    current: 3,
    total: 15,
  },
  Phishing: {
    image: "🎣",
    question: "Is this email legitimate?",
    current: 5,
    total: 12,
  },
};

export default function Quiz() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Deepfake");
  const [score, setScore] = useState(245);

  const currentQuestion = questions[activeTab as keyof typeof questions];

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <div className="bg-[#4a90e2] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={() => navigate("/home")}
          className="mb-4 p-2 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-7 h-7 text-white" />
        </button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-3xl font-bold">Quiz Challenge</h1>
            <p className="text-white/90 text-lg mt-1">Test your knowledge</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <p className="text-white/80 text-sm">Score</p>
            <p className="text-white text-2xl font-bold">{score}</p>
          </div>
        </div>

        <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-1.5 rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white text-[#4a90e2] shadow-md"
                  : "text-white/80 active:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">
              Question {currentQuestion.current} of {currentQuestion.total}
            </span>
            <span className="text-sm font-bold text-[#4a90e2]">
              {Math.round((currentQuestion.current / currentQuestion.total) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentQuestion.current / currentQuestion.total) * 100}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-[#4a90e2] rounded-full"
            />
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-8 mb-6 shadow-sm"
        >
          <div className="text-8xl text-center mb-6">{currentQuestion.image}</div>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            {currentQuestion.question}
          </h2>

          <div className="flex gap-4">
            <button
              onClick={() => setScore(score + 10)}
              className="flex-1 bg-green-500 text-white py-6 rounded-2xl flex flex-col items-center gap-2 shadow-md active:scale-[0.98] transition-transform"
            >
              <ThumbsUp className="w-8 h-8" />
              <span className="text-lg font-semibold">Real / Safe</span>
            </button>
            <button
              onClick={() => {}}
              className="flex-1 bg-red-500 text-white py-6 rounded-2xl flex flex-col items-center gap-2 shadow-md active:scale-[0.98] transition-transform"
            >
              <ThumbsDown className="w-8 h-8" />
              <span className="text-lg font-semibold">Fake / Scam</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
