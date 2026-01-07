const express = require ('express')
const mysql = require ('mysql')
const cors = require ('cors')
const path = require('path')


const app = express();

app.use (express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "expensesdb"
})

const sql = "select * from users";

app.get('/',(req, res)=>{
    res.status(200).send('Welcome to the Expense Tracker API')
});

//test connection if it works
app.get('/test',(req, res)=>{
    db.query(sql,(err,result)=>{
        if (err) throw err;
        res.send(result);})
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

