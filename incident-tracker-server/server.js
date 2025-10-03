const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Deterministic priority mapping endpoint.
// Expects JSON body: { impact: 'high'|'low', urgency: 'high'|'low' }
app.post('/api/priority', (req, res) => {
  const { impact, urgency } = req.body || {};

  if (!impact || !urgency) {
    return res.status(400).json({ error: 'impact and urgency are required' });
  }

  let priority = '';
  if (impact === 'high' && urgency === 'high') priority = 'P1';
  else if (impact === 'high' && urgency === 'low') priority = 'P2';
  else if (impact === 'low' && urgency === 'high') priority = 'P3';
  else if (impact === 'low' && urgency === 'low') priority = 'P4';
  else priority = 'P4';

  res.json({ priority });
});

// Simple endpoint to return incidents. In production replace with DB query.
app.get('/api/incidents', (req, res) => {
  // Return an empty list by default; you can later wire this to MySQL.
  const sampleIncidents = [
    // Example object structure used by the client. Keep commented or empty in prod.
    // { id: 1, title: 'Sample incident', severity: 'High', service: 'Auth', created_at: new Date().toISOString() }
  ];
  res.json(sampleIncidents);
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
