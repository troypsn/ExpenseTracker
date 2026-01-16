const express = require('express');
const router = express.Router()
const { addExpense } = require('../controllers/HomeControllers');
const db = require('../db');

router.get('/totalexpense', (req, res)=>{
    const userId = req.query.userId;
    const time = req.query.time;
    console.log(`UserID: ${userId} Time: ${time}`)

    const query = `SELECT  SUM(amount) AS total FROM transactions WHERE userid = ${userId}`

    db.query(query, (err, result)=>{
        if(err){
            res.json(err).status(408)
        } else if(result){
            const amount = result[0].total;
            console.log(`Amount: ${result[0].total}`)
            res.json({sucessful: true, data: {amount : amount}}).status(200);
        }
    })
})

router.post('/addexpense', addExpense);

module.exports = router