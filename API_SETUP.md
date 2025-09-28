# API Key Setup Instructions

## Gemini API Key Configuration

To use the AI features, you need to set up your Gemini API key:

### Step 1: Get Your API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Configure the API Key

**Option A: Environment Variable (Recommended)**
1. Create a file named `.env.local` in the root directory
2. Add the following line:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with your actual API key

**Option B: Direct Configuration**
1. Open `config/api-keys.js`
2. Replace `your_gemini_api_key_here` with your actual API key

### Step 3: Restart the Application
After setting up the API key, restart the development server:
```bash
npm run dev
```

## Testing the AI Features

1. Go to the email browser
2. Click on "Negotiation Engine" in the sidebar
3. Select an email with negotiation content
4. Configure your negotiation settings
5. Click "Generate Response"
6. The AI should now generate a real response using your API key

## Troubleshooting

- If you see "demo" responses, the API key is not properly configured
- Check the browser console for any API errors
- Ensure your API key has the necessary permissions
- Make sure the `.env.local` file is in the root directory (same level as package.json)
