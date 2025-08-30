import React, { useRef, useState } from 'react';

export default function UploadDropzone({ onFile }) {
  const inputRef = useRef(null)
  const [drag, setDrag] = useState(false)

  function onDrop(e) {
    e.preventDefault()
    setDrag(false)
    const f = e.dataTransfer.files?.[0]
    if (f) onFile(f)
  }

  return (
    <div
      className={`dropzone ${drag ? 'drag' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
    >
      <p><strong>Drag & drop</strong> a PDF or image, or</p>
      <button className="btn" onClick={() => inputRef.current?.click()}>Choose File</button>
      <input
        type="file"
        accept="application/pdf,image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />
      <p className="helper">Max size is usually 15MB (configurable on server).</p>
    </div>
  )
};
