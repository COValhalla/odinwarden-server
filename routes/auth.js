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
router.post('/add/login', auth_controller.add_login);

// PUT for updating login
router.put('/update/login', auth_controller.update_login);

// DELETE for deleting login
router.delete('/delete/login', auth_controller.delete_login);

// POST for adding card
router.post('/add/card', auth_controller.add_card);

// Delete for deleting card
router.delete('/delete/card', auth_controller.delete_card);

// PUT for updating card
router.put('/update/card', auth_controller.update_card);

// POST for getting logins and cards
router.post('/get-items', auth_controller.get_items);

module.exports = router;
