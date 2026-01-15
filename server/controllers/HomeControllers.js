const db = require("../db");

const addExpense = (req, res) => {
  const { title, description, amount, userId } = req.body;

  console.log({ title, description, amount, userId });

  const query = `INSERT INTO transactions (userId, title, amount, description) VALUES ("${userId}", "${title}", ${Number(amount)}, "${description}")`

  db.query(query, (err,result)=>{
    if(err){
        res.json(err).status(401)
    } else 
    if(result){
        res.json({successful: true , message: "Successfully added into transactions"}).status(200);
    }
  });
}


module.exports = {
    addExpense
}