# Quick Start: Reminder Feature

## For Users 👤

### Setting a Reminder
1. Go to home screen
2. Click the **"Set Reminder"** button (Bell icon)
3. Select a time using the time picker
4. Enter your reminder message
5. Click **"Set Reminder"**
6. Grant notification permission when prompted
7. That's it! You'll get notified at the selected time

### What You'll See
- **In-app notification** - Toast message appears in your app
- **Browser notification** - Push notification even if app is minimized

### Managing Reminders
- Reminders are automatically removed after they're triggered
- Click the trash icon to delete a reminder before it triggers

---

## For Developers 🛠️

### Installation
No additional dependencies needed! Uses existing packages:
- `sonner` - For toast notifications
- Native Notification API - For push notifications

### Usage in Code

#### Import the modal
```tsx
import ReminderModal from "@/app/components/ReminderModal";

function MyComponent() {
  const [reminderOpen, setReminderOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setReminderOpen(true)}>Set Reminder</button>
      <ReminderModal open={reminderOpen} onOpenChange={setReminderOpen} />
    </>
  );
}
```

#### Use the hook
```tsx
import { useReminderCheck } from "@/app/hooks/useReminderCheck";

function App() {
  // Automatically checks and notifies about reminders
  useReminderCheck();
  
  return <></>;
}
```

#### Direct service calls
```tsx
import { addReminder, getReminders, deleteReminder } from "@/app/services/reminderService";

// Add reminder
const reminder = addReminder("14:30", "Daily security tip");

// Get all reminders
const allReminders = getReminders();

// Delete reminder
deleteReminder(reminder.id);
```

#### Show reminder list
```tsx
import ReminderList from "@/app/components/ReminderList";

export default function MyPage() {
  return <ReminderList />;
}
```

---

## Troubleshooting

### Notifications not working?
1. Check browser notification permission
2. Make sure browser tab is active (or Service Worker is registered)
3. Check browser console for errors
4. Verify time is correct (24-hour format)

### Reminders not triggering?
1. Check browser console for `useReminderCheck` interval
2. Verify reminder time matches current time exactly
3. Check if reminder was marked as `notificationSent`
4. Reload the page if stuck

### Service Worker not registered?
1. App requires HTTPS in production
2. Check browser DevTools → Application → Service Workers
3. Clear browser cache if issues persist

---

## Environment-Specific Notes

### Development
- Regular `npm run dev` works fine
- Service Worker registration will work locally
- Test reminders by setting them 1-2 minutes ahead

### Production
- HTTPS required for Service Workers
- All notification features fully supported
- localStorage is per-domain (won't share across subdomains)

See `REMINDER_SYSTEM.md` for full technical documentation.
