import React, { useState } from 'react';

function IncidentForm() {
  const [formData, setFormData] = useState({
    title: '',
    service: '',
    impactedSystem: '',
    businessImpact: '',
    affectedUsers: '',
    highPriorityUsers: false,
    highPriorityUserDetails: '',
    issueStartTime: '',
    currentStatus: '',
    workaround: '',
    riskToOtherSystems: '',
    dataImpact: '',
    recurringIssue: '',
    stakeholderNotification: ''
  });

  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPriority('');
    setError('');

    try {
      const res = await fetch('https://inctrack.space/api/priority', {
      // const res = await fetch(`${process.env.REACT_APP_API_URL}/api/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setPriority(data.priority);
        // Combine form data into a question string
        const question = Object.entries(formData)
          .filter(([key, value]) => value && value !== false)
          .map(([key, value]) => `${key}: ${value}`)
          .join(' | ');
        // Redirect to Google Search with the question
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(question)}`;
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Frontend Error:', err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="incident-report-form">
      <h2>Incident Impact Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>1. What is the title of the incident?</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>2. What service/application is affected?</label>
          <input type="text" name="service" value={formData.service} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>3. Which system, application, or service is impacted? Is this issue internal or customer-facing?</label>
          <textarea name="impactedSystem" value={formData.impactedSystem} onChange={handleInputChange} rows="2" required />
        </div>

        <div className="form-group">
          <label>4. Describe the business impact (e.g., critical functions disrupted, revenue loss, SLA breaches):</label>
          <textarea name="businessImpact" value={formData.businessImpact} onChange={handleInputChange} rows="3" required />
        </div>

        <div className="form-group">
          <label>5. Who is affected (e.g., internal staff, customers)? Please specify approximate count:</label>
          <input type="text" name="affectedUsers" value={formData.affectedUsers} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>7. Are high-priority users (e.g., VIPs or executives) impacted?</label>
          <input type="checkbox" name="highPriorityUsers" checked={formData.highPriorityUsers} onChange={handleInputChange} />
          {formData.highPriorityUsers && (
            <textarea
              name="highPriorityUserDetails"
              value={formData.highPriorityUserDetails}
              onChange={handleInputChange}
              placeholder="List affected VIP users or roles"
              rows="2"
            />
          )}
        </div>

        <div className="form-group">
          <label>8. When did the issue start?</label>
          <input type="datetime-local" name="issueStartTime" value={formData.issueStartTime} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>9. What is the current status (e.g., full outage, degraded, intermittent)?</label>
          <input type="text" name="currentStatus" value={formData.currentStatus} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>10. Are there any known workarounds or temporary solutions available?</label>
          <textarea name="workaround" value={formData.workaround} onChange={handleInputChange} rows="2" />
        </div>

        <div className="form-group">
          <label>11. Are other systems, integrations, or services at risk due to this issue?</label>
          <textarea name="riskToOtherSystems" value={formData.riskToOtherSystems} onChange={handleInputChange} rows="2" />
        </div>

        <div className="form-group">
          <label>12. Is there any risk of data loss, corruption, or integrity compromise?</label>
          <textarea name="dataImpact" value={formData.dataImpact} onChange={handleInputChange} rows="2" />
        </div>

        <div className="form-group">
          <label>13. Has this issue occurred before, or is it a known/recurring problem?</label>
          <textarea name="recurringIssue" value={formData.recurringIssue} onChange={handleInputChange} rows="2" />
        </div>

        <div className="form-group">
          <label>14. Who needs to be notified (e.g., product owners, compliance, support)?</label>
          <textarea name="stakeholderNotification" value={formData.stakeholderNotification} onChange={handleInputChange} rows="2" />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {priority && (
        <p style={{ marginTop: '1rem', color: 'green' }}>
           Recommended Priority: <strong>{priority}</strong>
        </p>
      )}

      {error && (
        <p style={{ marginTop: '1rem', color: 'red' }}>
           {error}
        </p>
      )}
    </div>
  );
}

export default IncidentForm;
