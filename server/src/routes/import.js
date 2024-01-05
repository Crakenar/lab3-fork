const express = require('express');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router();
const { importData } = require('../controllers/importController');
const authMiddleware = require('./../middleware/authMiddleware');

router.post('/', upload.single('file'), authMiddleware, importData);

module.exports = router;