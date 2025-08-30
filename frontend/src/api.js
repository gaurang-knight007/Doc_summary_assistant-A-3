const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://doc-assistant-bx0s.onrender.com';

export async function summarize(file, length = 'medium')
{
  const form = new FormData();
  form.append('file', file);
  form.append('length', length);

  const res = await fetch(`${API_BASE}/api/summarize`, {
    method: 'POST',
    body: form
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}
