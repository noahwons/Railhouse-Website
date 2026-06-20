const express = require('express');
const router = express.Router();
const multer = require('multer');
const { put, list } = require('@vercel/blob');

const upload = multer({ storage: multer.memoryStorage() });

function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key'];
  const adminKeys = Object.entries(process.env)
    .filter(([k]) => k.startsWith('ADMIN_KEY_'))
    .map(([, v]) => v)
    .filter(Boolean);

  if (!key || !adminKeys.includes(key)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

router.get('/menu-url', async (req, res) => {
  try {
    const { blobs } = await list({ prefix: 'menu-current' });
    if (blobs.length === 0) return res.json({ url: null });
    res.json({ url: blobs[0].url, contentType: blobs[0].contentType });
  } catch (err) {
    console.error('List error:', err);
    res.status(500).json({ error: 'Failed to retrieve menu.' });
  }
});

router.post('/menu', requireAdmin, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided.' });

  const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Only PDF and image files are allowed.' });
  }

  try {
    const blob = await put('menu-current', req.file.buffer, {
      access: 'public',
      contentType: req.file.mimetype,
      addRandomSuffix: false,
    });
    res.json({ url: blob.url });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload menu.' });
  }
});

router.put('/events', requireAdmin, async (req, res) => {
  const events = req.body;
  if (!Array.isArray(events)) return res.status(400).json({ error: 'Events must be an array.' });

  try {
    const blob = await put('events.json', JSON.stringify(events), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
    res.json({ success: true, url: blob.url });
  } catch (err) {
    console.error('Events save error:', err);
    res.status(500).json({ error: 'Failed to save events.' });
  }
});

module.exports = router;
