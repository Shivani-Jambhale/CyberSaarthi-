import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";
import type { Language } from "../contexts/LanguageContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    language: "English",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the complete user data in auth context
    signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
    });
    // Map display language to proper language key
    const languageMap: Record<string, any> = {
      "English": "English",
      "हिन्दी (Hindi)": "हिन्दी",
      "मराठी (Marathi)": "मराठी",
      "தமிழ் (Tamil)": "தமிழ்",
    };
    const actualLanguage = languageMap[formData.language] || formData.language;
    setLanguage(actualLanguage);
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen bg-[#fffdf7] p-6">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-[#4a90e2] font-semibold mb-8 active:scale-95 transition-transform"
      >
        <ArrowLeft className="w-5 h-5" />
        {getTranslation(language, "login.back")}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{getTranslation(language, "signup.title")}</h1>
        <p className="text-lg text-gray-600 mb-8">{getTranslation(language, "signup.subtitle")}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">
              {getTranslation(language, "signup.fullName")}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] transition-colors"
              placeholder={getTranslation(language, "signup.namePlaceholder")}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">
              {getTranslation(language, "signup.phone")}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] transition-colors"
              placeholder={getTranslation(language, "signup.phonePlaceholder")}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">
              {getTranslation(language, "signup.email")}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] transition-colors"
              placeholder={getTranslation(language, "signup.emailPlaceholder")}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">
              {getTranslation(language, "signup.city")}
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] transition-colors"
              placeholder={getTranslation(language, "signup.cityPlaceholder")}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">
              {getTranslation(language, "signup.language")}
            </label>
            <select
              value={
                formData.language === "हिन्दी" ? "हिन्दी (Hindi)" :
                formData.language === "मराठी" ? "मराठी (Marathi)" :
                formData.language === "தமிழ்" ? "தமிழ் (Tamil)" :
                formData.language
              }
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] transition-colors"
            >
              <option value="English">English</option>
              <option value="हिन्दी (Hindi)">हिन्दी (Hindi)</option>
              <option value="मराठी (Marathi)">मराठी (Marathi)</option>
              <option value="தமிழ் (Tamil)">தமிழ் (Tamil)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4a90e2] text-white py-5 rounded-2xl text-xl font-semibold shadow-md mt-8 active:scale-[0.98] transition-transform"
          >
            {getTranslation(language, "signup.submit")}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
