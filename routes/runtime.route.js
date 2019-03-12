const express = require('express');
const router = express.Router();

const runtime_controller = require('../controllers/runtime.controller');

router.get('/test', runtime_controller.test);

module.exports = router;