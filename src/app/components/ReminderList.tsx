import { useState, useEffect } from "react";
import { Trash2, Clock } from "lucide-react";
import { Reminder, getReminders, deleteReminder } from "../services/reminderService";
import { toast } from "sonner";

export default function ReminderList() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = () => {
    const allReminders = getReminders().filter((r) => !r.triggered);
    setReminders(allReminders);
  };

  const handleDeleteReminder = (id: string) => {
    deleteReminder(id);
    setReminders(reminders.filter((r) => r.id !== id));
    toast.success("Reminder removed");
  };

  if (reminders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No reminders set</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="bg-white border-l-4 border-[#4a90e2] rounded-lg p-4 flex items-start justify-between shadow-sm"
        >
          <div className="flex-1">
            <p className="font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#4a90e2]" />
              {reminder.time}
            </p>
            <p className="text-gray-600 text-sm mt-1">{reminder.message}</p>
          </div>
          <button
            onClick={() => handleDeleteReminder(reminder.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
            title="Delete reminder"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
