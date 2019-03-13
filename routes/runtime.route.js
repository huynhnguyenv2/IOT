const express = require('express');
const router = express.Router();

const runtime_controller = require('../controllers/runtime.controller');

router.get('/test', runtime_controller.test);
router.get('/:id', runtime_controller.runtime_details);
router.post('/:id', runtime_controller.details);

module.exports = router;