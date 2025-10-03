
import React, { useState } from 'react';
import './incident-form.css';

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
        <div className="form-group fieldset" role="group" aria-labelledby="impact-legend">
          <div className="legend" id="impact-legend">Impact</div>
          <div className="radio-group">
            <label className={`radio-label ${impact === 'high' ? 'checked' : ''}`}>
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

            <label className={`radio-label ${impact === 'low' ? 'checked' : ''}`}>
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
        </div>

        <div className="form-group fieldset" role="group" aria-labelledby="urgency-legend">
          <div className="legend" id="urgency-legend">Urgency</div>
          <div className="radio-group">
            <label className={`radio-label ${urgency === 'high' ? 'checked' : ''}`}>
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

            <label className={`radio-label ${urgency === 'low' ? 'checked' : ''}`}>
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
        </div>

        <div className="button-row">
          <button type="submit" className="button">Recommend Priority</button>
          <button
            type="button"
            className="button secondary"
            onClick={() => { setImpact(''); setUrgency(''); setPriority(''); }}
          >
            Reset
          </button>
        </div>
      </form>

      {priority && (
        <div>
          <div className="priority-pill" aria-live="polite">Recommended Priority: {priority}</div>
        </div>
      )}
    </div>
  );
}

export default IncidentForm;
