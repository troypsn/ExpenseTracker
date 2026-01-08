const express = require('express');
const router = express.Router();
const db = require('../db');
const { isLoggedIn, signUpUser } = require('../controllers/Authentication.controllers');
// const bcrypt = require('bcrypt'); include this some other time

    // Login route
    router.post('/login', isLoggedIn);

    router.post('/signup', signUpUser);



module.exports = router;