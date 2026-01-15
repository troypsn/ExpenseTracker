const db = require("../db");

const isLoggedIn = (req, res) => {
    const {username, password} = req.body;
    
    const query = `select count(*) as count from users where username =  "${username}" and password_hash = "${password}"`;
        db.query(query, (err, result)=>{
            if (err) {
                console.error("Database query error", err);
                return res.status(500).json({success: false, message: "Internal server error"});
            }

            if (result[0].count > 0) {
                console.log(`Username: ${username}, Password: ${password}`);
                //gets userID
                
                db.query(`SELECT userid FROM users WHERE username = "${username}"`, (err, result)=>{
                    if(err){
                        console.error("Database insertion error", err);
                        return res.status(500).json({success: false, message: "Internal server error"});
                    } else {
                        console.log("Retrieved userID: ");
                        console.log(result[0].userid)
                        let userIdResult = result[0].userid; //userID
                        return res.status(200).json({sucess:true, data: {"username" : username, "password" : password, "userID" : userIdResult}});
                    }
                })
            } else {
                return res.status(401).json({success: false, message: "Invalid credentials"});
            }
        });
}

    const signUpUser = (req, res) => {
        const {username, password} = req.body;
           db.query(`SELECT * FROM users WHERE username = "${username}"`, (err, result) => {
                if (err) {
                    console.error("Database query error", err);
                    return res.status(500).json({success: false, message: "Internal server error"});
                }
                if (result.length > 0) {
                    return res.status(409).json({success: false, message: "Username in use, please choose another."});
                } 
            });

                const query = `INSERT INTO users (username, password_hash) VALUES ("${username}", "${password}")`;
                db.query(query, (err, result)=>{
                    if (err) {
                        console.error("Database insertion error", err);
                        return res.status(500).json({success: false, message: "Internal server error"});
                    } else {
                        return res.status(201).json({success: true, data: {"username": username}, message: result});    
                    }
                });
            }


module.exports = 
{ isLoggedIn, 
signUpUser };