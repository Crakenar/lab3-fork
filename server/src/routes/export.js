const express = require('express');
const router = express.Router();
const { exportTableData } = require('./../controllers/exportController');
const authMiddleware = require('./../middleware/authMiddleware');

router.get('/', authMiddleware, exportTableData);

module.exports = router;