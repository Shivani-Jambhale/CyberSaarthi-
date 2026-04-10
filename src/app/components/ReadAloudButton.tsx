import { useState, useEffect } from "react";
import { Volume2, Pause, Play, X } from "lucide-react";
import { ttsService, LANGUAGE_CODES } from "../services/textToSpeechService";
import { Language } from "../contexts/LanguageContext";

interface ReadAloudButtonProps {
  text: string;
  language?: Language;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ReadAloudButton({
  text,
  language = "English",
  size = "md",
  className = "",
}: ReadAloudButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if TTS is supported
    setIsSupported(ttsService.isSupported());
  }, []);

  const handlePlay = () => {
    if (isPlaying && !isPaused) {
      // Pause
      ttsService.pause();
      setIsPaused(true);
    } else if (isPaused) {
      // Resume
      ttsService.resume();
      setIsPaused(false);
    } else {
      // Start playing
      const langCode = LANGUAGE_CODES[language as keyof typeof LANGUAGE_CODES] || "en-US";
      const success = ttsService.speak(text, {
        language: langCode,
        rate: 0.9,
        pitch: 1,
        volume: 1,
      });

      if (success) {
        setIsPlaying(true);
        setIsPaused(false);

        // Check when speech ends
        const checkInterval = setInterval(() => {
          if (!ttsService.isCurrentlyPlaying()) {
            setIsPlaying(false);
            setIsPaused(false);
            clearInterval(checkInterval);
          }
        }, 100);
      }
    }
  };

  const handleStop = () => {
    ttsService.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null; // Don't show button if TTS not supported
  }

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Play/Pause Button */}
      <button
        onClick={handlePlay}
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all active:scale-95 ${
          isPlaying
            ? "bg-[#4a90e2] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        title={isPlaying && !isPaused ? "Pause" : "Read aloud"}
        aria-label={isPlaying && !isPaused ? "Pause audio" : "Play audio"}
      >
        {isPlaying && !isPaused ? (
          <Pause className={iconSizeClasses[size]} />
        ) : (
          <>
            {isPlaying && isPaused ? (
              <Play className={iconSizeClasses[size]} />
            ) : (
              <Volume2 className={iconSizeClasses[size]} />
            )}
          </>
        )}
      </button>

      {/* Stop Button (only show when playing) */}
      {isPlaying && (
        <button
          onClick={handleStop}
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-200 transition-all active:scale-95`}
          title="Stop"
          aria-label="Stop audio"
        >
          <X className={iconSizeClasses[size]} />
        </button>
      )}
    </div>
  );
}
