import { useNavigate } from "react-router";
import { Globe } from "lucide-react";
import { motion } from "motion/react";
import logo from "../../assest/logo.png.png";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";

export default function Splash() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fffdf7] flex flex-col items-center justify-between p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src={logo}
            alt="CyberSaarthi Logo"
            className="w-40 h-40 object-contain drop-shadow-lg"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-[#4a90e2] mb-3"
        >
          {getTranslation(language, "app.name")}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl text-gray-600 text-center mb-12 max-w-xs"
        >
          {getTranslation(language, "splash.tagline")}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-sm space-y-4"
        >
          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-[#4a90e2] text-white py-5 rounded-2xl text-xl font-semibold shadow-md active:scale-[0.98] transition-transform"
          >
            {getTranslation(language, "splash.signup")}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-white border-2 border-[#4a90e2] text-[#4a90e2] py-5 rounded-2xl text-xl font-semibold shadow-sm active:scale-[0.98] transition-transform"
          >
            {getTranslation(language, "splash.login")}
          </button>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-gray-500" />
        <select
          value={
            language === "हिन्दी" ? "हिन्दी (Hindi)" :
            language === "मराठी" ? "मराठी (Marathi)" :
            language === "தமிழ்" ? "தமிழ் (Tamil)" :
            "English"
          }
          onChange={(e) => {
            const languageMap: Record<string, any> = {
              "English": "English",
              "हिन्दी (Hindi)": "हिन्दी",
              "मराठी (Marathi)": "मराठी",
              "தமிழ் (Tamil)": "தமிழ்",
            };
            const actualLanguage = languageMap[e.target.value] || e.target.value;
            setLanguage(actualLanguage);
          }}
          className="bg-transparent text-gray-700 text-lg font-medium border-none outline-none"
        >
          <option value="English">English</option>
          <option value="हिन्दी (Hindi)">हिन्दी (Hindi)</option>
          <option value="मराठी (Marathi)">मराठी (Marathi)</option>
          <option value="தமிழ் (Tamil)">தமிழ் (Tamil)</option>
        </select>
      </div>
    </div>
  );
}
