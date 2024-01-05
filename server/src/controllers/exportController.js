const pool = require('./../config/db');
const User = require('../db/models/User');

const exportData = async (req, res) => {
  try {
    const result = await User.getAll()
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  exportData
};