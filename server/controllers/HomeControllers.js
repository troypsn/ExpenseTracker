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

const totalExpense = (req, res)=> {
    const userId = req.query.userId;
    const time = req.query.time;
    console.log(`UserID: ${userId} Time: ${time}`)

    let whereClause;

switch (time) {
    case "day":
        whereClause = `
            datecreated >= CURDATE()
            AND datecreated < CURDATE() + INTERVAL 1 DAY
        `;
        break;

    case "week":
        whereClause = `
            datecreated >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
            AND datecreated < DATE_ADD(
                DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY),
                INTERVAL 7 DAY
            )
        `;
        break;

    case "month":
        whereClause = `
            datecreated >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
            AND datecreated < DATE_ADD(
                DATE_FORMAT(CURDATE(), '%Y-%m-01'),
                INTERVAL 1 MONTH
            )
        `;
        break;

    case "year":
        whereClause = `
            datecreated >= DATE_FORMAT(CURDATE(), '%Y-01-01')
            AND datecreated < DATE_ADD(
                DATE_FORMAT(CURDATE(), '%Y-01-01'),
                INTERVAL 1 YEAR
            )
        `;
        break;
    case "all":
        whereClause = "true"
    break;

    default:
        return res.status(400).json({
            success: false,
            message: "Invalid time filter"
        });
}
    const query = `SELECT  SUM(amount) AS total FROM transactions WHERE userid = ${userId} AND ${whereClause}`

    db.query(query, (err, result)=>{
        if(err){
            res.json(err).status(408);
        } else if(result){
            const amount = result[0].total;
            console.log(`Amount: ${result[0].total}`)
            res.json({sucessful: true, data: {amount : amount}}).status(200);
        }
    })
  }

  const getShortcuts = (req, res)=>{
      const userId = req.query.userId;
      const query = `SELECT shortcutId, amount, title, description FROM shortcuts WHERE userid = ${userId}`
  
      db.query(query, (error, result)=>{
          if(error){
              console.log(error);
              res.status(408).send(error)
          } else {
              console.log(result)
              res.json({sucessful: true, data: {result}}).status(200);
          }
      })
  }


module.exports = {
    addExpense,
    totalExpense,
    getShortcuts
}