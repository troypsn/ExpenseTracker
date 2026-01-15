import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
function Login() {

  const [loginResult, setloginResult] = useState("");
  const navigate = useNavigate();


  function handleLogin(result){
    const loginResultStyling = document.getElementsByClassName(styles.loginResult)[0];
    loginResultStyling.style.color = "white";
    console.log(result.data);
    setloginResult(`Welcome, ${result.data.data.username}`);
  }

  function handleLoginFailure(error){
    console.error("Login failed", error);
    const loginResultStyling = document.getElementsByClassName(styles.loginResult)[0];
    loginResultStyling.style.color = "red";
    setloginResult(`Login failed: ${error.response.data.message ? error.response.data.message : 'Server error'}`);
  }


  // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{                
          //axios post request to server
            const result = await axios.post('http://localhost:5000/auth/login', {
            username: e.target.username.value,
            password: e.target.password.value,
          });
            localStorage.setItem('username',   e.target.username.value);
            localStorage.setItem('password',   e.target.password.value);
            localStorage.setItem('userId', result.data.data.userID);
            console.log(result.data.data.userID);
            console.log(result.data);
            handleLogin(result);
            navigate('/home', { replace: true });
           
          
        } catch (error) {
            handleLoginFailure(error);
        }
        
    }

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <Link to={'/'} className={styles.linkStyle}><h3>MENU</h3></Link>
          <Link to={'/login'} className={styles.linkStyle}><h3>LOGIN</h3></Link>
          <Link to={'/signup'} className={styles.linkStyle}><h3>SIGN UP</h3></Link>
          <Link to={'/about'} ><h3>ABOUT</h3></Link>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>  
          <label htmlFor="username">Username:</label> <input type="text" placeholder='' name="username" required/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password:</label> <input type="password" placeholder='' name="password" required/>
        </div>
        <button type="submit" className={styles.submitButton}>Login</button>
         <h1 className={styles.loginResult}>{loginResult}</h1>
      </form>
     
    </div>
  )
}

export default Login