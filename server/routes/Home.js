const express = require('express');
const router = express.Router()
const { addExpense, totalExpense} = require('../controllers/HomeControllers');
const db = require('../db');

router.get('/totalexpense',  totalExpense)

router.post('/addexpense', addExpense);

module.exports = router