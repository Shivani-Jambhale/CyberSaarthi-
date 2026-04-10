// Text-to-Speech Service using Web Speech API

export interface TTSOptions {
  rate?: number;  // 0.1 to 10, default 1
  pitch?: number; // 0 to 2, default 1
  volume?: number; // 0 to 1, default 1
  language?: string; // e.g., 'en-US', 'hi-IN', 'mr-IN', 'ta-IN'
}

class TextToSpeechService {
  private utterance: SpeechSynthesisUtterance | null = null;
  private isPlaying = false;

  constructor() {
    // Check if browser supports Web Speech API
    const SpeechSynthesis = window.speechSynthesis;
    if (!SpeechSynthesis) {
      console.warn("Text-to-Speech not supported in this browser");
    }
  }

  // Check if TTS is available
  isSupported(): boolean {
    return "speechSynthesis" in window;
  }

  // Check if currently playing
  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  // Speak text
  speak(text: string, options: TTSOptions = {}): boolean {
    if (!this.isSupported()) {
      console.error("Text-to-Speech not supported");
      return false;
    }

    // Cancel any existing speech
    this.cancel();

    try {
      this.utterance = new SpeechSynthesisUtterance(text);

      // Set language based on browser language or passed option
      if (options.language) {
        this.utterance.lang = options.language;
      } else {
        // Detect browser language
        const browserLang = navigator.language || "en-US";
        this.utterance.lang = browserLang;
      }

      // Set other options
      this.utterance.rate = options.rate || 1;
      this.utterance.pitch = options.pitch || 1;
      this.utterance.volume = options.volume || 1;

      // Event handlers
      this.utterance.onstart = () => {
        this.isPlaying = true;
      };

      this.utterance.onend = () => {
        this.isPlaying = false;
      };

      this.utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        this.isPlaying = false;
      };

      // Start speaking
      window.speechSynthesis.speak(this.utterance);
      return true;
    } catch (error) {
      console.error("Error in text-to-speech:", error);
      return false;
    }
  }

  // Pause speech
  pause(): boolean {
    if (!this.isSupported()) return false;

    try {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error pausing speech:", error);
      return false;
    }
  }

  // Resume speech
  resume(): boolean {
    if (!this.isSupported()) return false;

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        this.isPlaying = true;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error resuming speech:", error);
      return false;
    }
  }

  // Stop/Cancel speech
  cancel(): boolean {
    if (!this.isSupported()) return false;

    try {
      window.speechSynthesis.cancel();
      this.isPlaying = false;
      return true;
    } catch (error) {
      console.error("Error canceling speech:", error);
      return false;
    }
  }

  // Get available voices
  getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.isSupported()) return [];
    return window.speechSynthesis.getVoices();
  }

  // Get voices for specific language
  getVoicesForLanguage(language: string): SpeechSynthesisVoice[] {
    if (!this.isSupported()) return [];
    return window.speechSynthesis
      .getVoices()
      .filter((voice) => voice.lang.startsWith(language));
  }
}

// Export singleton instance
export const ttsService = new TextToSpeechService();

// Language mappings for common use
export const LANGUAGE_CODES = {
  "English": "en-US",
  "हिन्दी": "hi-IN",
  "मराठी": "mr-IN",
  "தமிழ்": "ta-IN",
} as const;
