const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post('/api/priority', async (req, res) => {
  const data = req.body;

  const prompt = `
You are an incident triage assistant. Based on the following incident report, assign a priority level: High, Medium, or Low.

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
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    });

    const priority = response.data.choices[0].message.content.trim();
    res.json({ priority });
  } catch (err) {
    console.error('OpenAI Error:', err);
    res.status(500).json({ error: 'Failed to get priority recommendation' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
