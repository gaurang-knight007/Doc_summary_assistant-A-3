import React from 'react';
import axios from 'axios';

export default function SummaryView({ data })
{
  if (!data)
    return null;

  const { result } = data;
  const { summary = '', key_points = [], tags = [] } = result || {}

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  async function handleDownload(format)
  {
    try
    {
      const endpoint = `/api/download/${format}`;
      const res = await axios.post(
        `${API_URL}${endpoint}`,
        { summary, key_points, tags },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `summary.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } 
    catch (err)
    {
      console.error('Download failed', err);
    }
  }

  return (
    <div className="card" style={{ display: 'grid', gap: 16 }}>
      <h2 className="h1" style={{ fontSize: 22 }}>Summary</h2>
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{summary}</div>

      {key_points?.length > 0 && (
        <div>
          <h3 style={{ margin: '12px 0' }}>Key Points</h3>
          <div>
            {key_points.map((kp, i) => (
              <div key={i} className="kp">• {kp}</div>
            ))}
          </div>
        </div>
      )}

      {tags?.length > 0 && (
        <div>
          <h3 style={{ margin: '12px 0' }}>Tags</h3>
          <div className="tags">
            {tags.map((t, i) => <span className="tag" key={i}>#{t}</span>)}
          </div>
        </div>
      )}

      <div className='center-flex' style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button className="btn" onClick={() => handleDownload('docx')}>Download DOCX</button>
        <button className="btn" onClick={() => handleDownload('pdf')}>Download PDF</button>
      </div>
    </div>
  )
};
