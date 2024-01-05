const express = require('express');
const router = express.Router();
const { exportData } = require('./../controllers/exportController');
const authMiddleware = require('./../middleware/authMiddleware');

router.get('/', authMiddleware, exportData);

module.exports = router;