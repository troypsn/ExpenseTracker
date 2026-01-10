import React from 'react'
import styles from './Landing.module.css';
import { Link } from "react-router-dom";



function Landing() {
  return (
    <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1>__ EXPENCE __</h1>
        </div>
        <div className={styles.navbar}>
          <Link to={'/login'} className={styles.linkStyle}><h3>LOGIN</h3></Link>
          <Link to={'/signup'} className={styles.linkStyle}><h3>SIGN UP</h3></Link>
          <Link to={'/about'} className={styles.linkStyle}><h3>ABOUT</h3></Link>
        </div>
    </div>
  )
}

export default Landing