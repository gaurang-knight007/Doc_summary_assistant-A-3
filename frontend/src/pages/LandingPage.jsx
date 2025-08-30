import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <Navbar />
      <div className="landing-card">
        <h1 className="h1">Document Summary Assistant</h1>
        <p className="sub">
          Instantly summarize PDFs and scanned images using the power of{" "}
          <strong>Groq API</strong> for AI-generated summaries and{" "}
          <strong>Tesseract.js</strong> for OCR text extraction.
        </p>
        <button className="btn big-btn" onClick={() => navigate("/app")}>
          Try Now!!!
        </button>
      </div>
      <div className="footer">
        &copy; 2025 Gaurang Gautam <br/> 
        Built with Groq + React.js + Express.js • OCR by Tesseract.js • PDF parsing by pdf-parse
      </div>
    </div>
  );
};
