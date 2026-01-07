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

app.post('/login', (req, res)=>{
    const {username, password} = req.body;
    db.query(`select count(*) as count from users where username =  "${username}" and password_hash = "${password}"`, (err, result)=>{
        if (err) {
            console.error("Database query error", err);
            return res.status(500).json({success: false, message: "Internal server error"});
        }
        if (result[0].count > 0) {
            console.log(`Username: ${username}, Password: ${password}`);
            return res.status(200).json({sucess:true, data: {"username" : username, "password" : password}});
        } else {
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }
    });
    
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

