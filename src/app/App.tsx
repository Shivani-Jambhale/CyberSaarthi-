import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { registerServiceWorker } from "./services/serviceWorkerService";
import { Toaster } from "sonner";

export default function App() {
  useEffect(() => {
    // Register Service Worker for notifications
    registerServiceWorker();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
          <Toaster position="bottom-center" richColors />
      </AuthProvider>
    </LanguageProvider>
  );
}