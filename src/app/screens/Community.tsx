import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, AlertTriangle, Plus } from "lucide-react";
import { motion } from "motion/react";

const reports = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    time: "2 hours ago",
    message: "Received fake call claiming to be from SBI. They asked for my ATM PIN.",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Amit Patel",
    location: "Ahmedabad, Gujarat",
    time: "5 hours ago",
    message: "Scam SMS about KYC update required for Aadhaar card with suspicious link.",
    avatar: "AP",
  },
  {
    id: 3,
    name: "Lakshmi Iyer",
    location: "Chennai, Tamil Nadu",
    time: "1 day ago",
    message: "WhatsApp message claiming I won a lottery. Asked to pay processing fee.",
    avatar: "LI",
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    location: "Delhi",
    time: "2 days ago",
    message: "Fake electricity bill payment link sent via SMS with urgent deadline.",
    avatar: "RK",
  },
];

export default function Community() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"world" | "nearby">("world");

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <div className="bg-[#4a90e2] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={() => navigate("/home")}
          className="mb-4 p-2 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-7 h-7 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold mb-2">Community Siren</h1>
        <p className="text-white/90 text-lg">Stay alert with real-time scam reports</p>

        <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-1.5 rounded-2xl mt-6">
          <button
            onClick={() => setActiveTab("world")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "world"
                ? "bg-white text-[#4a90e2] shadow-md"
                : "text-white/80 active:bg-white/10"
            }`}
          >
            Around the World
          </button>
          <button
            onClick={() => setActiveTab("nearby")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "nearby"
                ? "bg-white text-[#4a90e2] shadow-md"
                : "text-white/80 active:bg-white/10"
            }`}
          >
            Near Me
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#4a90e2] rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                {report.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{report.name}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{report.location}</span>
                    </div>
                  </div>
                  <div className="bg-[#e07b39] w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{report.message}</p>
                <span className="text-xs text-gray-500">{report.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="fixed bottom-8 right-6 w-16 h-16 bg-[#e07b39] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
        <Plus className="w-8 h-8 text-white" strokeWidth={3} />
      </button>
    </div>
  );
}
