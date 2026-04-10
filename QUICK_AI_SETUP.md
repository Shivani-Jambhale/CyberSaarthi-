# AI Assistant - Quick Setup

## What Changed?

The AI Assistant now uses **Claude AI** (real intelligence) instead of static responses!

## What You Need To Do (2 Steps)

### Step 1️⃣: Get API Key
Go to https://console.anthropic.com → Create API Key → Copy it

### Step 2️⃣: Create `.env.local` file

In your project root, create a file named `.env.local`:

```
VITE_CLAUDE_API_KEY=sk-ant-your-key-here
```

Paste your API key (replace `sk-ant-your-key-here`)

**Save the file!**

### Step 3️⃣: Restart Dev Server

```bash
npm run dev
```

Done! ✅

## Now Your AI Assistant Will:

✅ Answer ANY cybersecurity question intelligently
✅ Remember previous messages in conversation
✅ Show "Thinking..." while processing
✅ Provide detailed, actionable advice
✅ Handle errors gracefully

## What Can Users Ask?

- "What is a strong password?"
- "How do I protect my UPI?"
- "What is two-factor authentication?"
- "How do I spot phishing emails?"
- "What should I do if I got scammed?"
- And ANY cybersecurity question!

## Example Conversation

```
User: "How do I create a strong password?"

AI: "A strong password typically includes:
1. At least 12-16 characters
2. Mix of uppercase and lowercase letters
3. Numbers and special symbols
4. No personal information
5. Unique for each account

For example, something like: P@ssw0rd#Secure2024
but make it personal to you..."
```

## If It Says "API key not configured"

1. Check `.env.local` file exists
2. Check API key is correct
3. Restart `npm run dev`

## Pricing

Free tier available - no credit card needed to test!

See full setup at: `AI_ASSISTANT_SETUP.md`
