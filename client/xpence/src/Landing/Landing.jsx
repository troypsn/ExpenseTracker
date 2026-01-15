import {useState, useEffect} from 'react'
import styles from './Landing.module.css';
import { Link } from "react-router-dom";
import LoggedIn from './LoggedIn';



function Landing() {
  useEffect(()=>{
    const navItems = document.querySelectorAll(`.${styles.navItem}`);

    function navHoverEffectEnter(navItem){
      const arrow = navItem.getElementsByClassName(styles.arrow)[0];
      arrow.style.visibility = "visible";
    }

    function navHoverEffectLeave(navItem){
      const arrow = navItem.getElementsByClassName(styles.arrow)[0];
      arrow.style.visibility = "hidden";
    }
    
  navItems.forEach(navItem => {
      navItem.addEventListener('mouseenter', () => {
        console.log('mouse over')
        navHoverEffectEnter(navItem);
      });
      navItem.addEventListener('mouseleave', () => {
        console.log('mouse leave')
        navHoverEffectLeave(navItem);
      });
    });
  })


    

    

    


  return (
    <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1>__ EXPENCE __</h1>
        </div>
        <div className={styles.navbar}>
              <LoggedIn/>
          <div className={styles.navItem}>
            <p className={styles.arrow}>▶︎</p>
            <div className={styles.navText}> <Link to={'/login'} className={styles.linkStyle}><h3>LOGIN</h3></Link></div>
          </div>
          <div className={styles.navItem}>
            <p className={styles.arrow}>▶︎</p>
            <div className={styles.navText}><Link to={'/signup'} className={styles.linkStyle}><h3>SIGN UP</h3></Link></div>
          </div>
          <div className={styles.navItem}>
            <p className={styles.arrow}>▶︎</p>
            <div className={styles.navText}><Link to={'/about'} className={styles.linkStyle}><h3>ABOUT</h3></Link></div>
          </div>

        </div>
    </div>
  )
}

export default Landing