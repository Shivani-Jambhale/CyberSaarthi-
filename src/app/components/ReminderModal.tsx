import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";
import { addReminder, requestNotificationPermission } from "../services/reminderService";
import { toast } from "sonner";

interface ReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReminderModal({ open, onOpenChange }: ReminderModalProps) {
  const { language } = useLanguage();
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTime("");
      setMessage("");
    }
    onOpenChange(newOpen);
  };

  const handleSetReminder = async () => {
    if (!time) {
      toast.error("Please select a time");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a reminder message");
      return;
    }

    setLoading(true);

    try {
      // Request notification permission
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) {
        toast.warning("Notifications disabled. Enable in browser settings.");
      }

      // Add reminder to storage
      const reminder = addReminder(time, message);

      toast.success(`Reminder set for ${time}`);
      handleOpenChange(false);

      // API Call placeholder - ready for backend integration
      // await fetch('/api/reminders', {
      //   method: 'POST',
      //   body: JSON.stringify({ time, message }),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    } catch (error) {
      toast.error("Failed to set reminder");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white rounded-2xl border-0 shadow-lg">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {getTranslation(language, "home.reminder")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Time Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#e8e3d8] rounded-lg focus:outline-none focus:border-[#4a90e2] bg-white"
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reminder Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your reminder message"
              className="w-full px-4 py-3 border-2 border-[#e8e3d8] rounded-lg focus:outline-none focus:border-[#4a90e2] bg-white resize-none h-24"
            />
          </div>

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              📌 You'll receive a notification at the selected time. Make sure to enable notifications in your browser.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t pt-4">
          <button
            onClick={() => handleOpenChange(false)}
            className="flex-1 px-4 py-3 border-2 border-[#e8e3d8] rounded-lg font-semibold text-gray-900 hover:bg-gray-50 active:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSetReminder}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-[#4a90e2] text-white rounded-lg font-semibold hover:bg-[#357abd] disabled:opacity-50 active:scale-95 transition-all"
          >
            {loading ? "Setting..." : "Set Reminder"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
