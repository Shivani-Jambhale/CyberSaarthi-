import { useNavigate } from "react-router";
import { ArrowLeft, CreditCard, Lock, Shield, Phone } from "lucide-react";
import { motion } from "motion/react";

const practices = [
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "UPI Payment Simulation",
    description: "Practice making safe digital payments",
    color: "#4a90e2",
    route: "/upi-simulation",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Password Creation Game",
    description: "Learn to create strong passwords",
    color: "#e07b39",
    route: "/password-game",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "App Permissions",
    description: "Understand what apps can access",
    color: "#4a90e2",
    route: "/app-permissions",
  },
];

export default function Practice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <div className="bg-[#4a90e2] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={() => navigate("/home")}
          className="mb-4 p-2 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-7 h-7 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold">Practice Sessions</h1>
        <p className="text-white/90 text-lg mt-2">Hands-on practice in a safe environment</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {practices.map((practice, index) => (
          <motion.div
            key={practice.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <button
              onClick={() => practice.route && navigate(practice.route)}
              className="w-full bg-white border-2 border-[#e8e3d8] rounded-2xl p-6 shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${practice.color}20`, color: practice.color }}
                >
                  {practice.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{practice.title}</h3>
                  <p className="text-gray-600">{practice.description}</p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
