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
      severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
      description TEXT,
      service VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  // Execute table creation query
  db.query(createIncidentsTable, (err, result) => {
    if (err) {
      console.error('Error creating incidents table:', err);
    } else {
      console.log('✅ Incidents table ready');
    }
  });

  // Insert sample data (optional)
  const insertSampleData = `
    INSERT IGNORE INTO incidents (title, severity, description, service) VALUES
    ('Database Connection Error', 'critical', 'Unable to connect to main database server', 'Database'),
    ('API Response Slow', 'high', 'API endpoints responding slower than usual', 'API Gateway'),
    ('UI Loading Issue', 'medium', 'Dashboard takes long time to load', 'Frontend'),
    ('Email Service Down', 'low', 'Email notifications not being sent', 'Email Service')
  `;

  db.query(insertSampleData, (err, result) => {
    if (err && err.code !== 'ER_DUP_ENTRY') {
      console.error('Error inserting sample data:', err);
    } else {
      console.log('✅ Sample data ready');
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
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});
