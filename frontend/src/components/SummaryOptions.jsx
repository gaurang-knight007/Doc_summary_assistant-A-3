import React from 'react';

export default function SummaryOptions({ length, setLength, disabled }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <label htmlFor="len">Summary length</label>
        <select id="len" className="select" value={length} onChange={(e) => setLength(e.target.value)} disabled={disabled}>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>
      <p className="helper">Short: ~100 words • Medium: ~200 • Long: ~350</p>
    </div>
  );
};
