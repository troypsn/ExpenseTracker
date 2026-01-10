const express = require ('express')
const mysql = require ('mysql')
const cors = require ('cors')
const path = require('path')
const LoginSignup = require('./routes/LoginSignup.js')
const db = require ('./db')
const app = express();


app.use (express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())

const port = 5000


app.use('/auth', LoginSignup)

app.get('/',(req, res)=>{
    res.status(200).send('Welcome to the Expense Tracker API')
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

