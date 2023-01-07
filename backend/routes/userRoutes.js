const express = require('express');
const router = express.Router();

const {
  createUser,
  loginUser,
  getUser,
} = require('../controller/userController');

// router.get('/me', getUser);
router.post('/login', loginUser);
router.post('/signup', createUser);
router.get('/', getUser);

module.exports = router;
