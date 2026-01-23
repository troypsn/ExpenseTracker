import styles from './SignUp.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import NavbarMenu from '../Utility/NavbarMenu/NavbarMenu';



export default function SignUp() {
  
  const [signUpResult, setsignUpResult] = useState("");

 

  function handleSignUpFailure(error){
    console.error("Sign Up failed", error);
    const signUpResultStyling = document.getElementsByClassName(styles.SignUpResult)[0];
    signUpResultStyling.style.color = "red";
    setsignUpResult(`Sign Up failed: ${error.response.data.message ? error.response.data.message : 'Server error'}`);
  }
  

  const handleSubmit = async (e) => {
        e.preventDefault();

        if (e.target.password.value === e.target.confirmPassword.value){
            try{                
            //axios post request to server
              const result = await axios.post('http://localhost:5000/auth/signup', {
              username: e.target.username.value,
              password: e.target.password.value,
            });
              const signUpResultStyling = document.getElementsByClassName(styles.SignUpResult)[0];
              signUpResultStyling.style.color = "white";
              console.log(result.data);
              setsignUpResult(`Sign Up Successful! You can now log in, ${result.data.data.username}`);
          } catch (error) {
              handleSignUpFailure(error);
          }
        } else {
          const signUpResultStyling = document.getElementsByClassName(styles.SignUpResult)[0];
          signUpResultStyling.style.color = "red";
          setsignUpResult(`Sign Up failed: Passwords do not match`);
        }
        
}

  return (
    <div className={styles.pageContainer}>
      <NavbarMenu></NavbarMenu>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>  
            <label htmlFor="username">Username:</label><input type="text" placeholder='' name="username" required/>
        </div>
        <div className={styles.inputContainer}> 
          <label htmlFor="password">Password:</label><input type="password" placeholder='' name="password" required/>
        </div>
        <div className={styles.inputContainer}> 
          <label htmlFor="confirmPassword">Confirm Password:</label>< input type="password" placeholder='' name="confirmPassword" required/>
        </div>
        <button type="submit" className={styles.submitButton}>Sign Up</button>
        <h1 className={styles.SignUpResult}>{signUpResult}</h1>
      </form>
      
    </div>
  )
}
