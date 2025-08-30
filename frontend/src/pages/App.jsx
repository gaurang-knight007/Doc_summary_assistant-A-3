import React, { useState } from 'react';
import UploadDropzone from '../components/uploadDropzone';
import SummaryOptions from '../components/SummaryOptions';
import SummaryView from '../components/SummaryView';
import Loader from '../components/Loader';
import { summarize } from '../api';
import './styles.css';
import img from '../assets/docsum.png';

import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function App() {
  const [file, setFile] = useState(null)
  const [length, setLength] = useState('medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  async function handleSummarize() {
    if (!file) { setError('Please select a file first.'); return }
    setError(''); setLoading(true); setData(null)
    try {
      const res = await summarize(file, length)
      setData(res)
    } catch (e) {
      setError(e.message || 'Failed to summarize')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo" >
          <img src={img} alt="Logo" style={{ height: 60, marginRight: 10 }} /> 
          <span style={{ fontSize: 24, fontWeight: "bold" }}>Ds.</span>
        </div>
      </nav>
      <div className="container">
        <div className="card" style={{ marginBottom: 16 }}>
          <h1 className="h1 center-text">Document Summary Assistant</h1>
          <p className="sub center-text">Upload a PDF or a scanned image. We’ll extract text and generate a smart summary with key points.</p>
          <div className="row">
            <div>
              <UploadDropzone onFile={setFile} />
              {file && <p className="helper">Selected: <strong>{file.name}</strong></p>}
            </div>
            <SummaryOptions length={length} setLength={setLength} disabled={loading} />
          </div>
          <div className='center-flex' style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
            <button className="btn" onClick={handleSummarize} disabled={loading}>Generate Summary</button>
            {loading && <Loader text="Extracting & summarizing…" />}
          </div>
          {error && <div className="error center-flex">{error}</div>}
        </div>

        <SummaryView data={data} />
        
        <div className="card contact-card center-text">
          <h2 className="h1" style={{ fontSize: 20 }}>Contact Developer</h2>
          <p className="sub">Have feedback, feature requests, or issues? Reach out:</p>
          <p><strong>Developer:</strong> Gaurang Gautam</p>
          <div className="social-links">
            <a href="mailto:gaurangbdb@gmail.com" target="_blank" rel="noreferrer">
              <MdEmail size={24} /> 
            </a>
            <a href="https://github.com/gaurang-knight007" target="_blank" rel="noreferrer">
              <FaGithub size={24} /> 
            </a>
            <a href="https://www.instagram.com/_pandit.gaurang/" target="_blank" rel="noreferrer">
              <FaInstagram size={24} /> 
            </a>
            <a href="https://www.linkedin.com/in/gaurangalpha" target="_blank" rel="noreferrer">
              <FaLinkedin size={24} /> 
            </a>
          </div>
        </div>

        <div className="footer">
          &copy; 2025 Gaurang Gautam <br/> 
          Built with Groq + React.js + Express.js • OCR by Tesseract.js • PDF parsing by pdf-parse
        </div>
      </div>
    </>
  )
}
