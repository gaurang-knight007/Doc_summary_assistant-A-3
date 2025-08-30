import React from 'react';

export default function Loader({ text = 'Processing…' })
{
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 18, height: 18, border: '3px solid #23314f', borderTopColor: '#5da0ff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <span>{text}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
