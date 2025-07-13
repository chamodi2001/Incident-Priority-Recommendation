import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/incidents')
      .then(res => setIncidents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Incident Tracker</h2>
      <Link to="/report" className="nav-link">+ Report New Incident</Link>
      {incidents.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <ul>
          {incidents.map(incident => (
            <li key={incident.id} className="incident-item">
              <strong>{incident.title}</strong> — {incident.severity} — {incident.service}<br />
              <small>{new Date(incident.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentList;
