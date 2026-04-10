# Reminder System Documentation

## Overview
The CyberSaarthi reminder system allows users to set one-time reminders and receive notifications when the reminder time arrives. Reminders are currently stored in **localStorage** and can be easily migrated to a backend API.

## Features Implemented

### 1. **Set Reminder Modal**
- Time picker for selecting reminder time
- Custom message textarea
- Browser notification permission request
- Toast notifications for success/error feedback

**File:** `src/app/components/ReminderModal.tsx`

### 2. **Reminder Service** 
Manages all reminder operations:
- `getReminders()` - Retrieve all reminders
- `addReminder(time, message)` - Create new reminder
- `deleteReminder(id)` - Remove a reminder
- `checkReminders()` - Check if any reminders are due
- `requestNotificationPermission()` - Request browser permission
- `sendNotification(title, options)` - Send push notification

**File:** `src/app/services/reminderService.ts`

### 3. **Reminder Checker Hook**
Automatically checks every minute if reminders are due and triggers notifications.

**File:** `src/app/hooks/useReminderCheck.ts`

Features:
- In-app toast notifications (using Sonner)
- Push notifications (browser native)
- Runs every 60 seconds
- Prevents duplicate notifications

### 4. **Service Worker**
Handles background notifications and periodic sync. Allows notifications even when the app is closed.

**File:** `public/service-worker.js`

### 5. **Reminder List Component**
Display and delete active reminders.

**File:** `src/app/components/ReminderList.tsx`

## Data Structure

```typescript
interface Reminder {
  id: string;              // Unique ID (timestamp)
  time: string;            // HH:mm format (24-hour)
  message: string;         // Reminder text
  triggered: boolean;      // Whether notification was sent
  createdAt: number;       // Timestamp when created
  notificationSent?: boolean;
}
```

**Storage Key:** `cybersaarthi_reminders` (localStorage)

## How It Works

1. **User clicks "Set Reminder"** → ReminderModal opens
2. **User selects time & message** → Click "Set Reminder"
3. **System requests notification permission** → Modal closes
4. **Reminder stored in localStorage**
5. **Hook checks every 60 seconds** → When time matches, notification triggers
6. **User sees in-app toast + push notification**

## Switching to Backend API

The system is designed to easily switch from localStorage to a backend API. Here's how:

### Step 1: Update `reminderService.ts`

Replace localStorage calls with API calls:

```typescript
// Current (localStorage):
export const addReminder = (time: string, message: string): Reminder => {
  const reminders = getReminders();
  const newReminder: Reminder = { id: Date.now().toString(), time, message, triggered: false, createdAt: Date.now() };
  reminders.push(newReminder);
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  return newReminder;
};

// New (backend):
export const addReminder = async (time: string, message: string): Promise<Reminder> => {
  const response = await fetch('/api/reminders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ time, message })
  });
  return response.json();
};
```

### Step 2: Update `ReminderModal.tsx`

Make the call async:

```typescript
const handleSetReminder = async () => {
  try {
    // Already has placeholder comment:
    // await fetch('/api/reminders', { ... });
    
    const reminder = await addReminder(time, message);
    toast.success(`Reminder set for ${time}`);
  } catch (error) {
    toast.error("Failed to set reminder");
  }
};
```

### Step 3: Update `useReminderCheck.ts`

Fetch reminders from backend instead of localStorage:

```typescript
const checkAndNotify = async () => {
  // Instead of: const triggeredReminders = checkReminders();
  
  // New approach:
  const response = await fetch('/api/reminders/check', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const triggeredReminders = await response.json();
  
  triggeredReminders.forEach((reminder) => {
    toast.success(`⏰ ${reminder.message}`);
    sendNotification("CyberSaarthi Reminder", { body: reminder.message });
  });
};
```

## API Endpoints (To Implement)

```
POST /api/reminders
  Body: { time: string, message: string }
  Response: Reminder

GET /api/reminders
  Response: Reminder[]

POST /api/reminders/check
  Response: Reminder[] (due reminders)

DELETE /api/reminders/{id}
  Response: { success: boolean }
```

## Browser Compatibility

- ✅ Desktop Chrome, Edge, Firefox
- ✅ Mobile Chrome, Firefox
- ⚠️ Safari - Limited notification support
- ✅ Service Workers - All modern browsers

## Testing the Feature

1. Click "Set Reminder" button on home screen
2. Set a time 2-3 minutes in the future
3. Enter a test message
4. Click "Set Reminder"
5. Grant notification permission when prompted
6. Wait for the time to arrive
7. You should see:
   - In-app toast notification
   - Browser push notification

## Known Limitations

1. **localStorage only** - Limited to current device
2. **Browser dependent** - Notifications require browser active/permission
3. **No persistence on logout** - Reminders cleared with localStorage
4. **Timezone** - Uses browser's local time (no timezone support yet)

## Files Created

```
src/
├── app/
│   ├── components/
│   │   ├── ReminderModal.tsx       (New)
│   │   └── ReminderList.tsx        (New)
│   ├── hooks/
│   │   └── useReminderCheck.ts     (New)
│   └── services/
│       ├── reminderService.ts      (New)
│       └── serviceWorkerService.ts (New)
│   └── App.tsx                     (Modified)
│   └── screens/
│       └── Home.tsx                (Modified)
public/
└── service-worker.js               (New)
```

## Next Steps

1. **Test locally** - Verify reminders work
2. **Add delete confirmation** - Confirm before deleting
3. **Implement backend API** - Follow the steps above
4. **Add reminder history** - Show past reminders
5. **Add timezone support** - Let users set timezone
6. **Add snooze function** - Snooze reminder for 5-10 minutes
