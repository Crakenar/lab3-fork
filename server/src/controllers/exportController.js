const pool = require('./../config/db');
const User = require('../db/models/User');
const DataExporter = require('../db/models/Export');

const exportUsers = async (req, res) => {
  try {
    const result = await User.getAll()
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAvailableTables = async (req, res) => {
  try {
    const result = await DataExporter.getTables();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const exportTableData = async (req, res) => {

  const { tableName, limit } = req.query;

  const availableTables = await DataExporter.getTables();
  const availableTableNames = availableTables.map(t => t.table_name);
  if (!availableTableNames.includes(tableName)) {
    return res.status(400).json({ error: 'Table does not exist' });
  }

  try {
    const result = await DataExporter.getTableData(tableName, limit);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  exportUsers,
  getAvailableTables,
  exportTableData
};