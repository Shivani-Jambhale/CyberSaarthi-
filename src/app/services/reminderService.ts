export interface Reminder {
  id: string;
  time: string; // HH:mm format
  message: string;
  triggered: boolean;
  createdAt: number;
  notificationSent?: boolean;
}

const REMINDERS_KEY = "cybersaarthi_reminders";
const NOTIFICATION_PERMISSION_KEY = "cybersaarthi_notification_permission";

// Get all reminders
export const getReminders = (): Reminder[] => {
  try {
    const reminders = localStorage.getItem(REMINDERS_KEY);
    return reminders ? JSON.parse(reminders) : [];
  } catch {
    return [];
  }
};

// Add a new reminder
export const addReminder = (time: string, message: string): Reminder => {
  const reminders = getReminders();
  const newReminder: Reminder = {
    id: Date.now().toString(),
    time,
    message,
    triggered: false,
    createdAt: Date.now(),
  };
  reminders.push(newReminder);
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  return newReminder;
};

// Delete a reminder
export const deleteReminder = (id: string): void => {
  const reminders = getReminders();
  const filtered = reminders.filter((r) => r.id !== id);
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(filtered));
};

// Check if any reminders should trigger
export const checkReminders = (): Reminder[] => {
  const reminders = getReminders();
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const triggeredReminders = reminders.filter(
    (reminder) =>
      reminder.time === currentTime &&
      !reminder.triggered &&
      !reminder.notificationSent
  );

  // Mark as notified
  if (triggeredReminders.length > 0) {
    const updated = reminders.map((r) => {
      if (triggeredReminders.find((tr) => tr.id === r.id)) {
        return { ...r, notificationSent: true, triggered: true };
      }
      return r;
    });
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(updated));
  }

  return triggeredReminders;
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    localStorage.setItem(NOTIFICATION_PERMISSION_KEY, "granted");
    return true;
  }

  if (Notification.permission === "denied") {
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      localStorage.setItem(NOTIFICATION_PERMISSION_KEY, "granted");
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// Send notification
export const sendNotification = (title: string, options?: NotificationOptions): void => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      icon: "/cyber-saarthi-icon.png",
      ...options,
    });
  }
};

// Get notification permission status
export const getNotificationPermission = (): NotificationPermission => {
  return Notification.permission;
};
