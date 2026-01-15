const express = require('express');
const router = express.Router();

const { addExpense } = require('../controllers/HomeControllers');

router.get('/totalExpenses', (req, res)=>{
    const username = req.query.username;
    const timeFilter = req.query.time;
})

router.post('/addexpense', addExpense);

module.exports = router