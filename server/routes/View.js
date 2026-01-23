const express = require('express');
const router = express.Router();
const db = require('../db');
const {getTransactions} = require('../controllers/View')

router.get('/transactions', getTransactions)

router.delete('/deletetransaction/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "transactionId is required"
        });
    }

    const query = `DELETE FROM transactions WHERE transactionId = ${id}`;

    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }
        return res.status(200).json({
            success: true,
            deletedId: id
        });
    });
});

module.exports = router