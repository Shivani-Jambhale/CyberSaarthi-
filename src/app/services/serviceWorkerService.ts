// Register and setup Service Worker for notifications

export const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Workers not supported");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/service-worker.js", {
      scope: "/",
    });

    console.log("Service Worker registered", registration);

    // Request permission for notifications
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }

    // Register periodic background sync (if supported)
    if ("periodicSync" in registration) {
      try {
        await registration.periodicSync.register("check-reminders", {
          minInterval: 60 * 1000, // Check every minute
        });
        console.log("Periodic sync registered");
      } catch (error) {
        console.log("Periodic sync not available:", error);
      }
    }

    // Listen for messages from Service Worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "REMINDER_TRIGGERED") {
        console.log("Reminder triggered:", event.data.reminder);
      }
    });

    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
};

// Unregister Service Worker (for cleanup)
export const unregisterServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      console.log("Service Worker unregistered");
    } catch (error) {
      console.error("Error unregistering Service Worker:", error);
    }
  }
};

// Send message to Service Worker
export const sendMessageToServiceWorker = (message: any) => {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
};
