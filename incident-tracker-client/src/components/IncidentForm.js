import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IncidentReport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    impactedSystem: '',
    businessImpact: '',
    impactWorsening: false,
    internalUsersAffected: '',
    externalUsersAffected: '',
    userTypes: [],
    financialImpact: false,
    legalImpact: false,
    vipUsersAffected: false,
    vipDetails: '',
    timeSensitive: false,
    workarounds: '',
    service: ''
  });

  const [calculatedPriority, setCalculatedPriority] = useState('');
  const [showPriorityExplanation, setShowPriorityExplanation] = useState('');

  const userTypeOptions = [
    'Customers',
    'Partners', 
    'Vendors',
    'Internal Users'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUserTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      userTypes: checked 
        ? [...prev.userTypes, value]
        : prev.userTypes.filter(type => type !== value)
    }));
  };

  const calculatePriority = () => {
    let score = 0;
    let explanation = [];

    // System impact scoring
    if (formData.impactedSystem.toLowerCase().includes('production') || 
        formData.impactedSystem.toLowerCase().includes('critical')) {
      score += 3;
      explanation.push('Critical system affected');
    }

    // Business impact scoring
    if (formData.businessImpact.toLowerCase().includes('no access') ||
        formData.businessImpact.toLowerCase().includes('unable') ||
        formData.businessImpact.toLowerCase().includes('down')) {
      score += 3;
      explanation.push('Severe business impact');
    }

    // Worsening impact
    if (formData.impactWorsening) {
      score += 2;
      explanation.push('Impact worsening over time');
    }

    // User count impact
    const internalCount = parseInt(formData.internalUsersAffected) || 0;
    const externalCount = parseInt(formData.externalUsersAffected) || 0;
    const totalUsers = internalCount + externalCount;

    if (totalUsers > 1000) {
      score += 3;
      explanation.push('Large number of users affected (>1000)');
    } else if (totalUsers > 100) {
      score += 2;
      explanation.push('Significant number of users affected (>100)');
    } else if (totalUsers > 10) {
      score += 1;
      explanation.push('Multiple users affected');
    }

    // Customer impact
    if (formData.userTypes.includes('Customers')) {
      score += 2;
      explanation.push('Customers affected');
    }

    // Financial/Legal impact
    if (formData.financialImpact) {
      score += 2;
      explanation.push('Financial impact identified');
    }
    if (formData.legalImpact) {
      score += 2;
      explanation.push('Legal impact identified');
    }

    // VIP users
    if (formData.vipUsersAffected) {
      score += 2;
      explanation.push('VIP users affected');
    }

    // Time sensitivity
    if (formData.timeSensitive) {
      score += 2;
      explanation.push('Time-sensitive issue');
    }

    // No workarounds available
    if (!formData.workarounds || formData.workarounds.toLowerCase().includes('none') || 
        formData.workarounds.toLowerCase().includes('no')) {
      score += 1;
      explanation.push('No workarounds available');
    }

    // Determine priority based on score
    let priority;
    if (score >= 10) {
      priority = 'critical';
    } else if (score >= 7) {
      priority = 'high';
    } else if (score >= 4) {
      priority = 'medium';
    } else {
      priority = 'low';
    }

    setCalculatedPriority(priority);
    setShowPriorityExplanation(`Priority: ${priority.toUpperCase()} (Score: ${score}) - ${explanation.join(', ')}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calculate priority before submitting
    calculatePriority();
    
    const incidentData = {
      title: formData.title,
      severity: calculatedPriority || 'medium',
      description: `
System/Application Impacted: ${formData.impactedSystem}

Business Impact: ${formData.businessImpact}

Impact Worsening: ${formData.impactWorsening ? 'Yes' : 'No'}

Users Affected:
- Internal: ${formData.internalUsersAffected}
- External: ${formData.externalUsersAffected}

User Types: ${formData.userTypes.join(', ')}

Financial Impact: ${formData.financialImpact ? 'Yes' : 'No'}
Legal Impact: ${formData.legalImpact ? 'Yes' : 'No'}

VIP Users Affected: ${formData.vipUsersAffected ? 'Yes' : 'No'}
${formData.vipDetails ? `VIP Details: ${formData.vipDetails}` : ''}

Time Sensitive: ${formData.timeSensitive ? 'Yes' : 'No'}

Workarounds: ${formData.workarounds}

Additional Description: ${formData.description}
      `,
      service: formData.service
    };

    try {
      await axios.post('http://localhost:5000/api/incidents', incidentData);
      alert('Incident reported successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error reporting incident:', error);
      alert('Error reporting incident. Please try again.');
    }
  };

  return (
    <div className="incident-report-form">
      <h2>Report New Incident</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label>Incident Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Service/Application</label>
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Impact Assessment */}
        <div className="form-section">
          <h3>Impact Assessment</h3>
          
          <div className="form-group">
            <label>1. Which system/application is impacted? *</label>
            <textarea
              name="impactedSystem"
              value={formData.impactedSystem}
              onChange={handleInputChange}
              required
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>2. What is the impact to users or the business due to this issue? *</label>
            <textarea
              name="businessImpact"
              value={formData.businessImpact}
              onChange={handleInputChange}
              required
              rows="3"
              placeholder="e.g., We have no access. Customers are calling saying they are unable to send us emails"
            />
          </div>

          <div className="form-group">
            <label>3. Is the impact worsening over time?</label>
            <input
              type="checkbox"
              name="impactWorsening"
              checked={formData.impactWorsening}
              onChange={handleInputChange}
            />
            <span>Yes, the impact is getting worse</span>
          </div>

          <div className="form-group">
            <label>4. How many users are affected by the issue?</label>
            <div>
              <label>Internal Users:</label>
              <input
                type="number"
                name="internalUsersAffected"
                value={formData.internalUsersAffected}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div>
              <label>External Users:</label>
              <input
                type="number"
                name="externalUsersAffected"
                value={formData.externalUsersAffected}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>5. What type of users are impacted?</label>
            {userTypeOptions.map(type => (
              <div key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={formData.userTypes.includes(type)}
                  onChange={handleUserTypeChange}
                />
                <span>{type}</span>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>6. Is there any direct or indirect financial/legal impact to Wiley because of the issue?</label>
            <div>
              <input
                type="checkbox"
                name="financialImpact"
                checked={formData.financialImpact}
                onChange={handleInputChange}
              />
              <span>Financial Impact</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="legalImpact"
                checked={formData.legalImpact}
                onChange={handleInputChange}
              />
              <span>Legal Impact</span>
            </div>
          </div>

          <div className="form-group">
            <label>7. Are any VIP users affected?</label>
            <input
              type="checkbox"
              name="vipUsersAffected"
              checked={formData.vipUsersAffected}
              onChange={handleInputChange}
            />
            <span>Yes, VIP users are affected</span>
            {formData.vipUsersAffected && (
              <textarea
                name="vipDetails"
                value={formData.vipDetails}
                onChange={handleInputChange}
                placeholder="Please specify which VIP users are affected"
                rows="2"
              />
            )}
          </div>

          <div className="form-group">
            <label>Is it time-sensitive?</label>
            <input
              type="checkbox"
              name="timeSensitive"
              checked={formData.timeSensitive}
              onChange={handleInputChange}
            />
            <span>Yes, this is time-sensitive</span>
          </div>

          <div className="form-group">
            <label>Any known workarounds?</label>
            <textarea
              name="workarounds"
              value={formData.workarounds}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe any known workarounds or temporary solutions"
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="form-section">
          <h3>Additional Details</h3>
          <div className="form-group">
            <label>Additional Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Any additional information about the incident"
            />
          </div>
        </div>

        {/* Priority Calculation */}
        <div className="form-section">
          <button type="button" onClick={calculatePriority} className="calculate-priority-btn">
            Calculate Priority
          </button>
          {showPriorityExplanation && (
            <div className={`priority-result priority-${calculatedPriority}`}>
              {showPriorityExplanation}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit">Report Incident</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default IncidentReport;
