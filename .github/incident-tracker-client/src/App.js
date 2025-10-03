import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IncidentForm from './components/IncidentForm';
import IncidentList from './components/IncidentList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<IncidentList />} />
          <Route path="/report" element={<IncidentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
