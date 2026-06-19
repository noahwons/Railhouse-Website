const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const { name, email, phone, message, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  // In production, send an email here using nodemailer

  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }).sendMail({
    from: `"${name}" <${email}>`,
    to: process.env.CONTACT_EMAIL,
    subject: subject || 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
  }, (err) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
  });

  res.json({ success: true, message: 'Thank you for reaching out! We will get back to you soon.' });
});

module.exports = router;
