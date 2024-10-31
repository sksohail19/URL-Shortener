const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controllers/users.js');
const router = express.Router();


router.post("/signup", handleUserSignup);
router.post("/", handleUserLogin)

module.exports = router;