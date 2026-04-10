import { useNavigate } from "react-router";
import { ArrowLeft, Download, UserPlus, Wallet, Lock, Send, Check, ChevronRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const upiApps = [
  { name: "Google Pay", icon: "🔵", verified: true, rating: 4.8 },
  { name: "PhonePe", icon: "💜", verified: true, rating: 4.7 },
  { name: "PayTM", icon: "🟦", verified: true, rating: 4.6 },
  { name: "BHIM", icon: "🇮🇳", verified: true, rating: 4.5 },
  { name: "UPI Fraud App", icon: "❌", verified: false, rating: 2.1 },
];

const banks = [
  { name: "State Bank of India", ifsc: "SBIN0001234" },
  { name: "HDFC Bank", ifsc: "HDFC0001234" },
  { name: "ICICI Bank", ifsc: "ICIC0001234" },
  { name: "Axis Bank", ifsc: "UTIB0001234" },
];

export default function UPISimulation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState(0);
  const [upiSimulation, setUpiSimulation] = useState({
    selectedApp: null as string | null,
    phoneNumber: "",
    otp: "",
    otpSent: false,
    accountVerified: false,
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiPin: "",
    upiPinConfirm: "",
    showUpiPin: false,
    recipientName: "",
    recipientUpi: "",
    amount: "",
    paymentConfirmed: false,
  });

  const steps = [
    { id: 1, title: "Download UPI App", icon: Download },
    { id: 2, title: "Create Account", icon: UserPlus },
    { id: 3, title: "Link Bank Account", icon: Wallet },
    { id: 4, title: "Set UPI PIN", icon: Lock },
    { id: 5, title: "Make Payment", icon: Send },
    { id: 6, title: "Completion", icon: Check },
  ];

  // Step 1: Download App
  const renderDownloadApp = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Download a UPI App</h2>
      <p className="text-gray-600 mb-6">Select a verified UPI app from the options below:</p>

      <div className="space-y-3 mb-6">
        {upiApps.map((app) => (
          <motion.button
            key={app.name}
            onClick={() => {
              if (app.verified) {
                setUpiSimulation({ ...upiSimulation, selectedApp: app.name });
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
              upiSimulation.selectedApp === app.name
                ? "bg-green-50 border-green-500"
                : app.verified
                ? "border-[#e8e3d8] hover:border-[#4a90e2]"
                : "border-red-300 bg-red-50 opacity-60 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{app.icon}</span>
              <div className="text-left">
                <p className="font-bold text-gray-900">{app.name}</p>
                {app.verified ? (
                  <p className="text-sm text-green-600">✓ Verified • ⭐ {app.rating}</p>
                ) : (
                  <p className="text-sm text-red-600">⚠️ Fake App - DO NOT DOWNLOAD</p>
                )}
              </div>
            </div>
            {upiSimulation.selectedApp === app.name && <Check className="w-6 h-6 text-green-500" />}
          </motion.button>
        ))}
      </div>

      {upiSimulation.selectedApp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6"
        >
          <p className="text-blue-900 font-semibold">✓ Great choice! {upiSimulation.selectedApp} is trusted and secure.</p>
        </motion.div>
      )}

      <button
        onClick={() => upiSimulation.selectedApp && setCurrentStep(1)}
        disabled={!upiSimulation.selectedApp}
        className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
          upiSimulation.selectedApp
            ? "bg-[#4a90e2] text-white active:scale-[0.98]"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );

  // Step 2: Create Account & Verify
  const renderCreateAccount = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account & Verify</h2>

      {!upiSimulation.otpSent ? (
        <>
          <p className="text-gray-600 mb-4">Enter your phone number linked to your bank account:</p>
          <input
            type="tel"
            placeholder="+91 9876543210"
            value={upiSimulation.phoneNumber}
            onChange={(e) => setUpiSimulation({ ...upiSimulation, phoneNumber: e.target.value })}
            maxLength={13}
            className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] mb-6"
          />

          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">
            <p className="text-yellow-900 text-sm">
              ⚠️ Always use your original, registered phone number. Never share it with others.
            </p>
          </div>

          <button
            onClick={() => {
              if (upiSimulation.phoneNumber.length >= 10) {
                setUpiSimulation({ ...upiSimulation, otpSent: true });
              }
            }}
            disabled={upiSimulation.phoneNumber.length < 10}
            className={`w-full py-4 rounded-2xl font-semibold transition-all ${
              upiSimulation.phoneNumber.length >= 10
                ? "bg-[#4a90e2] text-white active:scale-[0.98]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Send OTP
          </button>
        </>
      ) : !upiSimulation.accountVerified ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-6">
            <p className="text-green-900 font-semibold">✓ OTP sent to {upiSimulation.phoneNumber}</p>
            <p className="text-green-700 text-sm mt-1">(Demo: Enter any 6 digits)</p>
          </motion.div>

          <p className="text-gray-600 mb-4">Enter the OTP received via SMS:</p>
          <input
            type="text"
            placeholder="000000"
            value={upiSimulation.otp}
            onChange={(e) => setUpiSimulation({ ...upiSimulation, otp: e.target.value })}
            maxLength={6}
            className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] mb-6 tracking-widest text-center"
          />

          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-900 text-sm font-semibold">🔒 Never share OTP with anyone, not even bank staff!</p>
          </div>

          <button
            onClick={() => {
              if (upiSimulation.otp.length === 6) {
                setUpiSimulation({ ...upiSimulation, accountVerified: true, otp: "" });
              }
            }}
            disabled={upiSimulation.otp.length !== 6}
            className={`w-full py-4 rounded-2xl font-semibold transition-all ${
              upiSimulation.otp.length === 6
                ? "bg-[#4a90e2] text-white active:scale-[0.98]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Verify OTP
          </button>
        </>
      ) : (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-6">
            <p className="text-green-900 font-semibold">✓ Account Created Successfully!</p>
            <p className="text-green-700 text-sm mt-1">Your account is now verified and ready.</p>
          </motion.div>

          <button
            onClick={() => setCurrentStep(2)}
            className="w-full bg-[#4a90e2] text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </motion.div>
  );

  // Step 3: Link Bank Account
  const renderLinkBank = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Link Your Bank Account</h2>

      {!upiSimulation.accountNumber ? (
        <>
          <p className="text-gray-600 mb-4">Select your bank:</p>
          <select
            value={upiSimulation.bankName}
            onChange={(e) => {
              const selected = banks.find((b) => b.name === e.target.value);
              if (selected) {
                setUpiSimulation({
                  ...upiSimulation,
                  bankName: selected.name,
                  ifscCode: selected.ifsc,
                });
              }
            }}
            className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] mb-6"
          >
            <option value="">Choose your bank</option>
            {banks.map((bank) => (
              <option key={bank.name} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>

          {upiSimulation.bankName && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6"
            >
              <p className="text-blue-900 text-sm font-semibold">Bank Selected: {upiSimulation.bankName}</p>
              <p className="text-blue-700 text-sm mt-1">IFSC: {upiSimulation.ifscCode}</p>
            </motion.div>
          )}

          <p className="text-gray-600 mb-4">Enter your bank account number:</p>
          <input
            type="text"
            placeholder="Enter 8-18 digit account number"
            value={upiSimulation.accountNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 18) {
                setUpiSimulation({ ...upiSimulation, accountNumber: value });
              }
            }}
            maxLength={18}
            className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] mb-4"
          />
          <p className="text-sm text-gray-500 mb-6">
            {upiSimulation.accountNumber.length}/18 characters
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">
            <p className="text-yellow-900 text-sm font-semibold">⚠️ Use the account number from your Check Book</p>
            <p className="text-yellow-700 text-sm mt-1">Never share your full account number with anyone except your bank</p>
          </div>

          <button
            onClick={() => {
              if (upiSimulation.bankName && upiSimulation.accountNumber.length >= 8) {
                setUpiSimulation({ ...upiSimulation, accountVerified: true });
              }
            }}
            disabled={!upiSimulation.bankName || upiSimulation.accountNumber.length < 8}
            className={`w-full py-4 rounded-2xl font-semibold transition-all ${
              upiSimulation.bankName && upiSimulation.accountNumber.length >= 8
                ? "bg-[#4a90e2] text-white active:scale-[0.98]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Verify Account
          </button>
        </>
      ) : (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-6">
            <p className="text-green-900 font-semibold">✓ Bank Account Linked Successfully!</p>
            <p className="text-green-700 text-sm mt-1">
              {upiSimulation.bankName} • •••{upiSimulation.accountNumber.slice(-4)}
            </p>
          </motion.div>

          <button
            onClick={() => setCurrentStep(3)}
            className="w-full bg-[#4a90e2] text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </motion.div>
  );

  // Step 4: Set UPI PIN
  const renderSetPin = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create UPI PIN</h2>

      {!upiSimulation.paymentConfirmed ? (
        <>
          <p className="text-gray-600 mb-4">Set a secure 4-6 digit UPI PIN (different from ATM PIN):</p>

          <div className="relative mb-4">
            <input
              type={upiSimulation.showUpiPin ? "text" : "password"}
              placeholder="••••••"
              value={upiSimulation.upiPin}
              onChange={(e) => setUpiSimulation({ ...upiSimulation, upiPin: e.target.value })}
              maxLength={6}
              className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] tracking-widest text-center"
            />
            <button
              onClick={() => setUpiSimulation({ ...upiSimulation, showUpiPin: !upiSimulation.showUpiPin })}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {upiSimulation.showUpiPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <p className="text-gray-600 mb-4">Confirm UPI PIN:</p>
          <div className="relative mb-6">
            <input
              type={upiSimulation.showUpiPin ? "text" : "password"}
              placeholder="••••••"
              value={upiSimulation.upiPinConfirm}
              onChange={(e) => setUpiSimulation({ ...upiSimulation, upiPinConfirm: e.target.value })}
              maxLength={6}
              className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] tracking-widest text-center"
            />
            <button
              onClick={() => setUpiSimulation({ ...upiSimulation, showUpiPin: !upiSimulation.showUpiPin })}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {upiSimulation.showUpiPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="space-y-2 mb-6">
            <div className={`p-3 rounded-lg ${upiSimulation.upiPin.length >= 4 ? "bg-green-50 border-l-4 border-green-500" : "bg-gray-50"}`}>
              <p className={upiSimulation.upiPin.length >= 4 ? "text-green-700" : "text-gray-600"}>
                ✓ Length: {upiSimulation.upiPin.length}/6 digits (minimum 4)
              </p>
            </div>
            <div className={`p-3 rounded-lg ${upiSimulation.upiPin === upiSimulation.upiPinConfirm && upiSimulation.upiPin ? "bg-green-50 border-l-4 border-green-500" : "bg-gray-50"}`}>
              <p className={upiSimulation.upiPin === upiSimulation.upiPinConfirm && upiSimulation.upiPin ? "text-green-700" : "text-gray-600"}>
                ✓ PIN matches
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-900 text-sm font-semibold">🔒 NEVER share your UPI PIN with anyone!</p>
          </div>

          <button
            onClick={() => {
              if (upiSimulation.upiPin.length >= 4 && upiSimulation.upiPin === upiSimulation.upiPinConfirm) {
                setUpiSimulation({ ...upiSimulation, paymentConfirmed: true });
              }
            }}
            disabled={upiSimulation.upiPin.length < 4 || upiSimulation.upiPin !== upiSimulation.upiPinConfirm}
            className={`w-full py-4 rounded-2xl font-semibold transition-all ${
              upiSimulation.upiPin.length >= 4 && upiSimulation.upiPin === upiSimulation.upiPinConfirm
                ? "bg-[#4a90e2] text-white active:scale-[0.98]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Create PIN
          </button>
        </>
      ) : (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-6">
            <p className="text-green-900 font-semibold">✓ UPI PIN Created Successfully!</p>
            <p className="text-green-700 text-sm mt-1">Your UPI PIN is now active and memorized.</p>
          </motion.div>

          <button
            onClick={() => setCurrentStep(4)}
            className="w-full bg-[#4a90e2] text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </motion.div>
  );

  

  const renderMakePayment = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Money via UPI</h2>

      {!paymentProcessing && !upiSimulation.recipientName ? (
        <>
          <p className="text-gray-600 mb-4">Recipient details:</p>
          <input
            type="text"
            placeholder="Recipient Name"
            value={upiSimulation.recipientName}
            onChange={(e) => setUpiSimulation({ ...upiSimulation, recipientName: e.target.value })}
            className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] mb-3"
          />

          <input
            type="text"
            placeholder="Recipient UPI ID (username@bank)"
            value={upiSimulation.recipientUpi}
            onChange={(e) => setUpiSimulation({ ...upiSimulation, recipientUpi: e.target.value })}
            className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] mb-3"
          />

          <input
            type="number"
            placeholder="Amount (₹)"
            value={upiSimulation.amount}
            onChange={(e) => setUpiSimulation({ ...upiSimulation, amount: e.target.value })}
            className="w-full px-5 py-4 bg-white border-2 border-[#e8e3d8] rounded-2xl text-lg focus:outline-none focus:border-[#4a90e2] mb-6"
          />

          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">
            <p className="text-yellow-900 text-sm font-semibold">⚠️ Always verify recipient details before sending money!</p>
            <p className="text-yellow-700 text-sm mt-1">Even a small typo can send money to the wrong person.</p>
          </div>

          <button
            onClick={() => {
              if (upiSimulation.recipientName && upiSimulation.recipientUpi && upiSimulation.amount) {
                setPaymentProcessing(true);
                setPaymentStep(0);
              }
            }}
            disabled={!upiSimulation.recipientName || !upiSimulation.recipientUpi || !upiSimulation.amount}
            className={`w-full py-4 rounded-2xl font-semibold transition-all ${
              upiSimulation.recipientName && upiSimulation.recipientUpi && upiSimulation.amount
                ? "bg-[#4a90e2] text-white active:scale-[0.98]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue to Payment
          </button>
        </>
      ) : paymentProcessing ? (
        <>
          {/* Phone Screen Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black rounded-3xl p-2 mb-6 shadow-2xl mx-auto max-w-sm border-8 border-gray-800"
          >
            <div className="bg-white rounded-2xl overflow-hidden min-h-96 flex flex-col">
              {/* Phone Status Bar */}
              <div className="bg-gray-900 text-white px-6 py-2 text-xs flex justify-between items-center">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div>📶</div>
                  <div>📡</div>
                  <div>🔋</div>
                </div>
              </div>

              {/* App Header */}
              <div className="bg-[#4a90e2] text-white px-6 py-4">
                <p className="text-xs text-blue-100">UPI Payment</p>
                <p className="font-bold">Send Money</p>
              </div>

              {/* Payment Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {paymentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onAnimationComplete={() => {
                      setTimeout(() => setPaymentStep(1), 2000);
                    }}
                  >
                    <p className="text-sm text-gray-600 mb-6">Confirm Payment</p>
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-600">To:</span>
                        <span className="font-bold text-gray-900">{upiSimulation.recipientName}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-600">UPI ID:</span>
                        <span className="text-sm text-gray-900">{upiSimulation.recipientUpi}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="text-2xl font-bold text-[#4a90e2]">₹{upiSimulation.amount}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Processing...</p>
                  </motion.div>
                )}

                {paymentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onAnimationComplete={() => {
                      setTimeout(() => setPaymentStep(2), 2000);
                    }}
                  >
                    <p className="text-sm text-gray-600 mb-6">Enter UPI PIN</p>
                    <div className="flex justify-center gap-2 mb-8">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1, backgroundColor: "#4a90e2" }}
                          transition={{ delay: i * 0.15 }}
                          className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-white"
                        >
                          •
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 text-center">Verifying PIN...</p>
                  </motion.div>
                )}

                {paymentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onAnimationComplete={() => {
                      setTimeout(() => setPaymentStep(3), 2000);
                    }}
                  >
                    <div className="flex flex-col items-center justify-center py-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 border-4 border-[#4a90e2] border-t-transparent rounded-full mb-4"
                      />
                      <p className="text-sm text-gray-600">Processing your payment...</p>
                    </div>
                  </motion.div>
                )}

                {paymentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col items-center justify-center py-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                      >
                        <Check className="w-8 h-8 text-green-600" />
                      </motion.div>
                      <p className="font-bold text-gray-900 text-center mb-2">Payment Successful!</p>
                      <p className="text-sm text-gray-600 text-center">₹{upiSimulation.amount} sent to {upiSimulation.recipientName}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Phone Bottom */}
              <div className="border-t px-6 py-4 bg-gray-50 text-center text-xs text-gray-600">
                {paymentStep < 3 ? "Processing..." : "✓ Complete"}
              </div>
            </div>
          </motion.div>

          {paymentStep === 3 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setCurrentStep(5)}
              className="w-full bg-[#4a90e2] text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              Next <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </>
      ) : (
        <>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-3 mb-6 pb-6 border-b-2 border-[#e8e3d8]">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">To:</span>
                <span className="font-semibold text-gray-900">{upiSimulation.recipientName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">UPI ID:</span>
                <span className="font-semibold text-gray-900 text-sm">{upiSimulation.recipientUpi}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-[#4a90e2] text-2xl">₹{upiSimulation.amount}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setPaymentProcessing(true);
                setPaymentStep(0);
              }}
              className="w-full bg-[#4a90e2] text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition-transform"
            >
              Proceed to Payment
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );

  // Step 6: Completion
  const renderCompletion = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-12 h-12 text-green-600" />
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful! ✓</h2>
      <p className="text-gray-600 mb-6">₹{upiSimulation.amount} transferred to {upiSimulation.recipientName}</p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8 text-left"
      >
        <h3 className="font-bold text-gray-900 mb-3">Key Takeaways:</h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li>✓ Always download apps from official stores (Google Play, App Store)</li>
          <li>✓ Never share UPI PIN, OTP, or full banking details</li>
          <li>✓ Verify recipient details before sending money</li>
          <li>✓ Keep your UPI PIN memorized and secure</li>
          <li>✓ Enable biometric authentication for extra security</li>
          <li>✓ Save transaction receipts for records</li>
          <li>✓ Monitor your account for unauthorized transactions</li>
        </ul>
      </motion.div>

      <button
        onClick={() => navigate("/practice")}
        className="w-full bg-[#4a90e2] text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition-transform"
      >
        Back to Practice
      </button>
    </motion.div>
  );

  const renderers = [
    renderDownloadApp,
    renderCreateAccount,
    renderLinkBank,
    renderSetPin,
    renderMakePayment,
    renderCompletion,
  ];

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* Header */}
      <div className="bg-[#4a90e2] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={() => navigate("/practice")}
          className="flex items-center gap-2 text-white font-semibold mb-4 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-white text-3xl font-bold">UPI Payment Simulation</h1>
        <p className="text-white/90 text-lg mt-2">Complete interactive UPI payment experience</p>
      </div>

      <div className="px-6 py-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <motion.button
                  key={s.id}
                  onClick={() => index <= currentStep && setCurrentStep(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    index === currentStep
                      ? "bg-[#4a90e2] text-white shadow-lg"
                      : index < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-white border-2 border-[#e8e3d8] text-gray-700"
                  }`}
                  title={s.title}
                >
                  {index < currentStep ? <Check className="w-5 h-5" /> : s.id}
                </motion.button>
              );
            })}
          </div>
          <p className="text-sm text-gray-600">
            {steps[currentStep].title} • Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-2 border-[#e8e3d8] rounded-2xl p-6 mb-6 shadow-sm min-h-96"
        >
          {renderers[currentStep]()}
        </motion.div>

        {/* Security Reminder */}
        {currentStep < 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900">Security Alert</h4>
                <p className="text-red-700 text-sm mt-1">Banks and apps will NEVER ask for your UPI PIN, OTP, or CVV via call, SMS, or email.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
