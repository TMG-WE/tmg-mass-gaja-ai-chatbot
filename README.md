# 🤖 TMG MASS GAJA AI Chatbot

A full-stack AI chatbot (Web + Mobile) using OpenAI GPT-5 model.

## Structure
```
tmg-mass-gaja-ai-chatbot/
├── backend/   -> Node.js + Express + OpenAI (Vercel-ready)
├── web/       -> React web app (Speech-to-text + TTS)
└── mobile/    -> React Native (Expo) app (TTS)
```

## Quick start (local)

### Backend
```bash
cd backend
npm install
# create .env with:
# TMG_MASS_GAJA=your_api_key_here
npm start
```

### Web
```bash
cd web
npm install
npm start
# open http://localhost:3000
# Update the backend url in web/src/App.js to your deployed backend URL
```

### Mobile
```bash
cd mobile
npm install
expo install expo-speech
expo start
# Test with Expo Go
# Update backend URL in mobile/App.js to your deployed backend URL
```

## Deploy backend to Vercel
1. Push the repository to GitHub.
2. On Vercel dashboard, import project -> connect the GitHub repo.
3. In Project Settings -> Environment Variables, add:
   - Key: TMG_MASS_GAJA
   - Value: Sk-proj—XuuUQbaPlSE1RoDDvqYJ071-EMrVaHJU5DNyEPOPcGPpUphlilFd5lX08KBQh7koabxHaPYG1T3BlbkFJsB6np1jVTgroIwcnBDP7AmNCXnBcUPaEUkA6-_PTp1yp-82bYB0MHmwY1KzhXv18S_ClVYv2oA
4. Deploy. Copy the deployment URL and paste it into web and mobile source files.

## Security
- **Never** commit your real `.env` to GitHub. Use `.env.example` as a template.
- Use Vercel/Render environment variables for production secrets.

## License
MIT
