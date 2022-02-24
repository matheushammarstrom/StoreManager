const express = require('express');

const salesController = require('../controllers/sales');

const router = express.Router();

router.get('/', salesController.getAll);

module.exports = router;