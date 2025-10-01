const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables from .env in the same folder
dotenv.config();

// Check API key early
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY not defined. Did dotenv load correctly?');
}

console.log('Gemini API Key loaded:', apiKey ? 'Yes' : 'No');

const app = express();
app.use(cors());
app.use(express.json());

let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

// Notice: no `/api` prefix here
app.post('/priority', async (req, res) => {
  if (!genAI) {
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }

  const data = req.body;

  const prompt = `
You are an incident triage assistant. Based on the following report, assign a priority level: High, Medium, or Low.

1. Title: ${data.title}
2. Service/Application Affected: ${data.service}
3. Impacted System: ${data.impactedSystem}
4. Business Impact: ${data.businessImpact}
5. Affected Users: ${data.affectedUsers}
6. High-Priority Users Impacted: ${data.highPriorityUsers ? 'Yes' : 'No'}
7. VIP Details: ${data.highPriorityUserDetails}
8. Issue Start Time: ${data.issueStartTime}
9. Current Status: ${data.currentStatus}
10. Workaround Available: ${data.workaround}
11. Risk to Other Systems: ${data.riskToOtherSystems}
12. Data Impact: ${data.dataImpact}
13. Recurring Issue: ${data.recurringIssue}
14. Stakeholder Notification: ${data.stakeholderNotification}

Respond with only the priority level.
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);

    // More robust parsing
    const priority = result.response.text().trim();

    if (!priority) {
      console.error('No priority returned. Full result:', JSON.stringify(result, null, 2));
      throw new Error('Invalid Gemini response or empty text');
    }

    return res.json({ priority });
  } catch (err) {
    console.error('Gemini API Error:', err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'Failed to get priority recommendation' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
