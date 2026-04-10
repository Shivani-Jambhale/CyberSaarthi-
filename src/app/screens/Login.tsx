import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (login(email, password)) {
      navigate("/home");
    } else {
      setError(getTranslation(language, "login.error"));
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fffdf7] flex flex-col p-6">
      {/* Back Button */}
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

      {/* Login Form Container */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <h1 className="text-4xl font-bold text-[#4a90e2] mb-3 text-center">
            {getTranslation(language, "login.title")}
          </h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            {getTranslation(language, "login.subtitle")}
          </p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6"
            >
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <label className="block text-gray-700 font-semibold mb-2">
                {getTranslation(language, "login.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={getTranslation(language, "login.emailPlaceholder")}
                className="w-full bg-white border-2 border-[#e8e3d8] rounded-2xl px-4 py-4 text-lg focus:outline-none focus:border-[#4a90e2] transition-colors"
                required
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <label className="block text-gray-700 font-semibold mb-2">
                {getTranslation(language, "login.password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={getTranslation(language, "login.passwordPlaceholder")}
                className="w-full bg-white border-2 border-[#e8e3d8] rounded-2xl px-4 py-4 text-lg focus:outline-none focus:border-[#4a90e2] transition-colors"
                required
              />
            </motion.div>

            {/* Login Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4a90e2] text-white py-5 rounded-2xl text-xl font-semibold shadow-md active:scale-[0.98] transition-transform disabled:opacity-70"
            >
              {isLoading ? getTranslation(language, "login.submitting") : getTranslation(language, "login.submit")}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-gray-600">
              {getTranslation(language, "login.signup")}{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#4a90e2] font-semibold hover:underline active:scale-95 transition-transform"
              >
                {getTranslation(language, "login.signupLink")}
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
