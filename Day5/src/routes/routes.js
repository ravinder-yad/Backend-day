const express = require ('express');
const { add } = require('../controller/control');

const router = express.Router()

router.post('/add', add);

module.exports = router;