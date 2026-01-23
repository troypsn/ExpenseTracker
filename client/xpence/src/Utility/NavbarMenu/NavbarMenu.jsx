import React from 'react'
import styles from './NavbarMenu.module.css'
import { Link } from 'react-router-dom'

export default function NavbarMenu() {
  return (
    <nav className={styles.navbar}>
        <Link to={'/'} className={styles.linkStyle}><h3>MENU</h3></Link>
          <Link to={'/login'} className={styles.linkStyle}><h3>LOGIN</h3></Link>
          <Link to={'/signup'} className={styles.linkStyle}><h3>SIGN UP</h3></Link>
          <Link to={'/about'} ><h3>ABOUT</h3></Link>
      </nav>
  )
}
