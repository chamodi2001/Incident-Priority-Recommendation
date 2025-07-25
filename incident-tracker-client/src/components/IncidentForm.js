import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IncidentReport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    service: '',
    impactedSystem: '',
    description: '',
    affectedUsers: '',
    affectedRegions: '',
    highPriorityUsers: false,
    highPriorityUserDetails: '',
    businessImpact: '',
    issueStartTime: '',
    currentStatus: '',
    workaround: '',
    riskToOtherSystems: '',
    dataImpact: '',
    relatedToChange: '',
    recurringIssue: '',
    estimatedResolutionTime: '',
    stakeholderNotification: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/incidents', formData);
      alert('Incident reported successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error reporting incident:', error);
      alert('Error reporting incident. Please try again.');
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

        <div className="form-actions">
          <button type="submit">Submit Incident Report</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default IncidentReport;
