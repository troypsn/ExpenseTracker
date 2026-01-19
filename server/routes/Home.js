const express = require('express');
const router = express.Router()
const { addExpense, totalExpense, getShortcuts, addShortcut, editShorcut } = require('../controllers/HomeControllers');
const db = require('../db');

router.get('/totalexpense',  totalExpense)

router.get('/getshortcuts', getShortcuts)

router.post('/addexpense', addExpense);

router.post('/addshortcut', addShortcut);

router.post('/editshorcut', editShorcut)

module.exports = router