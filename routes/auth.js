var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/authController');

// POST for login
router.post('/login', auth_controller.login);

// POST for logout
router.post('/logout', auth_controller.logout);

// POST for register
router.post('/register', auth_controller.register);

// POST for verify
router.post('/verify', auth_controller.verify);

// POST for getting hint
router.post('/hint', auth_controller.hint);

// POST for adding login
router.post('/add/item', auth_controller.add_login);

// Post for adding card
router.post('/add/card', auth_controller.add_card);

module.exports = router;
