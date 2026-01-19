const express = require('express');
// const { Blog } = require('../models/models');
const { add, del } = require('../control.js/control');
const router = express.Router();
router.post('/add', add);
router.delete('/delete/:id', del);

module.exports = router;