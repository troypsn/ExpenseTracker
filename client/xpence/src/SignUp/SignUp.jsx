import styles from './SignUp.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';



export default function SignUp() {

  function handleSignUpResult(result){
    const signUpResultStyling = document.getElementsByClassName(styles.SignUpResult)[0];
    signUpResultStyling.style.color = "white";
    console.log(result.data);
    setsignUpResult(`Sign Up Successful! You can now log in, ${result.data.data.username}`);
  }

  function handleSignUpFailure(error){
    console.error("Sign Up failed", error);
    const signUpResultStyling = document.getElementsByClassName(styles.SignUpResult)[0];
    signUpResultStyling.style.color = "red";
    setsignUpResult(`Sign Up failed: ${error.response.data.message ? error.response.data.message : 'Server error'}`);
  }
  const [signUpResult, setsignUpResult] = useState("");

  const handleSubmit = async (e) => {
        e.preventDefault();
        try{                
          //axios post request to server
            const result = await axios.post('http://localhost:5000/auth/signup', {
            username: e.target.username.value,
            password: e.target.password.value,
          });
            console.log(result.data);
            handleSignUpResult(result);
        } catch (error) {
            handleSignUpFailure(error);
        }
}

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
          <Link to={'/'} className={styles.linkStyle}><h3>HOME</h3></Link>
          <Link to={'/login'} className={styles.linkStyle}><h3>LOGIN</h3></Link>
          <Link to={'/signup'} className={styles.linkStyle}><h3>SIGN UP</h3></Link>
          <Link to={'/about'} ><h3>ABOUT</h3></Link>
      </nav>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>  
            <input type="text" placeholder='Username' name="username" required/>
        </div>
        <div className={styles.inputContainer}> 
          <input type="password" placeholder='Password' name="password" required/>
        </div>
        <div className={styles.inputContainer}> 
          <input type="password" placeholder='Confirm Password' name="confirmPassword" required/>
        </div>
        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>
      <h1 className={styles.SignUpResult}>{signUpResult}</h1>
    </div>
  )
}
