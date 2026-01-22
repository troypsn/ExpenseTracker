const express = require('express');
const router = express.Router();
const db = require('../db');
const {getTransactions} = require('../controllers/View')

router.get('/transactions', getTransactions)

router.delete('/deletetransaction', (req, res) => {
    const { transactionId } = req.query;

    if (!transactionId) {
        return res.status(400).json({
            success: false,
            message: "transactionId is required"
        });
    }

    const query = `DELETE FROM transactions WHERE transactionId = ?`;

    db.query(query, [transactionId], (error, result) => {
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

        res.status(200).json({
            success: true,
            deletedId: transactionId
        });
    });
});

module.exports = router