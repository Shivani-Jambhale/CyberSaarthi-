
import { useState } from "react";
import { useNavigate } from "react-router";
import { BookOpen, Gamepad2, Trophy, Users, MessageCircle, LogOut, User, Bell } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";
import ReminderModal from "../components/ReminderModal";
import { useReminderCheck } from "../hooks/useReminderCheck";

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  // Start checking for reminders
  useReminderCheck();

  const currentHour = new Date().getHours();
  let greetingKey = "home.greeting.morning";
  if (currentHour >= 12 && currentHour < 17) {
    greetingKey = "home.greeting.afternoon";
  } else if (currentHour >= 17) {
    greetingKey = "home.greeting.evening";
  }

  // Capitalize first letter of username
  const displayName = user ? user.charAt(0).toUpperCase() + user.slice(1) : "User";

  return (

    <div className="min-h-screen bg-[#fffdf7] pb-6">

      <div className="bg-[#4a90e2] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/90 text-lg mb-1">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="text-white text-3xl font-bold">
              {getTranslation(language, greetingKey)}, {displayName}
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <User className="w-7 h-7 text-[#4a90e2]" />
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
              title="Logout"
            >
              <LogOut className="w-7 h-7 text-[#4a90e2]" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white border-l-4 border-[#e07b39] rounded-2xl p-5 mb-6 shadow-sm"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900">{getTranslation(language, "home.scamAlert")}</h3>
          </div>
          <p className="text-gray-700 mb-3">
            {getTranslation(language, "home.scamContent")}
          </p>
          <p className="text-sm text-gray-500">{getTranslation(language, "home.scamWarning")}</p>
        </motion.div>

        <button
          onClick={() => setReminderModalOpen(true)}
          className="w-full bg-white border-2 border-[#e8e3d8] rounded-2xl p-4 mb-6 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
        >
          <Bell className="w-5 h-5 text-[#4a90e2]" />
          <span className="text-lg font-semibold text-gray-900">{getTranslation(language, "home.reminder")}</span>
        </button>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <NavTile
            icon={<BookOpen className="w-8 h-8" />}
            label={getTranslation(language, "home.learning")}
            color="#4a90e2"
            onClick={() => navigate("/learning")}
          />
          <NavTile
            icon={<Gamepad2 className="w-8 h-8" />}
            label={getTranslation(language, "home.practice")}
            color="#e07b39"
            onClick={() => navigate("/practice")}
          />
          <NavTile
            icon={<Trophy className="w-8 h-8" />}
            label={getTranslation(language, "home.quiz")}
            color="#4a90e2"
            onClick={() => navigate("/quiz")}
          />
          <NavTile
            icon={<Users className="w-8 h-8" />}
            label={getTranslation(language, "home.community")}
            color="#e07b39"
            onClick={() => navigate("/community")}
          />
        </div>

        <button
          onClick={() => navigate("/ai-assistant")}
          className="w-full bg-[#4a90e2] text-white rounded-2xl p-6 flex items-center justify-between shadow-md active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-7 h-7" />
            <span className="text-xl font-semibold">{getTranslation(language, "home.aiAssistant")}</span>
          </div>
          <div className="text-sm bg-white/20 px-3 py-1 rounded-full">{getTranslation(language, "home.askAnything")}</div>
        </button>
      </div>

      <ReminderModal open={reminderModalOpen} onOpenChange={setReminderModalOpen} />
    </div>
  );
}

function NavTile({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm active:scale-[0.95] transition-transform"
    >
      <div style={{ color }}>{icon}</div>
      <span className="text-lg font-semibold text-gray-900">{label}</span>
    </button>
  );
}
