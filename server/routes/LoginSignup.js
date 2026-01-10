const express = require('express');
const router = express.Router();

const { isLoggedIn, signUpUser } = require('../controllers/LoginSignupcontrollers');


    router.post('/login', isLoggedIn);

    router.post('/signup', signUpUser);



module.exports = router;