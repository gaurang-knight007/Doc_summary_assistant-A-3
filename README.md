# 📄 Document Summary Assistant

**Live App**: _Add Vercel URL_

Document Summary Assistant is a full-stack MERN application that allows users to upload PDFs or scanned images and generates concise, AI-powered summaries with key points instantly.

This project was built as part of a Technical Assessment for Software Engineering Position at Unthinkable Solutions. It demonstrates the ability to design and implement a real-world, production-ready application using modern tools and frameworks.

**Backend**: Express API (PDF parsing + OCR + Groq summary)
**Frontend**: React + Vite (drag/drop upload, length options, loading states, errors)

---

## 🚀 Features

### 1. Document Upload
Upload PDFs or images (JPG, PNG, scanned docs).
Drag-and-drop or file picker interface.

### 2. Text Extraction
PDF Parsing: Extracts text from PDFs while maintaining structure.
OCR (Optical Character Recognition): Uses Tesseract.js for scanned images.

### 3. Smart Summarization
Generates short, medium, or long summaries.
Extracts key points and tags for quick reference.
Powered by-: 
#### Groq LLM API.

### 4. Export Options
Download the generated summary as:
#### 📑 DOCX
#### 📕 PDF

### 5. UI/UX
Clean, responsive React.js frontend.
Loading states, error handling, and a polished interface.

### 6. Hosting
Frontend deployed on Render Static Site.
Backend deployed on Render Web Service.

---

### 🛠️ Tech Stack
#### Frontend: React.js (Vite)
#### Backend: Express.js (Node.js)
#### AI Summarization: Groq LLM API
#### OCR: Tesseract.js
#### PDF Parsing: pdf-parse
#### File Handling: Multer
#### Deployment: Render & Vercel

---

### 🏗️ System Architecture
```bash
  A[User Uploads Document] --> B[Frontend React App]
  B -->|POST /api/summarize| C[Backend Express API]
  C -->|If PDF| D[pdf-parse]
  C -->|If Image| E[Tesseract OCR]
  D --> F[Extracted Text]
  E --> F[Extracted Text]
  F -->|Summarize| G[Groq API]
  G --> H[Summary + Key Points + Tags]
  H --> B
  B -->|Download| I[DOCX/PDF Export]
```

---

### 📂 Project Structure
```bash
mern-doc-summary-assistant/
├─ backend/                 # Express.js backend
│  ├─ server.js             # Main server
│  ├─ package.json
│  ├─ src/
│  │  ├─ utils/
│  │  │   └─ extractText.js # PDF & OCR utilities
│  │  └─ services/
│  │      └─ groq.js        # Groq API integration
│  ├─ uploads/              # Temp storage (gitignored)
│  └─ .env          # Sample env vars
│
└─ frontend/                # React.js frontend
   ├─ src/
   │  ├─ api.js             # API client
   │  ├─ components/        # UI components
   │  └─ pages/             # Landing + App pages
   ├─ vite.config.js
   └─ package.json
```

---

### ⚙️ Installation & Setup
#### 1. Clone Repo
```bash
git clone https://github.com/gaurang-knight007/Doc_summary_assistant-A-3.git
cd Doc_summary_assistant-A-3
```
#### 2. Backend Setup
```bash
cd backend
cp .env   # add your GROQ_API_KEY
npm install
npm start
```
Backend runs on: 
```bash
http://localhost:8080
```
#### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: 
```bash
http://localhost:5173
```

Note: Ensure backend is running before starting frontend.

---

### 📜 License
```bash
This project is licensed under the MIT License.
```
---
### 👨‍💻 Author
```bash
GAURANG GAUTAM
📧 gaurangbdb@gmail.com
```
