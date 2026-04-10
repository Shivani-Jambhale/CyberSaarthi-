import { useNavigate } from "react-router";
import { ArrowLeft, Search, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import ReadAloudButton from "../components/ReadAloudButton";

const lessonData = [
  {
    title: "Passwords & Authentication",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols. It should not include easily guessable information such as names, birthdays, or common words. Strong passwords reduce the risk of brute-force and dictionary attacks.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves. This usually combines something you know (password) with something you have (OTP or device) or something you are (biometric). It significantly improves account security.",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts. This is known as credential stuffing.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords. It helps generate strong passwords and auto-fills them when needed, reducing the burden of remembering multiple credentials.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics such as fingerprints, facial recognition, or iris scans to verify identity. It is convenient and generally more secure than passwords alone.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email, valid for a short duration. It adds an extra layer of security during login or transactions.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together to verify identity, making unauthorized access more difficult.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords until the correct one is found. Strong passwords help prevent this.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach. However, frequent unnecessary changes can lead to weaker passwords.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words, making it easier to remember but harder to crack.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  },
  {
    title: "Phishing & Scams",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols. It should not include easily guessable information such as names, birthdays, or common words. Strong passwords reduce the risk of brute-force and dictionary attacks.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves. This usually combines something you know (password) with something you have (OTP or device) or something you are (biometric). It significantly improves account security.",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts. This is known as credential stuffing.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords. It helps generate strong passwords and auto-fills them when needed, reducing the burden of remembering multiple credentials.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics such as fingerprints, facial recognition, or iris scans to verify identity. It is convenient and generally more secure than passwords alone.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email, valid for a short duration. It adds an extra layer of security during login or transactions.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together to verify identity, making unauthorized access more difficult.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords until the correct one is found. Strong passwords help prevent this.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach. However, frequent unnecessary changes can lead to weaker passwords.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words, making it easier to remember but harder to crack.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  },
  {
    title: "Social Media Privacy",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols. It should not include easily guessable information such as names, birthdays, or common words.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves. This usually combines something you know (password) with something you have (OTP or device) or something you are (biometric).",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords and auto-fills them when needed.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics such as fingerprints, facial recognition, or iris scans to verify identity.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email, valid for a short duration.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together to verify identity.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords until the correct one is found.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words, making it easier to remember but harder to crack.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  },
  {
    title: "Malware & Viruses",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves.",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics such as fingerprints to verify identity.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  },
  {
    title: "Safe Browsing",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves.",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics to verify identity.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  },
  {
    title: "Public Wi-Fi",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves.",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics to verify identity.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  },
  {
    title: "Data Privacy",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves.",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics to verify identity.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  },
  {
    title: "Identity Theft",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves.",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics to verify identity.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  },
  {
    title: "App Permissions",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves.",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics to verify identity.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  },
  {
    title: "Best Practices",
    questions: [
      {
        q: "What is a strong password?",
        a: "A strong password is typically at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols.",
        video: "https://www.youtube.com/results?search_query=strong+password+explained"
      },
      {
        q: "What is Two-Factor Authentication (2FA)?",
        a: "2FA is a security process where users provide two different authentication factors to verify themselves.",
        video: "https://www.youtube.com/results?search_query=two+factor+authentication"
      },
      {
        q: "Why is password reuse dangerous?",
        a: "If you reuse the same password across multiple platforms and one site gets breached, attackers can use the same credentials to access your other accounts.",
        video: "https://www.youtube.com/results?search_query=password+reuse+risk"
      },
      {
        q: "What is a password manager?",
        a: "A password manager is a tool that securely stores and encrypts your passwords.",
        video: "https://www.youtube.com/results?search_query=password+manager"
      },
      {
        q: "What is biometric authentication?",
        a: "Biometric authentication uses unique biological characteristics to verify identity.",
        video: "https://www.youtube.com/results?search_query=biometric+authentication"
      },
      {
        q: "What is OTP?",
        a: "OTP (One-Time Password) is a temporary code sent to your registered device or email.",
        video: "https://www.youtube.com/results?search_query=otp+explained"
      },
      {
        q: "What is MFA?",
        a: "Multi-Factor Authentication involves two or more independent credentials used together.",
        video: "https://www.youtube.com/results?search_query=mfa+explained"
      },
      {
        q: "What is brute force attack?",
        a: "A brute force attack is when attackers try all possible combinations of passwords.",
        video: "https://www.youtube.com/results?search_query=brute+force+attack"
      },
      {
        q: "How often should passwords be changed?",
        a: "Passwords should be updated regularly, especially after a suspected breach.",
        video: "https://www.youtube.com/results?search_query=password+security"
      },
      {
        q: "What is passphrase?",
        a: "A passphrase is a longer password made of multiple words.",
        video: "https://www.youtube.com/results?search_query=passphrase"
      }
    ]
  }
];

export default function Learning() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Filter lessons based on search
  const getFilteredLessons = () => {
    if (!searchQuery.trim()) {
      return lessonData;
    }

    const query = searchQuery.toLowerCase();
    return lessonData
      .map((lesson) => {
        const matchingQuestions = lesson.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(query) ||
            q.a.toLowerCase().includes(query)
        );

        return {
          ...lesson,
          questions: matchingQuestions,
        };
      })
      .filter((lesson) => lesson.questions.length > 0 || lesson.title.toLowerCase().includes(query));
  };

  const filteredLessons = getFilteredLessons();

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* Header */}
      <div className="bg-[#4a90e2] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-white font-semibold mb-4 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
          Home
        </button>
        <h1 className="text-white text-3xl font-bold">Learning Lessons</h1>
      </div>

      <div className="px-6 py-6 space-y-5">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-4 flex items-center gap-3 shadow-sm sticky top-0 z-10"
        >
          <Search className="w-5 h-5 text-[#4a90e2]" />
          <input
            type="text"
            placeholder="Search any topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-lg bg-transparent outline-none text-gray-900 placeholder-gray-500"
          />
        </motion.div>

        {/* Lessons */}
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson, lessonIndex) => (
            <motion.div
              key={lesson.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: lessonIndex * 0.1, duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 px-1">
                {lesson.title}
              </h2>

              {/* Questions */}
              <div className="space-y-3 mb-8">
                {lesson.questions.map((q, qIndex) => {
                  const questionId = `${lesson.title}-${qIndex}`;
                  const isExpanded = expandedQuestion === questionId;

                  return (
                    <motion.div
                      key={qIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: qIndex * 0.05 }}
                      className="bg-white border-2 border-[#e8e3d8] rounded-2xl overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() =>
                          setExpandedQuestion(isExpanded ? null : questionId)
                        }
                        className="w-full p-5 flex items-start justify-between gap-3 active:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex-1 flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {q.q}
                            </h3>
                          </div>
                          <ReadAloudButton text={q.q} language={language} size="sm" className="shrink-0" />
                        </div>
                        <ChevronDown
                          className={`w-6 h-6 text-[#4a90e2] shrink-0 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Answer */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t-2 border-[#e8e3d8] bg-gray-50 px-5 py-5"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex-1">
                              <p className="text-gray-700 text-base leading-relaxed">
                                {q.a}
                              </p>
                            </div>
                            <ReadAloudButton text={q.a} language={language} size="sm" className="shrink-0 mt-1" />
                          </div>
                          <a
                            href={q.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#4a90e2] font-semibold text-sm hover:underline"
                          >
                            📺 Watch video
                          </a>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No lessons found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
