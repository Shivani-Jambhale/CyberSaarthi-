import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ThumbsUp, ThumbsDown, AlertCircle, Trophy, Shield, Home, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import ReadAloudButton from "../components/ReadAloudButton";
import deepfakeVideo1 from "../../../public/videos/deepfake1.mp4";
import deepfakeVideo2 from "../../../public/videos/deepfake2.mp4";

const tabs = ["Deepfake", "Phishing/Scam Message"];

// Per-tab question arrays. Each question may include `image` OR a `message` with a `kind` (sms/email)
// `isReal` indicates whether the item is safe/legit (true) or malicious/fake (false).
type Question = {
  image?: string;
  video?: string;
  question: string;
  isReal: boolean;
  hint?: string;
  kind?: "sms" | "email" | "notification";
  message?: string;
};

const questionsPerTab: Record<string, Question[]> = {
  Deepfake: [
    {
      video: deepfakeVideo1,
      question: "Does this clip look like a real recording or a manipulated deepfake?",
      isReal: false,
      hint: "Some facial features or lighting look inconsistent and mouth movements may not sync — signs of a deepfake.",
    },
     {
      video: deepfakeVideo2,
      question: "Does this clip look like a real recording or a manipulated deepfake?",
      isReal: false,
      hint: "Some facial features or lighting look inconsistent and mouth movements may not sync — signs of a deepfake.",
    },
    {
      image: "https://picsum.photos/seed/deepfake2/1200/675",
      question: "Does this photo look real or AI generated?",
      isReal: true,
    },
    {
      image: "https://picsum.photos/seed/deepfake6/1200/675",
      question: "Do the trees look natural?",
      isReal: false,
      hint: "Blurry edges, patchy texture or odd blending are signs of synthetic generation.",
    },
    {
      video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      question: "Play this clip — does the motion and scene look natural or fake?",
      isReal: true,
      hint: "Look for smooth natural motion; this sample is a real clip for testing playback.",
    },
    // Removed several generic sample videos that didn't contain faces or relevant cues,
    // to avoid mismatched questions. Keep only videos that match the assessment prompts.
  ],
  "Phishing/Scam Message": [
    {
      kind: "sms",
      message: "URGENT: Your account will be suspended. Verify here: http://bit.ly/verify-now",
      question: "Does this message look scam or suspicious?",
      isReal: false,
      hint: "Shortened links and urgent threat language are common in phishing — avoid clicking and verify from the official app/site.",
    },
    {
      kind: "email",
      message:
        "From: support@bank-secure.com\nSubject: Verify your account\n\nWe detected unusual activity. Please update your password immediately at http://bank-secure-login.example",
      question: "Does the sender address look official and trustworthy?",
      isReal: false,
      hint: "The sender domain looks suspicious (bank-secure.com) and the link points to a non-bank domain — check the real bank site instead.",
    },
    {
      kind: "email",
      message:
        "Subject: Important - Action Required\n\nWe noticed a login from a new device. Click here to secure your account: http://secure-login.example.com",
      question: "Is this message real or suspicious?",
      isReal: false,
      hint: "This message uses urgency and an unfamiliar link — legitimate services rarely ask for immediate clicks via unknown links.",
    },
    {
      kind: "notification",
      message: "Amazon Delivery: Your package is scheduled for today. Track at Anazon.com/track (no action required)",
      question: "Does this notification appear to be from a trusted service?",
      isReal: false,
      hint: "Look at the spelling of Amazon its misspelled as Anazon and the link is suspicious — check your official Amazon app or site for real delivery updates.",
    },
    {
      kind: "email",
      message: "From: colleague@company.com\nSubject: Meeting notes\n\nHey — attaching the notes from today's meeting. See you at 3pm.",
      question: "Is this inbox message from a known contact or a verified sender?",
      isReal: true,
    },
  ],
};

