const express = require('express');
// const { Blog } = require('../models/models');
const { add } = require('../control.js/control');
const router = express.Router();
router.post('/add', add);

module.exports = router;