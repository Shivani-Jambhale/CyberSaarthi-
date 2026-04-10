import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Lock, Check, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface Level {
  id: number;
  title: string;
  subtitle: string;
  requirements: string[];
  goal: string;
  minLength: number;
  needsUppercase: boolean;
  needsLowercase: boolean;
  needsNumbers: boolean;
  needsSpecial: boolean;
  examples: string[];
}

const levels: Level[] = [
  {
    id: 1,
    title: "Level 1",
    subtitle: "Basic Password",
    goal: "Create any password with at least 6 characters",
    requirements: ["At least 6 characters"],
    minLength: 6,
    needsUppercase: false,
    needsLowercase: false,
    needsNumbers: false,
    needsSpecial: false,
    examples: ["password", "hello123", "mynameisabc"],
  },
  {
    id: 2,
    title: "Level 2",
    subtitle: "Add Numbers",
    goal: "Create a password with letters AND numbers",
    requirements: [
      "At least 8 characters",
      "Contains uppercase letters (A-Z)",
      "Contains numbers (0-9)",
    ],
    minLength: 8,
    needsUppercase: true,
    needsLowercase: true,
    needsNumbers: true,
    needsSpecial: false,
    examples: ["Password1", "MyPass123", "Secure456"],
  },
  {
    id: 3,
    title: "Level 3",
    subtitle: "Special Characters",
    goal: "Add special characters to make it stronger",
    requirements: [
      "At least 10 characters",
      "Contains uppercase & lowercase",
      "Contains numbers",
      "Contains special characters (!@#$%^&*)",
    ],
    minLength: 10,
    needsUppercase: true,
    needsLowercase: true,
    needsNumbers: true,
    needsSpecial: true,
    examples: ["MyPass@123", "Secure#Pass1", "Strong!Pass99"],
  },
  {
    id: 4,
    title: "Level 4",
    subtitle: "Bank Account Strong",
    goal: "Create a bank-grade password",
    requirements: [
      "At least 12 characters",
      "Mix of uppercase & lowercase",
      "Numbers included",
      "Special characters included",
      "No common words (bank, password, 123, etc)",
    ],
    minLength: 12,
    needsUppercase: true,
    needsLowercase: true,
    needsNumbers: true,
    needsSpecial: true,
    examples: ["Tr0pic@lSun#92", "Phoenix$2024K9", "Zenith@Sky#841"],
  },
  {
    id: 5,
    title: "Level 5",
    subtitle: "Master Level",
    goal: "Create the ultimate secure password",
    requirements: [
      "At least 16 characters",
      "Uppercase, lowercase, numbers, special chars",
      "No repeated characters consecutively",
      "No personal information",
      "Unpredictable & memorable only to you",
    ],
    minLength: 16,
    needsUppercase: true,
    needsLowercase: true,
    needsNumbers: true,
    needsSpecial: true,
    examples: [
      "Qu1ck@Brown.Fox9",
      "BlueM00n$Night77",
      "J4zz&R0ck#Sunset8",
    ],
  },
];

