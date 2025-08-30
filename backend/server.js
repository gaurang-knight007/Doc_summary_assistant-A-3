require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Document, Packer, Paragraph } = require('docx');
const PDFDocument = require('pdfkit');
const os = require('os');

const { extractFromPdf, extractFromImage, guessKind } = require('./src/utils/extractText');
const { summarizeText } = require('./src/services/groq');

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '20mb' }));

app.get('/', (req, res) => {
  console.log("root route called");
  res.json({name:"Pdf-summary-assistant", dev:"Gaurang-Gautam", email: "gaurangbdb@gmail.com", time: new Date().toISOString() });
});

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const maxFileSizeMb = Number(process.env.MAX_FILE_SIZE_MB || 25);
const upload = multer({
  dest: uploadDir,
  limits: { fileSize: maxFileSizeMb * 1024 * 1024 }
});

app.post('/api/summarize', upload.single('file'), async (req, res) => {
  console.log('Summarize endpoint called');
  const file = req.file;
  const length = (req.body?.length || 'medium').toLowerCase();

  if (!file) {
    console.error('❌ No file uploaded.');
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const filePath = file.path;
  let text = '';
  let kind;
  try {
    kind = guessKind(file.mimetype || '', file.originalname || '');
    console.log(`Uploaded file detected as: ${kind}`)
    if (kind === 'pdf') {
      text = await extractFromPdf(filePath);
    } else if (kind === 'image') {
      text = await extractFromImage(filePath);
    } else {
      console.error('Unsupported file type.');
      return res.status(415).json({ error: 'Unsupported file type. Please upload a PDF or an image.' });
    }

    if (!text || text.trim().length < 20) {
      console.error('Could not extract readable text.');
      return res.status(422).json({ error: 'Could not extract readable text. Try a clearer scan or different file.' });
    }

    const result = await summarizeText(text, length);
    console.log('Summarization success.');
    return res.json({
      ok: true,
      kind,
      length,
      result
    });
  } catch (err) {
    console.error('Summarize error:', err);
    return res.status(500).json({ error: 'Failed to process the document.' });
  } finally {
    // cleanup temp file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, () => {console.log('Temp file cleaned up.')});
    }
  }
});

app.post('/api/download/docx', async (req, res) => {
  console.log('DOCX download endpoint called');
  try {
    const { summary, key_points = [], tags = [] } = req.body;

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ text: 'SUMMARY', heading: 'Heading1' }),
            new Paragraph(summary),

            new Paragraph({ text: '\nKEY POINTS', heading: 'Heading1' }),
            ...key_points.map(pt => new Paragraph(`• ${pt}`)),

            new Paragraph({ text: '\nTAGS', heading: 'Heading1' }),
            new Paragraph(tags.join(', '))
          ]
        }
      ]
    });

    const buffer = await Packer.toBuffer(doc);
    const filePath = path.join(__dirname, 'summary.docx');
    fs.writeFileSync(filePath, buffer);
    console.log('DOCX generated.');
    res.download(filePath, 'summary.docx', () => {
      fs.unlinkSync(filePath);
      console.log('DOCX sent and cleaned up.');
    });
  } catch (err) {
    console.error('DOCX download error:', err);
    res.status(500).json({ error: 'Failed to generate DOCX' });
  }
});

app.post('/api/download/pdf', async (req, res) => {
  console.log('PDF download endpoint called');
  try {
    const { summary, key_points = [], tags = [] } = req.body;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=summary.pdf');

    const doc = new PDFDocument();
    doc.pipe(res); // pipe directly to HTTP response

    doc.fontSize(18).text('SUMMARY', { underline: true }).moveDown();
    doc.fontSize(12).text(summary).moveDown();

    if (key_points.length > 0) {
      doc.fontSize(18).text('KEY POINTS', { underline: true }).moveDown();
      key_points.forEach(pt => {
        doc.fontSize(12).text(`• ${pt}`);
      });
      doc.moveDown();
    }

    if (tags.length > 0) {
      doc.fontSize(18).text('TAGS', { underline: true }).moveDown();
      doc.fontSize(12).text(tags.join(', '));
    }

    doc.end();
    console.log('PDF generated and sent.');
  } catch (err) {
    console.error('PDF download error:', err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});


const PORT = process.env.PORT || 8080;
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

app.listen(PORT, () => {
  const localIP = getLocalIP();
  console.log(`API running at:`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://${localIP}:${PORT}`);
});