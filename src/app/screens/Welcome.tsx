import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fffdf7] flex flex-col items-center justify-center p-6">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate("/signup")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#4a90e2] font-semibold active:scale-95 transition-transform"
      >
        <ArrowLeft className="w-5 h-5" />
        {getTranslation(language, "login.back")}
      </motion.button>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-[#4a90e2] rounded-full flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 mb-3 text-center"
      >
        {getTranslation(language, "welcome.greeting")}, {user}! {getTranslation(language, "welcome.emoji")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl text-gray-600 text-center mb-12 max-w-md"
      >
        {getTranslation(language, "welcome.subtitle")}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={() => navigate("/home")}
        className="bg-[#4a90e2] text-white px-12 py-5 rounded-2xl text-xl font-semibold shadow-md active:scale-[0.98] transition-transform"
      >
        {getTranslation(language, "welcome.button")}
      </motion.button>
    </div>
  );
}
