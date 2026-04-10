import { useNavigate } from "react-router";
import { ArrowLeft, ChevronDown, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface Permission {
  name: string;
  allowed: boolean;
  why: string;
  risk: string;
  consequence: string;
}

interface AppInfo {
  id: number;
  name: string;
  icon: string;
  category: string;
  description: string;
  permissions: Permission[];
  riskLevel: "low" | "medium" | "high";
}

const apps: AppInfo[] = [
  {
    id: 1,
    name: "WhatsApp",
    icon: "💬",
    category: "Messaging",
    description: "Messaging and calling app for staying in touch",
    riskLevel: "medium",
    permissions: [
      {
        name: "Contacts",
        allowed: true,
        why: "To find and message your friends",
        risk: "Low",
        consequence: "App can see all your saved contacts list",
      },
      {
        name: "Camera",
        allowed: true,
        why: "To take photos and videos for messages",
        risk: "Medium",
        consequence: "App can access your camera anytime",
      },
      {
        name: "Microphone",
        allowed: true,
        why: "For voice calls and video calls",
        risk: "Medium",
        consequence: "App can record audio without being obvious",
      },
      {
        name: "Storage",
        allowed: true,
        why: "To save photos, videos, and files",
        risk: "Medium",
        consequence: "App can access, modify, or delete files",
      },
      {
        name: "Location",
        allowed: false,
        why: "Not needed for messaging",
        risk: "High",
        consequence: "App can track where you are at all times",
      },
      {
        name: "Calendar",
        allowed: false,
        why: "Not needed for messaging",
        risk: "High",
        consequence: "App can see all your scheduled events",
      },
    ],
  },
  {
    id: 2,
    name: "Google Maps",
    icon: "🗺️",
    category: "Navigation",
    description: "Navigation and location services",
    riskLevel: "high",
    permissions: [
      {
        name: "Location (Precise)",
        allowed: true,
        why: "To show your exact location and navigation",
        risk: "High",
        consequence: "App knows exactly where you are",
      },
      {
        name: "Location (Approximate)",
        allowed: true,
        why: "To find nearby places and services",
        risk: "Medium",
        consequence: "App knows area/neighborhood you're in",
      },
      {
        name: "Camera",
        allowed: true,
        why: "For Street View feature",
        risk: "Medium",
        consequence: "Can take photos through camera",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Not needed for navigation",
        risk: "High",
        consequence: "App tracks where your contacts live",
      },
    ],
  },
  {
    id: 3,
    name: "Google Photos",
    icon: "🖼️",
    category: "Storage",
    description: "Cloud storage for photos and videos",
    riskLevel: "high",
    permissions: [
      {
        name: "Storage",
        allowed: true,
        why: "To access and backup your photos",
        risk: "High",
        consequence: "App can see ALL your photos and videos",
      },
      {
        name: "Camera",
        allowed: true,
        why: "To take photos directly in app",
        risk: "Medium",
        consequence: "Can access camera anytime",
      },
      {
        name: "Location",
        allowed: false,
        why: "Use only if you want location tags in photos",
        risk: "High",
        consequence: "Photos reveal where you took them",
      },
    ],
  },
  {
    id: 4,
    name: "Instagram",
    icon: "📷",
    category: "Social Media",
    description: "Social networking and photo sharing",
    riskLevel: "high",
    permissions: [
      {
        name: "Contacts",
        allowed: false,
        why: "Used to find friends but sells data",
        risk: "High",
        consequence: "App can see and analyze your friends",
      },
      {
        name: "Camera & Microphone",
        allowed: true,
        why: "For stories, reels, and live videos",
        risk: "High",
        consequence: "Can watch you and record without clear indication",
      },
      {
        name: "Storage",
        allowed: true,
        why: "To save and upload photos",
        risk: "High",
        consequence: "Accesses all your files and photos",
      },
      {
        name: "Location",
        allowed: false,
        why: "Not needed - privacy risk",
        risk: "High",
        consequence: "Tracks everywhere you post from",
      },
    ],
  },
  {
    id: 5,
    name: "Google Pay / PhonePe",
    icon: "💳",
    category: "Banking",
    description: "Digital payment and money transfer",
    riskLevel: "medium",
    permissions: [
      {
        name: "Contacts",
        allowed: true,
        why: "To send money to your contacts",
        risk: "Low",
        consequence: "App sees your phone contacts",
      },
      {
        name: "SMS",
        allowed: true,
        why: "To read OTP and verification codes",
        risk: "Medium",
        consequence: "App can read all your text messages",
      },
      {
        name: "Location",
        allowed: false,
        why: "Not needed for payments",
        risk: "High",
        consequence: "Knows every location you transact from",
      },
      {
        name: "Camera",
        allowed: true,
        why: "To scan QR codes for payments",
        risk: "Low",
        consequence: "Can take photos through app",
      },
    ],
  },
  {
    id: 6,
    name: "Gmail",
    icon: "📧",
    category: "Email",
    description: "Email service and communication",
    riskLevel: "high",
    permissions: [
      {
        name: "Contacts",
        allowed: true,
        why: "To show email suggestions",
        risk: "Medium",
        consequence: "App stores all your contact email addresses",
      },
      {
        name: "Calendar",
        allowed: false,
        why: "Not necessary for email",
        risk: "Medium",
        consequence: "Can sync and read all your calendar events",
      },
      {
        name: "Storage",
        allowed: true,
        why: "To attach and download files",
        risk: "Medium",
        consequence: "Can access all files on your phone",
      },
    ],
  },
  {
    id: 7,
    name: "Facebook",
    icon: "👤",
    category: "Social Media",
    description: "Social network and messaging",
    riskLevel: "high",
    permissions: [
      {
        name: "Contacts",
        allowed: false,
        why: "Privacy concern - sells data",
        risk: "High",
        consequence: "Uploads and analyzes all your contacts",
      },
      {
        name: "Location",
        allowed: false,
        why: "Tracks activity and ads targeting",
        risk: "High",
        consequence: "Tracks everywhere you go",
      },
      {
        name: "Camera & Microphone",
        allowed: true,
        why: "For video calls and live videos",
        risk: "High",
        consequence: "Can access camera/mic without clear indicator",
      },
      {
        name: "Calendar",
        allowed: false,
        why: "Not needed for social media",
        risk: "High",
        consequence: "Can see when and where you're busy",
      },
    ],
  },
  {
    id: 8,
    name: "YouTube",
    icon: "▶️",
    category: "Entertainment",
    description: "Video streaming platform",
    riskLevel: "medium",
    permissions: [
      {
        name: "Storage",
        allowed: true,
        why: "To cache and play videos",
        risk: "Low",
        consequence: "Stores video files on your device",
      },
      {
        name: "Microphone",
        allowed: false,
        why: "Not needed for watching",
        risk: "High",
        consequence: "Can record audio without permission",
      },
      {
        name: "Camera",
        allowed: true,
        why: "Only if you want to upload videos",
        risk: "Medium",
        consequence: "Can access your camera",
      },
    ],
  },
  {
    id: 9,
    name: "Uber / Ola",
    icon: "🚗",
    category: "Transportation",
    description: "Ride-sharing and transportation service",
    riskLevel: "high",
    permissions: [
      {
        name: "Location (Precise)",
        allowed: true,
        why: "To track your ride in real-time",
        risk: "High",
        consequence: "Knows your exact location during rides",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Not necessary for ride booking",
        risk: "Medium",
        consequence: "Can see who you contact frequently",
      },
      {
        name: "Camera",
        allowed: false,
        why: "Not needed for transportation",
        risk: "High",
        consequence: "Can record your surroundings",
      },
      {
        name: "Microphone",
        allowed: false,
        why: "Privacy concern",
        risk: "High",
        consequence: "Can record conversations",
      },
    ],
  },
  {
    id: 10,
    name: "Zomato / Swiggy",
    icon: "🍕",
    category: "Food Delivery",
    description: "Food ordering and delivery service",
    riskLevel: "medium",
    permissions: [
      {
        name: "Location",
        allowed: true,
        why: "To show restaurants near you",
        risk: "Medium",
        consequence: "Knows where you order food from",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Not needed for food delivery",
        risk: "Low",
        consequence: "Can access your contacts",
      },
      {
        name: "Camera",
        allowed: false,
        why: "Not needed",
        risk: "Medium",
        consequence: "Unnecessary access",
      },
    ],
  },
  {
    id: 11,
    name: "Amazon",
    icon: "📦",
    category: "Shopping",
    description: "E-commerce and shopping platform",
    riskLevel: "medium",
    permissions: [
      {
        name: "Location",
        allowed: true,
        why: "For delivery address and local recommendations",
        risk: "Low",
        consequence: "Tracks where you shop and live",
      },
      {
        name: "Camera",
        allowed: true,
        why: "For product scanning and AR features",
        risk: "Medium",
        consequence: "Can access camera for photos",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Not needed for shopping",
        risk: "Low",
        consequence: "Can see your contacts",
      },
    ],
  },
  {
    id: 12,
    name: "LinkedIn",
    icon: "💼",
    category: "Professional",
    description: "Professional networking platform",
    riskLevel: "medium",
    permissions: [
      {
        name: "Contacts",
        allowed: false,
        why: "Privacy concern - profile building",
        risk: "Medium",
        consequence: "Can analyze your professional network",
      },
      {
        name: "Calendar",
        allowed: false,
        why: "Not needed",
        risk: "Low",
        consequence: "Can see your availability",
      },
      {
        name: "Location",
        allowed: false,
        why: "Reveals work location history",
        risk: "High",
        consequence: "Tracks where you work",
      },
    ],
  },
  {
    id: 13,
    name: "Spotify / Apple Music",
    icon: "🎵",
    category: "Entertainment",
    description: "Music streaming service",
    riskLevel: "low",
    permissions: [
      {
        name: "Storage",
        allowed: true,
        why: "To cache music files",
        risk: "Low",
        consequence: "Stores music on your device",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Not needed for music",
        risk: "Low",
        consequence: "Can share your music taste with contacts",
      },
    ],
  },
  {
    id: 14,
    name: "Snapchat",
    icon: "👻",
    category: "Social Media",
    description: "Messaging with disappearing content",
    riskLevel: "high",
    permissions: [
      {
        name: "Camera & Microphone",
        allowed: true,
        why: "Core feature of app",
        risk: "High",
        consequence: "Always listening and watching",
      },
      {
        name: "Location",
        allowed: false,
        why: "Privacy danger",
        risk: "High",
        consequence: "Reveals where you take snaps",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Privacy concern",
        risk: "Medium",
        consequence: "Uploads and analyzes contacts",
      },
    ],
  },
  {
    id: 15,
    name: "Discord",
    icon: "🎮",
    category: "Communication",
    description: "Voice, video, and text communication",
    riskLevel: "medium",
    permissions: [
      {
        name: "Microphone",
        allowed: true,
        why: "For voice chat",
        risk: "Medium",
        consequence: "Accesses your microphone",
      },
      {
        name: "Camera",
        allowed: true,
        why: "For video calls",
        risk: "Medium",
        consequence: "Can use your camera",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Not needed",
        risk: "Low",
        consequence: "Can see your contacts",
      },
    ],
  },
  {
    id: 16,
    name: "Banking App (SBI, HDFC, etc)",
    icon: "🏦",
    category: "Banking",
    description: "Official bank app for account management",
    riskLevel: "low",
    permissions: [
      {
        name: "SMS",
        allowed: true,
        why: "For OTP verification",
        risk: "Low",
        consequence: "Reads SMS for authentication",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Not necessary",
        risk: "Low",
        consequence: "Can see contacts",
      },
      {
        name: "Location",
        allowed: false,
        why: "Not needed",
        risk: "Medium",
        consequence: "Knows where you do banking",
      },
    ],
  },
  {
    id: 17,
    name: "Telegram",
    icon: "✈️",
    category: "Messaging",
    description: "Encrypted messaging and calls",
    riskLevel: "low",
    permissions: [
      {
        name: "Contacts",
        allowed: true,
        why: "To find friends",
        risk: "Low",
        consequence: "Sees your contacts",
      },
      {
        name: "Camera & Mic",
        allowed: true,
        why: "For calls and media sharing",
        risk: "Low",
        consequence: "Access for calls",
      },
      {
        name: "Location",
        allowed: false,
        why: "Privacy risk",
        risk: "Medium",
        consequence: "Tracks where you share from",
      },
    ],
  },
  {
    id: 18,
    name: "Reddit",
    icon: "🔴",
    category: "Social Media",
    description: "Discussion forum and content aggregator",
    riskLevel: "medium",
    permissions: [
      {
        name: "Camera",
        allowed: true,
        why: "For posting photos and videos",
        risk: "Low",
        consequence: "Can take photos",
      },
      {
        name: "Location",
        allowed: false,
        why: "Not needed - privacy risk",
        risk: "Medium",
        consequence: "Knows where you post from",
      },
      {
        name: "Microphone",
        allowed: false,
        why: "Not needed",
        risk: "Low",
        consequence: "Can record audio",
      },
    ],
  },
  {
    id: 19,
    name: "Chrome Browser",
    icon: "🔍",
    category: "Browsing",
    description: "Web browser for internet access",
    riskLevel: "high",
    permissions: [
      {
        name: "Storage",
        allowed: true,
        why: "To cache websites and files",
        risk: "High",
        consequence: "Stores browsing history and cookies",
      },
      {
        name: "Location",
        allowed: false,
        why: "Not necessary for browsing",
        risk: "High",
        consequence: "Can track where you visit sites from",
      },
      {
        name: "Camera & Microphone",
        allowed: false,
        why: "Only if needed for video conferencing",
        risk: "High",
        consequence: "Can spy through camera/mic",
      },
    ],
  },
  {
    id: 20,
    name: "Netflix",
    icon: "🎬",
    category: "Entertainment",
    description: "Video streaming service",
    riskLevel: "low",
    permissions: [
      {
        name: "Storage",
        allowed: true,
        why: "To download and cache videos",
        risk: "Low",
        consequence: "Stores video files",
      },
      {
        name: "Camera",
        allowed: false,
        why: "Not needed for streaming",
        risk: "Low",
        consequence: "Unnecessary access",
      },
    ],
  },
  {
    id: 21,
    name: "Shazam",
    icon: "🎶",
    category: "Music",
    description: "Music identification app",
    riskLevel: "low",
    permissions: [
      {
        name: "Microphone",
        allowed: true,
        why: "To record and identify songs",
        risk: "Low",
        consequence: "Listens to identify music",
      },
      {
        name: "Location",
        allowed: false,
        why: "Not needed",
        risk: "Low",
        consequence: "Can see where you identify music",
      },
    ],
  },
  {
    id: 22,
    name: "Twitch",
    icon: "👾",
    category: "Entertainment",
    description: "Live streaming platform for gaming",
    riskLevel: "medium",
    permissions: [
      {
        name: "Camera & Microphone",
        allowed: true,
        why: "For streaming to audience",
        risk: "Medium",
        consequence: "Can access camera and mic",
      },
      {
        name: "Storage",
        allowed: true,
        why: "To store and manage streams",
        risk: "Low",
        consequence: "Stores stream data",
      },
    ],
  },
  {
    id: 23,
    name: "Pinterest",
    icon: "📌",
    category: "Social Media",
    description: "Image discovery and bookmarking",
    riskLevel: "medium",
    permissions: [
      {
        name: "Camera",
        allowed: true,
        why: "To pin photos from camera",
        risk: "Low",
        consequence: "Can take photos",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Privacy concern",
        risk: "Medium",
        consequence: "Can see your contacts",
      },
      {
        name: "Location",
        allowed: false,
        why: "Not needed",
        risk: "Medium",
        consequence: "Tracks where you save pins",
      },
    ],
  },
  {
    id: 24,
    name: "QuillBot / Grammarly",
    icon: "✍️",
    category: "Productivity",
    description: "Writing assistant and grammar checker",
    riskLevel: "high",
    permissions: [
      {
        name: "Storage",
        allowed: true,
        why: "To access documents",
        risk: "High",
        consequence: "Can read all your writings and documents",
      },
      {
        name: "Keyboard",
        allowed: false,
        why: "Extreme privacy risk",
        risk: "High",
        consequence: "Can record everything you type including passwords",
      },
    ],
  },
  {
    id: 25,
    name: "Fitbit / Health Apps",
    icon: "❤️",
    category: "Health",
    description: "Health and fitness tracking",
    riskLevel: "high",
    permissions: [
      {
        name: "Health Data",
        allowed: true,
        why: "To track fitness and health",
        risk: "High",
        consequence: "Knows your health conditions, heart rate, sleep",
      },
      {
        name: "Location",
        allowed: false,
        why: "Not needed for fitness",
        risk: "High",
        consequence: "Tracks where you exercise",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Not needed",
        risk: "Low",
        consequence: "Can see your contacts",
      },
    ],
  },
  {
    id: 26,
    name: "Duolingo",
    icon: "🦉",
    category: "Education",
    description: "Language learning app",
    riskLevel: "low",
    permissions: [
      {
        name: "Microphone",
        allowed: true,
        why: "For pronunciation lessons",
        risk: "Low",
        consequence: "Records your voice for lessons",
      },
      {
        name: "Contacts",
        allowed: false,
        why: "Not needed for learning",
        risk: "Low",
        consequence: "Can see contacts",
      },
    ],
  },
  {
    id: 27,
    name: "Reddit / Twitter",
    icon: "🐦",
    category: "Social Media",
    description: "Social sharing and discussions",
    riskLevel: "medium",
    permissions: [
      {
        name: "Camera",
        allowed: true,
        why: "For posting photos",
        risk: "Low",
        consequence: "Can take photos",
      },
      {
        name: "Location",
        allowed: false,
        why: "Privacy risk",
        risk: "Medium",
        consequence: "Tracks where you tweet from",
      },
    ],
  },
];

export default function AppPermissions() {
  const navigate = useNavigate();
  const [expandedApp, setExpandedApp] = useState<number | null>(null);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-50 border-red-200";
      case "medium":
        return "bg-orange-50 border-orange-200";
      case "low":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <div className="bg-[#4a90e2] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={() => navigate("/practice")}
          className="flex items-center gap-2 text-white font-semibold mb-4 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-white text-3xl font-bold">App Permissions Guide</h1>
        <p className="text-white/90 text-lg mt-2">Learn what permissions apps need and which to deny</p>
      </div>

      <div className="px-6 py-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <p className="text-blue-900 font-semibold text-sm">💡 Smart Privacy Tip:</p>
          <p className="text-blue-700 text-sm mt-1">
            Only allow permissions that the app ACTUALLY needs to function. Deny everything else!
          </p>
        </div>

        <div className="space-y-3">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <motion.button
                onClick={() =>
                  setExpandedApp(expandedApp === app.id ? null : app.id)
                }
                whileHover={{ scale: 1.01 }}
                className={`w-full text-left border-2 rounded-2xl p-4 transition-all ${
                  expandedApp === app.id
                    ? "border-[#4a90e2] bg-blue-50"
                    : "border-[#e8e3d8] bg-white hover:border-[#4a90e2]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-3xl">{app.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {app.name}
                      </h3>
                      <p className="text-sm text-gray-600">{app.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${getRiskColor(
                        app.riskLevel
                      )} ${getRiskBg(app.riskLevel)}`}
                    >
                      {app.riskLevel.toUpperCase()} RISK
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-600 transition-transform ${
                        expandedApp === app.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </motion.button>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedApp === app.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white border-2 border-t-0 border-[#4a90e2] rounded-b-2xl p-6 space-y-4">
                      {app.permissions.map((perm, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`border-l-4 rounded-lg p-4 ${
                            perm.allowed
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {perm.allowed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900">
                                {perm.name}
                              </h4>
                              <p className="text-sm text-gray-700 mt-1">
                                <span className="font-semibold">Why:</span> {perm.why}
                              </p>
                            </div>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                                perm.allowed
                                  ? "bg-green-200 text-green-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {perm.allowed ? "✓ ALLOW" : "✗ DENY"}
                            </span>
                          </div>

                          <div className="ml-8 space-y-2 text-sm">
                            <div className="flex gap-2">
                              <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                              <div>
                                <p className="font-semibold text-orange-900">
                                  Risk Level: {perm.risk}
                                </p>
                                <p className="text-orange-800">
                                  {perm.consequence}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Summary Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">🔐 Security Rules to Remember:</h3>
          <div className="space-y-2 text-gray-800 text-sm">
            <p>✓ Only allow permissions the app NEEDS to work</p>
            <p>✓ Camera & Microphone = PRIVACY THREAT - Deny unless essential</p>
            <p>✓ Location access = Can track where you go 24/7 - Deny unless necessary</p>
            <p>✓ Contacts & Calendar = Personal data - Deny if possible</p>
            <p>✓ Check permissions in: Settings → Apps → [App Name] → Permissions</p>
            <p>✓ Use {"\""}While using app only{"\""}  for Location instead of {"\""}Always{"\""}</p>
            <p>✓ Uninstall apps that ask for unnecessary permissions</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
