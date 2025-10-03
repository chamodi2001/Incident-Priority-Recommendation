
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint for priority recommendation
app.post('/api/priority', (req, res) => {
  const { impact, urgency } = req.body;

  let priority = '';
  if (impact === 'high' && urgency === 'high') {
    priority = 'P1';
  } else if (impact === 'high' && urgency === 'low') {
    priority = 'P2';
  } else if (impact === 'low' && urgency === 'high') {
    priority = 'P3';
  } else if (impact === 'low' && urgency === 'low') {
    priority = 'P4';
  } else {
    return res.status(400).json({ error: 'Invalid impact or urgency value' });
  }

  return res.json({ priority });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
