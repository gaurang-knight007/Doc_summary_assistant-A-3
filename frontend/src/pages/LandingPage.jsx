import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import img from "../assets/docsum.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo" >
          <img src={img} alt="Logo" style={{ height: 60, marginRight: 10 }} /> 
          <span style={{ fontSize: 24, fontWeight: "bold" }}>Ds.</span>
        </div>
      </nav>
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
