const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


const lengthPresets = {
  short: { targetWords: '80-120', bullets: 5 },
  medium: { targetWords: '150-250', bullets: 7 },
  long: { targetWords: '300-400', bullets: 10 }
};

function buildPrompt(rawText, length = 'medium') {
  const cfg = lengthPresets[length] || lengthPresets.medium;
  return `You are a precise document summarizer.
Return STRICT JSON (no markdown, no code fences) with fields:
{
  "summary": string,               // ${cfg.targetWords} words, readable paragraphs
  "key_points": string[],          // ${cfg.bullets} bullet points, each <= 20 words
  "tags": string[]                 // 5 topical tags
}
Focus on main ideas, entities, numbers, dates, and definitions. Avoid speculation.
Input document text (may be noisy OCR):

${rawText.slice(0, 12000)}

END.`;
}

async function summarizeText(rawText, length = 'medium') {
  const prompt = buildPrompt(rawText, length);

  const resp = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: 'You return STRICT JSON only.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 1200
  });

  const content = resp.choices?.[0]?.message?.content?.trim() || '{}';

  // Attempt to parse JSON, stripping accidental fences
  const cleaned = content
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '');

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    parsed = { summary: content, key_points: [], tags: [] };
  }
  return parsed;
}

module.exports = { summarizeText };
