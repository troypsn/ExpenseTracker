import styles from './Landing.module.css';
import { Link } from "react-router-dom";



export default function LoggedIn() {
      if(localStorage.getItem("username") && localStorage.getItem("password")){
        const username = localStorage.getItem("username").toUpperCase();
        return(
          <div className={styles.navItem}>
              <p className={styles.arrow}>▶︎</p>
              <div className={styles.navText}><Link to={'/home'} className={styles.linkStyle}><h3>{`HOME : ${username}` }</h3></Link></div>
          </div>
        )
    } else {
        return("");
    }
}