export default function PasswordGame() {
  const navigate = useNavigate();
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState<number[]>([]);

  const level = levels[currentLevel - 1];

  const checkPassword = (pwd: string): boolean => {
    if (pwd.length < level.minLength) return false;
    if (level.needsUppercase && !/[A-Z]/.test(pwd)) return false;
    if (level.needsLowercase && !/[a-z]/.test(pwd)) return false;
    if (level.needsNumbers && !/[0-9]/.test(pwd)) return false;
    if (level.needsSpecial && !/[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]/.test(pwd))
      return false;

    // Check for consecutive repeated chars (Level 5)
    if (currentLevel === 5) {
      if (/(.)\1{1,}/.test(pwd)) return false;
    }

    return true;
  };

  const getPasswordStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= level.minLength) strength += 20;
    if (/[A-Z]/.test(pwd)) strength += 20;
    if (/[a-z]/.test(pwd)) strength += 20;
    if (/[0-9]/.test(pwd)) strength += 20;
    if (/[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]/.test(pwd)) strength += 20;
    return Math.min(strength, 100);
  };

  const handleCompleteLevel = () => {
    if (checkPassword(password)) {
      const newCompleted = [...levelCompleted, currentLevel];
      setLevelCompleted(newCompleted);

      // Unlock next level
      if (currentLevel < 5 && !unlockedLevels.includes(currentLevel + 1)) {
        setUnlockedLevels([...unlockedLevels, currentLevel + 1]);
      }

      // Show completion animation
      setTimeout(() => {
        if (currentLevel < 5) {
          setCurrentLevel(currentLevel + 1);
          setPassword("");
        }
      }, 1500);
    }
  };

  const strength = getPasswordStrength(password);
  const isValid = checkPassword(password);
  const isCompleted = levelCompleted.includes(currentLevel);

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
        <h1 className="text-white text-3xl font-bold">Password Strength Game</h1>
        <p className="text-white/90 text-lg mt-2">Build stronger passwords level by level</p>
      </div>

      <div className="px-6 py-6">
        {/* Progress Bar */}
        <div className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <span className="text-sm font-bold text-[#4a90e2]">
              {Math.round((levelCompleted.length / 5) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(levelCompleted.length / 5) * 100}%` }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-[#4a90e2] to-[#e07b39] rounded-full"
            />
          </div>
        </div>

        {/* Level Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Select Level</h2>
          <div className="grid grid-cols-5 gap-2">
            {levels.map((lv) => {
              const isUnlocked = unlockedLevels.includes(lv.id);
              const isCompleted = levelCompleted.includes(lv.id);
              const isCurrent = currentLevel === lv.id;

              return (
                <motion.button
                  key={lv.id}
                  onClick={() => isUnlocked && setCurrentLevel(lv.id)}
                  whileHover={isUnlocked ? { scale: 1.05 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                  className={`aspect-square rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-[#4a90e2] text-white shadow-lg"
                      : isUnlocked
                      ? "bg-white border-2 border-[#e8e3d8] text-gray-900"
                      : "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isUnlocked}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : lv.id}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Current Level */}
        <motion.div
          key={currentLevel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-6 shadow-sm"
        >
          {/* Level Title */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{level.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{level.goal}</p>

            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-green-50 border-l-4 border-green-500 rounded-lg p-3"
              >
                <Check className="w-5 h-5 text-green-600" />
                <p className="text-green-700 font-semibold">✓ Level Complete!</p>
              </motion.div>
            )}
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Requirements:</h3>
            <div className="space-y-2">
              {level.requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-gray-600">✓</span>
                  </div>
                  <p className="text-gray-700">{req}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-semibold mb-2">💡 Examples:</p>
            <div className="flex flex-wrap gap-2">
              {level.examples.map((ex, idx) => (
                <code
                  key={idx}
                  className="bg-blue-100 text-blue-900 px-3 py-1 rounded-lg text-xs font-mono"
                >
                  {ex}
                </code>
              ))}
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-900 font-bold mb-3">Enter your password:</label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password here..."
                className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Strength Meter */}
            {password && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Strength:</span>
                  <span
                    className="text-sm font-bold"
                    style={{
                      color:
                        strength < 40
                          ? "#ef4444"
                          : strength < 70
                          ? "#f59e0b"
                          : "#10b981",
                    }}
                  >
                    {strength < 40
                      ? "Weak"
                      : strength < 70
                      ? "Medium"
                      : "Strong"}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${strength}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                    style={{
                      backgroundColor:
                        strength < 40
                          ? "#ef4444"
                          : strength < 70
                          ? "#f59e0b"
                          : "#10b981",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Checklist */}
            {password && (
              <div className="space-y-2 mb-6 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                      password.length >= level.minLength
                        ? "bg-green-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {password.length >= level.minLength && "✓"}
                  </div>
                  <span className="text-sm text-gray-700">
                    Length: {password.length}/{level.minLength}
                  </span>
                </div>

                {level.needsUppercase && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                        /[A-Z]/.test(password)
                          ? "bg-green-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {/[A-Z]/.test(password) && "✓"}
                    </div>
                    <span className="text-sm text-gray-700">Uppercase letter (A-Z)</span>
                  </div>
                )}

                {level.needsNumbers && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                        /[0-9]/.test(password)
                          ? "bg-green-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {/[0-9]/.test(password) && "✓"}
                    </div>
                    <span className="text-sm text-gray-700">Number (0-9)</span>
                  </div>
                )}

                {level.needsSpecial && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                        /[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]/.test(password)
                          ? "bg-green-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {/[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]/.test(password) && "✓"}
                    </div>
                    <span className="text-sm text-gray-700">Special character (!@#$%)</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCompleteLevel}
            disabled={!isValid || isCompleted}
            className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
              isCompleted
                ? "bg-green-500 text-white"
                : isValid
                ? "bg-[#4a90e2] text-white active:scale-[0.98]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isCompleted ? (
              <>
                <Check className="w-5 h-5" /> Level Complete!
              </>
            ) : (
              "Complete Level"
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
