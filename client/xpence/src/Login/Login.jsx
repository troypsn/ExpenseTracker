import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

function Login() {

  const [username, setUsername] = useState("");



    
  // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{                //axios post request to server
            const result = await axios.post('http://localhost:5000/login', {
            username: e.target.username.value,
            password: e.target.password.value,
          });

          //returns if user exists in database
          console.log(result.data);
          setUsername(`Welcome, ${result.data.data.username}`);
        } catch (error) {
          console.error("Login failed", error);
        }
        
    }

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>  
            <input type="text" placeholder='Username' name="username" required/>
        </div>
        <div className={styles.inputContainer}>
          
          <input type="password" placeholder='Password' name="password" required/>
        </div>
        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
      <h1 className={styles.welcomeMessage}>{username}</h1>
    </div>
  )
}

export default Login