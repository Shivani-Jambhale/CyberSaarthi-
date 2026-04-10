# Text-to-Speech (Read Aloud) Feature

## Overview
The CyberSaarthi app now has a "Read Aloud" feature that converts text to speech. Users can click the speaker icon (🔊) next to any learning content to have it read aloud by the browser.

## Features

✅ **Multiple Languages**
- English (en-US)
- हिन्दी (hi-IN)
- मराठी (mr-IN)
- தமிழ் (ta-IN)

✅ **Easy Controls**
- Click speaker icon to play
- Click pause icon to pause
- Click X icon to stop

✅ **Auto Language Detection**
- Automatically uses the user's selected language preference
- Falls back to browser language if needed

✅ **Browser Native**
- Uses Web Speech API (no external dependencies)
- Works offline
- No API calls required

## How to Use

### For Users
1. Navigate to Learning module
2. Click on any lesson to expand it
3. Look for the speaker icon (🔊) next to the question or answer
4. Click to play - the text will be read aloud
5. Use pause/stop buttons as needed

## Technical Implementation

### Files Created/Modified

**New Files:**
- `src/app/services/textToSpeechService.ts` - Core TTS logic
- `src/app/components/ReadAloudButton.tsx` - UI component with play/pause controls

**Modified Files:**
- `src/app/screens/Learning.tsx` - Added ReadAloudButton to questions and answers

### Service API

```typescript
import { ttsService } from "@/app/services/textToSpeechService";

// Speak text
ttsService.speak("Hello world", {
  language: "en-US",
  rate: 0.9,      // Speed (0.1 - 10)
  pitch: 1,       // Pitch (0 - 2)
  volume: 1       // Volume (0 - 1)
});

// Pause speaking
ttsService.pause();

// Resume speaking
ttsService.resume();

// Stop completely
ttsService.cancel();

// Check if TTS is supported
if (ttsService.isSupported()) {
  // Show TTS buttons
}

// Check if currently playing
if (ttsService.isCurrentlyPlaying()) {
  // Update UI
}

// Get available voices
const voices = ttsService.getAvailableVoices();
```

### Component Usage

```tsx
import ReadAloudButton from "@/app/components/ReadAloudButton";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function MyComponent() {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center gap-2">
      <p>This text can be read aloud</p>
      <ReadAloudButton 
        text="This text can be read aloud"
        language={language}
        size="md"
      />
    </div>
  );
}
```

### Props

**ReadAloudButton Props:**
```typescript
interface ReadAloudButtonProps {
  text: string;              // Text to read aloud
  language?: Language;       // 'English' | 'हिन्दी' | 'मराठी' | 'தமிழ்'
  size?: "sm" | "md" | "lg"; // Button size (default: "md")
  className?: string;        // Additional CSS classes
}
```

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | All features work |
| Firefox | ✅ Full | All features work |
| Safari  | ✅ Full | All features work |
| Edge    | ✅ Full | All features work |
| IE11    | ❌ None | Web Speech API not supported |

## Limitations

1. **Offline support** - Works in most browsers offline
2. **System voices** - Uses device's system voices
3. **Language accuracy** - Depends on installed voices on the device
4. **No voice selection** - Uses default voice (can be enhanced)
5. **One at a time** - Only one text can be read at a time

## Adding to Other Screens

To add "Read Aloud" to other screens (Quiz, Practice, etc.):

```tsx
import ReadAloudButton from "../components/ReadAloudButton";
import { useLanguage } from "../contexts/LanguageContext";

export default function YourComponent() {
  const { language } = useLanguage();
  
  return (
    <div>
      <h1>Your Question Text</h1>
      <ReadAloudButton text="Your Question Text" language={language} />
    </div>
  );
}
```

## Customization

### Change Speech Speed
```typescript
ttsService.speak(text, { rate: 0.7 }); // Slower
ttsService.speak(text, { rate: 1.5 }); // Faster
```

### Change Voice Pitch
```typescript
ttsService.speak(text, { pitch: 0.5 }); // Lower pitch
ttsService.speak(text, { pitch: 1.5 }); // Higher pitch
```

### Change Button Appearance
```tsx
<ReadAloudButton 
  text={text}
  language={language}
  size="lg"
  className="mb-4 ml-2"
/>
```

## Troubleshooting

### Speaker icon not showing?
- Browser doesn't support Web Speech API
- Try a different browser (Chrome, Firefox, Edge)

### Text not reading?
- Check browser notification permissions
- Enable audio output
- Verify text is not empty

### Language accent wrong?
- Device doesn't have the desired language voice
- Install language pack on device
- Switch to a voice that supports the language

### Sound cutting off?
- Text might be too long
- Browser limits speech duration
- Break into shorter chunks

## Future Enhancements

1. **Voice selection** - Let users choose between multiple voices
2. **Speed control** - Adjustable playback speed slider
3. **Download audio** - Save as MP3 (requires backend)
4. **Multiple voices** - Different voices for different content
5. **Highlighting** - Highlight words as they're spoken

## Browser Compatibility Check

The component automatically detects if TTS is supported and hides the button if not supported. No errors will be thrown in unsupported browsers.
