// Service Worker for handling push notifications and background tasks

const REMINDERS_KEY = "cybersaarthi_reminders";

// Handle push notifications
self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body || "You have a reminder",
    icon: "/cyber-saarthi-icon.png",
    badge: "/cyber-saarthi-badge.png",
    tag: data.tag || "reminder",
    requireInteraction: true,
    data: {
      reminderId: data.reminderId,
    },
  };

  event.waitUntil(self.registration.showNotification(data.title || "Reminder", options));
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if available
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      // Open new window if none exist
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});

// Periodic background check for reminders
// Note: This requires registerPeriodicSync() from mainService.ts
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "check-reminders") {
    event.waitUntil(checkAndNotifyReminders());
  }
});

// Check and notify about reminders
async function checkAndNotifyReminders() {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  // Get reminders from storage (if available)
  // In production, fetch from backend API
  // await fetch('/api/reminders/check', { method: 'POST' })

  // Note: ServiceWorkers cannot directly access localStorage
  // In production, use IndexedDB or backend API for persistence
}

export {};
