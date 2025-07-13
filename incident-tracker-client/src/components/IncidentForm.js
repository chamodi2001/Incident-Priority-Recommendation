import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const IncidentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    severity: '',
    description: '',
    service: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/incidents', formData);
    alert('Incident reported!');
    navigate('/');
  };

  return (
    <div>
      <h2>Report New Incident</h2>
      <Link to="/" className="nav-link">← Back to Incident List</Link>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Incident Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="service"
          placeholder="Service Affected"
          value={formData.service}
          onChange={handleChange}
          required
        />
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          required
        >
          <option value="">Select Severity</option>
          <option value="P1">P1 - Critical</option>
          <option value="P2">P2 - High</option>
          <option value="P3">P3 - Medium</option>
          <option value="P4">P4 - Low</option>
        </select>
        <textarea
          name="description"
          placeholder="Describe the incident"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
        />
        <button type="submit">Submit Incident</button>
      </form>
    </div>
  );
};

export default IncidentForm;
