import { useEffect } from "react";
import { toast } from "sonner";
import { checkReminders, sendNotification } from "../services/reminderService";

export const useReminderCheck = () => {
  useEffect(() => {
    // Check reminders immediately on mount
    const checkAndNotify = () => {
      const triggeredReminders = checkReminders();

      triggeredReminders.forEach((reminder) => {
        // Show in-app notification
        toast.success(`⏰ ${reminder.message}`, {
          duration: 10000,
          position: "top-center",
        });

        // Show push notification
        sendNotification("CyberSaarthi Reminder", {
          body: reminder.message,
          tag: reminder.id,
          requireInteraction: true,
        });
      });
    };

    // Check immediately
    checkAndNotify();

    // Check every minute
    const interval = setInterval(checkAndNotify, 60000);

    return () => clearInterval(interval);
  }, []);
};
