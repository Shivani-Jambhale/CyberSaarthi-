import { useNavigate } from "react-router";
import { ArrowLeft, User, Trophy, Flame, Award, Bell } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { userData } = useAuth();

  const displayName = userData?.name || "User";
  const displayCity = userData?.city || "City not specified";

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <div className="bg-[#4a90e2] px-6 pt-12 pb-20 rounded-b-[2rem]">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 p-2 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-7 h-7 text-white" />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <User className="w-12 h-12 text-[#4a90e2]" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-1">{displayName}</h1>
          <p className="text-white/80 text-lg">{displayCity}</p>
        </div>
      </div>

      <div className="px-6 -mt-12">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard icon={<Trophy className="w-7 h-7" />} value="245" label="Points" color="#4a90e2" />
          <StatCard icon={<Flame className="w-7 h-7" />} value="7" label="Day Streak" color="#e07b39" />
          <StatCard icon={<Award className="w-7 h-7" />} value="12" label="Badges" color="#4a90e2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-6 mb-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-5">Today's Progress</h2>

          <ProgressBar label="Learning" progress={60} color="#4a90e2" />
          <ProgressBar label="Quiz" progress={40} color="#e07b39" />
          <ProgressBar label="Practice" progress={80} color="#4a90e2" />
        </motion.div>

        <button className="w-full bg-white border-2 border-[#e8e3d8] rounded-2xl p-5 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-[#4a90e2]" />
            <span className="text-lg font-semibold text-gray-900">Manage Reminders</span>
          </div>
          <div className="text-sm text-gray-600">3 active</div>
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-4 flex flex-col items-center shadow-sm"
    >
      <div style={{ color }} className="mb-2">
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-0.5">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </motion.div>
  );
}

function ProgressBar({ label, progress, color }: { label: string; progress: number; color: string }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{progress}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
