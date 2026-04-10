import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, AlertTriangle, Plus, X, Image as ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";

interface Report {
  id: number;
  name: string;
  location: string;
  time: string;
  message: string;
  avatar: string;
  image?: string;
  submittedBy?: string;
}

const initialReports: Report[] = [
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
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState<"world" | "nearby">("world");
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    location: "",
    type: "SMS",
    image: "",
  });

  const handleAddReport = () => {
    if (!formData.message.trim() || !formData.location.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const userInitials = userData?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

    const newReport: Report = {
      id: reports.length + 1,
      name: userData?.name || "Anonymous",
      location: formData.location,
      time: "just now",
      message: formData.message,
      avatar: userInitials,
      image: formData.image,
      submittedBy: userData?.name || "Anonymous",
    };

    setReports([newReport, ...reports]);
    setFormData({ message: "", location: "", type: "SMS", image: "" });
    setShowModal(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData({ ...formData, image: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredReports = activeTab === "nearby"
    ? reports.filter((r) => r.submittedBy === userData?.name)
    : reports;

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
        {filteredReports.map((report, index) => (
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
                    <h3 className="font-bold text-gray-900">
                      {report.submittedBy === userData?.name ? "Me" : report.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{report.location}</span>
                    </div>
                  </div>
                  <div className="bg-[#e07b39] w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{report.message}</p>
                {report.image && (
                  <div className="mb-3 rounded-lg overflow-hidden border border-[#e8e3d8]">
                    <img src={report.image} alt="Scam report" className="w-full max-h-64 object-cover" />
                  </div>
                )}
                <span className="text-xs text-gray-500">{report.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-6 w-16 h-16 bg-[#e07b39] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
      >
        <Plus className="w-8 h-8 text-white" strokeWidth={3} />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <motion.div
            initial={{ y: 500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 500, opacity: 0 }}
            className="w-full bg-white rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Report a Scam</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 active:scale-95 transition-transform"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Scam Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#e8e3d8] rounded-xl focus:outline-none focus:border-[#4a90e2]"
                >
                  <option>SMS</option>
                  <option>Call</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mumbai, Maharashtra"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#e8e3d8] rounded-xl focus:outline-none focus:border-[#4a90e2]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Describe the Scam
                </label>
                <textarea
                  placeholder="Share details about the scam attempt..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-[#e8e3d8] rounded-xl focus:outline-none focus:border-[#4a90e2] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Attach Image (Optional)
                </label>
                <div className="flex items-center justify-center border-2 border-dashed border-[#e8e3d8] rounded-xl p-6 hover:border-[#4a90e2] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="w-full cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="w-8 h-8 text-[#4a90e2]" />
                      <span className="text-sm font-medium text-gray-700">
                        {formData.image ? "Image selected ✓" : "Click to upload image"}
                      </span>
                    </div>
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-[#e8e3d8]">
                    <img src={formData.image} alt="Preview" className="w-full max-h-40 object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 border-2 border-[#e8e3d8] text-gray-900 rounded-xl font-semibold active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReport}
                className="flex-1 py-4 bg-[#e07b39] text-white rounded-xl font-semibold active:scale-95 transition-transform"
              >
                Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
