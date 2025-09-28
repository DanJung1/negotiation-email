// API Configuration
// Replace 'your_gemini_api_key_here' with your actual Gemini API key
// Get your API key from: https://makersuite.google.com/app/apikey

export const API_KEYS = {
  GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'your_gemini_api_key_here',
  // Add other API keys here as needed
};

// Instructions for setting up API keys:
// 1. Create a .env.local file in the root directory
// 2. Add: NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
// 3. Restart the development server
