
import React, { useState } from 'react';

function IncidentForm() {
  const [impact, setImpact] = useState('');
  const [urgency, setUrgency] = useState('');
  const [priority, setPriority] = useState('');

  const handleImpactChange = (e) => {
    setImpact(e.target.value);
    setPriority('');
  };

  const handleUrgencyChange = (e) => {
    setUrgency(e.target.value);
    setPriority('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Priority logic
    if (impact === 'high' && urgency === 'high') {
      setPriority('P1');
    } else if (impact === 'high' && urgency === 'low') {
      setPriority('P2');
    } else if (impact === 'low' && urgency === 'high') {
      setPriority('P3');
    } else if (impact === 'low' && urgency === 'low') {
      setPriority('P4');
    } else {
      setPriority('');
    }
  };

  return (
    <div className="incident-report-form">
      <h2>Incident Priority Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Impact:</label><br />
          <label>
            <input
              type="radio"
              name="impact"
              value="high"
              checked={impact === 'high'}
              onChange={handleImpactChange}
              required
            />
            High
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="impact"
              value="low"
              checked={impact === 'low'}
              onChange={handleImpactChange}
              required
            />
            Low
          </label>
        </div>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label>Enter Urgency:</label><br />
          <label>
            <input
              type="radio"
              name="urgency"
              value="high"
              checked={urgency === 'high'}
              onChange={handleUrgencyChange}
              required
            />
            High
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="urgency"
              value="low"
              checked={urgency === 'low'}
              onChange={handleUrgencyChange}
              required
            />
            Low
          </label>
        </div>

        <button type="submit" style={{ marginTop: '1.5rem' }}>
          Recommend Priority
        </button>
      </form>

      {priority && (
        <p style={{ marginTop: '2rem', color: 'green', fontWeight: 'bold' }}>
          Recommended Priority: <span>{priority}</span>
        </p>
      )}
    </div>
  );
}

export default IncidentForm;
