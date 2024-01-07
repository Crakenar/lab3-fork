const express = require('express');
const router = express.Router();
const { exportTableData, getAvailableTables } = require('./../controllers/exportController');
const authMiddleware = require('./../middleware/authMiddleware');

router.get('/', authMiddleware, exportTableData);
router.get('/available-tables', authMiddleware, getAvailableTables);

module.exports = router;