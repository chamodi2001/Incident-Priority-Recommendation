const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/incidents - Create new incident
router.post('/', (req, res) => {
  const {
    title,
    service,
    impactedSystem,
    description,
    affectedUsers,
    affectedRegions,
    highPriorityUsers,
    highPriorityUserDetails,
    businessImpact,
    issueStartTime,
    currentStatus,
    workaround,
    riskToOtherSystems,
    dataImpact,
    relatedToChange,
    recurringIssue,
    estimatedResolutionTime,
    stakeholderNotification,
    severity // Make sure your form includes this field!
  } = req.body;

  const sql = `
    INSERT INTO incidents (
      title, service, impactedSystem, description, affectedUsers, affectedRegions,
      highPriorityUsers, highPriorityUserDetails, businessImpact, issueStartTime,
      currentStatus, workaround, riskToOtherSystems, dataImpact, relatedToChange,
      recurringIssue, estimatedResolutionTime, stakeholderNotification, severity
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    title, service, impactedSystem, description, affectedUsers, affectedRegions,
    highPriorityUsers, highPriorityUserDetails, businessImpact, issueStartTime,
    currentStatus, workaround, riskToOtherSystems, dataImpact, relatedToChange,
    recurringIssue, estimatedResolutionTime, stakeholderNotification, severity
  ], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// GET /api/incidents - Get all incidents
router.get('/', (req, res) => {
  db.query('SELECT * FROM incidents ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;