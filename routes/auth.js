var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/authController');

// POST for login
router.post('/', auth_controller.login);

// POST for logout
router.post('/logout', auth_controller.logout);

// POST for register
router.post('/register', auth_controller.register);

module.exports = router;
