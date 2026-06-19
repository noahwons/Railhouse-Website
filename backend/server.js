const express = require('express');
const cors = require('cors');
require('dotenv').config();

const menuRoutes = require('./routes/menu');
const eventsRoutes = require('./routes/events');
const contactRoutes = require('./routes/contact');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Railhouse API is running' });
});

module.exports = app;
