const fs = require('fs');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

async function extractFromPdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const result = await pdfParse(dataBuffer);
  // basic cleanup: collapse multiple spaces
  return (result.text || '').replace(/[\t ]+/g, ' ').replace(/\n{2,}/g, '\n');
}

async function extractFromImage(filePath, lang = 'eng') {
  const { data } = await Tesseract.recognize(filePath, lang, {
    logger: () => {}, // silence logs; attach if you want progress
  });
  return (data.text || '').trim();
}

function guessKind(mimetype, originalName = '') {
  const name = originalName.toLowerCase();
  if (mimetype === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
  if (mimetype.startsWith('image/') || /\.(png|jpg|jpeg|bmp|tif|tiff)$/i.test(name)) return 'image';
  return 'unknown';
}

module.exports = { extractFromPdf, extractFromImage, guessKind };
