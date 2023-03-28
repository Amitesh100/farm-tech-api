const express = require("express");
const router = express.Router();
const { signup_user, login_user } = require("../controllers/users.controller");

//* Auth routes
router.post('/signup', signup_user);

router.post('/login', login_user);

module.exports = router;