export default function Quiz() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("Deepfake");
  const [score, setScore] = useState(245);

  // Per-tab current index
  const [currentIndex, setCurrentIndex] = useState(0);
  // null = not answered yet, 'real' or 'fake' = user's choice
  const [selectedAnswer, setSelectedAnswer] = useState<"real" | "fake" | null>(null);
  // whether the last answer was correct (used for styling/feedback)
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  // Reset when switching tabs
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setLastCorrect(null);
  }, [activeTab]);

  const tabQuestions = questionsPerTab[activeTab];
  const currentQuestion = tabQuestions[currentIndex];

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

      {/* Completion Popup for Deepfake tab */}
      <AnimatePresence>
        {showCompletionPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCompletionPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-yellow-300"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-50"></div>
                  <Trophy className="w-24 h-24 text-yellow-500 relative z-10" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.5, repeat: 2 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Well done!</h2>
                <div className="bg-green-100 border-2 border-green-400 rounded-xl p-4 mb-4">
                  <Shield className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-green-800">{activeTab} Quiz Complete</p>
                </div>
                <p className="text-gray-700 mb-4">You've finished the {activeTab} challenge. Great job spotting manipulated content!</p>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowCompletionPopup(false);
                      // restart current tab
                      setSelectedAnswer(null);
                      setLastCorrect(null);
                      setCurrentIndex(0);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Restart {activeTab}
                  </button>

                  <button
                    onClick={() => {
                      setShowCompletionPopup(false);
                      navigate("/home");
                    }}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Main Menu
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 py-6">
        <div className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">
              Question {currentIndex + 1} of {tabQuestions.length}
            </span>
            <span className="text-sm font-bold text-[#4a90e2]">
              {Math.round(((currentIndex + 1) / tabQuestions.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / tabQuestions.length) * 100}%` }}
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
          <div className="text-center mb-6">
            {currentQuestion.message ? (
              <div className="mx-auto w-full max-w-md">
                <div className="border rounded-2xl overflow-hidden shadow-sm bg-gray-50">
                  <div className="bg-black/5 px-3 py-2 text-xs text-gray-600">Phone Preview • {currentQuestion.kind}</div>
                  <div className="bg-white p-4">
                    {currentQuestion.kind === "email" && (
                      <div className="mb-3 text-sm text-gray-600">
                        {currentQuestion.message
                          .split("\n")
                          .slice(0, 2)
                          .map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      {currentQuestion.kind === "sms" && (
                        <div className="self-start bg-gray-100 text-gray-900 px-4 py-2 rounded-lg max-w-[85%]">
                          {currentQuestion.message}
                        </div>
                      )}

                      {currentQuestion.kind === "notification" && (
                        <div className="self-start bg-blue-50 text-gray-900 px-4 py-2 rounded-lg max-w-[95%]">
                          {currentQuestion.message}
                        </div>
                      )}

                      {currentQuestion.kind === "email" && (
                        <div className="bg-gray-50 border rounded-lg p-3 text-sm whitespace-pre-line">
                          {currentQuestion.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : currentQuestion.video ? (
              <div className="mx-auto w-full max-w-xl rounded-md shadow-sm overflow-hidden">
                <video
                  src={currentQuestion.video}
                  controls
                  playsInline
                  className="w-full h-auto bg-black"
                />
              </div>
            ) : (
              <img src={currentQuestion.image} alt="question" className="mx-auto w-full max-w-xl rounded-md shadow-sm" />
            )}
          </div>
          <div className="flex items-start justify-between gap-3 mb-8">
            <h2 className="text-xl font-bold text-gray-900 flex-1">
              {currentQuestion.question}
            </h2>
            <ReadAloudButton text={currentQuestion.question} language={language} size="sm" className="shrink-0 mt-1" />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (selectedAnswer) return;
                const choice = "real" as const;
                setSelectedAnswer(choice);
                const correct = currentQuestion.isReal === true;
                setLastCorrect(correct);
                if (correct) setScore((s) => s + 10);
                // toast feedback
                if (correct) {
                  toast.success("Correct!");
                } else {
                  toast.error("Incorrect");
                }

                // auto-advance after a short delay only if correct
                if (currentIndex < tabQuestions.length - 1 && correct) {
                  setTimeout(() => {
                    setSelectedAnswer(null);
                    setLastCorrect(null);
                    setCurrentIndex((i) => i + 1);
                  }, 900);
                }
                // If this was the final question in the current tab, show completion modal
                if (currentIndex === tabQuestions.length - 1) {
                  setShowCompletionPopup(true);
                }
              }}
              disabled={!!selectedAnswer}
              className={`flex-1 py-6 rounded-2xl flex flex-col items-center gap-2 shadow-md active:scale-[0.98] transition-transform ${
                selectedAnswer
                  ? lastCorrect === true && selectedAnswer === "real"
                    ? "bg-green-500 text-white"
                    : lastCorrect === false && selectedAnswer === "real"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700"
                  : "bg-green-500 text-white"
              }`}
            >
              <ThumbsUp className="w-8 h-8" />
              <span className="text-lg font-semibold">Real / Safe</span>
            </button>

            <button
              onClick={() => {
                if (selectedAnswer) return;
                const choice = "fake" as const;
                setSelectedAnswer(choice);
                const correct = currentQuestion.isReal === false;
                setLastCorrect(correct);
                if (correct) setScore((s) => s + 10);
                // toast feedback
                if (correct) {
                  toast.success("Correct!");
                } else {
                  toast.error("Incorrect");
                }

                if (currentIndex < tabQuestions.length - 1 && correct) {
                  setTimeout(() => {
                    setSelectedAnswer(null);
                    setLastCorrect(null);
                    setCurrentIndex((i) => i + 1);
                  }, 900);
                }
                if (currentIndex === tabQuestions.length - 1) {
                  setShowCompletionPopup(true);
                }
              }}
              disabled={!!selectedAnswer}
              className={`flex-1 py-6 rounded-2xl flex flex-col items-center gap-2 shadow-md active:scale-[0.98] transition-transform ${
                selectedAnswer
                  ? lastCorrect === true && selectedAnswer === "fake"
                    ? "bg-green-500 text-white"
                    : lastCorrect === false && selectedAnswer === "fake"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700"
                  : "bg-red-500 text-white"
              }`}
            >
              <ThumbsDown className="w-8 h-8" />
              <span className="text-lg font-semibold">Fake / Scam</span>
            </button>
          </div>

          {/* Hint when user answered incorrectly */}
          {selectedAnswer && lastCorrect === false && (
            <div className="mt-4 flex items-start gap-3 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm text-yellow-900">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="font-semibold mb-1">Why this looks suspicious</div>
                <div className="whitespace-pre-line">{currentQuestion.hint ?? "This item contains signs of phishing or manipulation — look for suspicious links, sender addresses, or unnatural media."}</div>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      if (currentIndex < tabQuestions.length - 1) {
                        setSelectedAnswer(null);
                        setLastCorrect(null);
                        setCurrentIndex((i) => i + 1);
                      }
                    }}
                    className="mt-2 px-3 py-2 rounded-lg bg-[#4a90e2] text-white font-semibold"
                    disabled={currentIndex >= tabQuestions.length - 1}
                  >
                    Next Question
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Next question controls */}
          <div className="mt-4 flex gap-2">
            <div className="ml-auto" />
            <button
              onClick={() => {
                // reset current tab quiz
                setSelectedAnswer(null);
                setLastCorrect(null);
                setCurrentIndex(0);
              }}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold"
            >
              Restart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
