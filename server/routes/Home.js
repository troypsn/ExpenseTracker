const express = require('express');
const router = express.Router();


router.get('/totalExpenses', (req, res)=>{
    const username = req.query.username;
    const timeFilter = req.query.time;
})

router.post('/addexpense', (req, res) => {
  const { title, description, amount, username } = req.body;

  console.log({ title, description, amount, username });

  res.status(200).json({
    success: true,
    message: "I have received your request"
  });
});

module.exports = router