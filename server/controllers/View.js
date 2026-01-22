const db = require("../db");

const getTransactions = (req, res) =>{

        const {userId} = req.query;
    
        const query = `SELECT * FROM transactions WHERE userId = ${userId}`;
    
        db.query(query, (error, result)=>{
            if(error){
                console.log(error);
                res.status(404).json({successful : false, data: {error}})
            } else if (result){
                res.status(200).json({successful : true, data: {result}})
                console.log(result[0])
            }   
        })
    
}

module.exports = {
    getTransactions
}