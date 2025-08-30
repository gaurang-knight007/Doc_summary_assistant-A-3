# Document Summary Assistant (MERN + Groq)

**Live App**: _Add Vercel URL_

**Backend**: Express API (PDF parsing + OCR + Groq summary)

**Frontend**: React + Vite (drag/drop upload, length options, loading states, errors)

## Features
- Upload PDF or image (drag & drop / file picker)
- Text extraction: `pdf-parse` for PDFs, `tesseract.js` OCR for images
- Summaries via Groq (e.g., `llama-3.1-70b-versatile`) with short/medium/long options
- Key points + tags, responsive UI

## Local Dev
```bash
# Backend
cd backend
cp .env.example .env  # fill GROQ_API_KEY, CORS_ORIGIN
npm i
npm run dev

# Frontend
cd ../frontend
npm i
# set VITE_API_BASE_URL in a .env if backend is not localhost:8080
npm run dev
