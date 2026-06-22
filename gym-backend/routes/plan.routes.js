const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan.model');

// Create Plan
router.post('/', async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find().populate('assignedTo');
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Plan
router.delete('/:id', async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;