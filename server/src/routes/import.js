const express = require('express');
const router = express.Router();
const importController = require('../controllers/importController');
const auth = require('../middleware/auth');

router.post('/', auth, importController.importData);

module.exports = router;