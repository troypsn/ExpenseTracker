const express = require('express');
const router = express.Router()
const { addExpense, totalExpense, getShortcuts} = require('../controllers/HomeControllers');
const db = require('../db');

router.get('/totalexpense',  totalExpense)

router.get('/getshortcuts', getShortcuts)

router.post('/addexpense', addExpense);

module.exports = router