import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { useState, useEffect} from 'react'

export default function Header() {
    const [displayUsername, setDisplayUsername] = useState("")
    useEffect(()=>{
        const username =(localStorage.getItem("username")).toUpperCase()
        setDisplayUsername(username);
    },[])
  return (
     <div className={styles.header}>
        <Link to={'/'}><p>MENU</p></Link>  <Link to={'/view'}><p>__XPENCE__</p></Link> <Link to={'/home'}><p>{displayUsername}</p></Link>
    </div>
  )
}
