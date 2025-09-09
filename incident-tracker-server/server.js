const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db'); // Import your database connection
const incidentRoutes = require('./routes/incidents');

const app = express();
app.use(cors());
app.use(express.json());

// Database initialization - Create tables if they don't exist
const initializeDatabase = () => {
  console.log('Initializing database tables...');

  // Create incidents table matching your routes
  const createIncidentsTable = `
    CREATE TABLE IF NOT EXISTS incidents (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      service VARCHAR(255),
      impactedSystem TEXT,
      description TEXT,
      affectedUsers VARCHAR(255),
      affectedRegions VARCHAR(255),
      highPriorityUsers TINYINT(1),
      highPriorityUserDetails TEXT,
      businessImpact TEXT,
      issueStartTime DATETIME,
      currentStatus VARCHAR(255),
      workaround TEXT,
      riskToOtherSystems TEXT,
      dataImpact TEXT,
      relatedToChange TEXT,
      recurringIssue TEXT,
      estimatedResolutionTime VARCHAR(255),
      stakeholderNotification TEXT,
      severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  // Execute table creation query
  db.query(createIncidentsTable, (err, result) => {
    if (err) {
      console.error('Error creating incidents table:', err);
    } else {
      console.log('Incidents table ready');
    }
  });

  // Insert sample data (optional)
  const insertSampleData = `
    INSERT IGNORE INTO incidents (title, service, impactedSystem, description, affectedUsers, affectedRegions, highPriorityUsers, highPriorityUserDetails, businessImpact, issueStartTime, currentStatus, workaround, riskToOtherSystems, dataImpact, relatedToChange, recurringIssue, estimatedResolutionTime, stakeholderNotification, severity) VALUES
    ('Database Connection Error', 'Database', 'Main DB Server', 'Unable to connect to main database server', 'All users', 'Global', 0, '', 'Critical business impact', '2025-09-09 10:00:00', 'Full outage', '', '', '', '', '', '', '', 'critical'),
    ('API Response Slow', 'API Gateway', 'API Layer', 'API endpoints responding slower than usual', 'Developers', 'US', 0, '', 'Moderate impact', '2025-09-08 09:00:00', 'Degraded', '', '', '', '', '', '', '', 'high'),
    ('UI Loading Issue', 'Frontend', 'Dashboard', 'Dashboard takes long time to load', 'End users', 'EU', 0, '', 'Minor inconvenience', '2025-09-07 08:00:00', 'Intermittent', '', '', '', '', '', '', '', 'medium'),
    ('Email Service Down', 'Email Service', 'Email System', 'Email notifications not being sent', 'Support', 'Asia', 0, '', 'Low impact', '2025-09-06 07:00:00', 'Full outage', '', '', '', '', '', '', '', 'low')
  `;

  db.query(insertSampleData, (err, result) => {
    if (err && err.code !== 'ER_DUP_ENTRY') {
      console.error('Error inserting sample data:', err);
    } else {
      console.log('Sample data ready');
    }
  });
};

// Initialize database when server starts
setTimeout(initializeDatabase, 2000); // Wait 2 seconds for DB connection

app.use('/api/incidents', incidentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Incident Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Incident Tracker API',
    endpoints: {
      health: '/api/health',
      incidents: '/api/incidents'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});