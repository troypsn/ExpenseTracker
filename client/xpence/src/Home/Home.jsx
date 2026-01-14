import { Link, useNavigate } from "react-router-dom"
import styles from './Home.module.css';
import { useEffect, useState } from "react";

function Home() {
  const [amount, setAmount] = useState(0)
  const [displayUsername, setDisplayUsername] = useState("USERNAME")
  
useEffect(()=>{
  console.log("I am refreshiing")
  console.log(localStorage.getItem("username"))
  console.log(localStorage.getItem("password"))
  if (localStorage.getItem("username")){
    const username = localStorage.getItem("username").toUpperCase();
    setDisplayUsername(username)
  }
},[])

 const shortcuts = [
    {
      id : 1,
      name: "SNACK",
      desc: "Eat",
      amount: 50
    },
    {
      id : 2,
      name: "FOOD",
      desc: "Eat",
      amount: 100
    },
    {
      id : 3,
      name: "BILLS",
      desc: "Electricity",
      amount: 500
    },
    {
      id : 4,
      name: "RENT",
      desc: "Dorm",
      amount: 2000
    },
    {
      id : 5,
      name: "COMMUTE",
      desc: "Jeep",
      amount: 75
    },
    {
      id : 6,
      name: "COFFEE",
      desc: "Beverage",
      amount: 100
    }]

    function addToAmount(shortcutname, shortcutAmount, shortcutdesc){
      setAmount((prev)=> prev + shortcutAmount);
    } 

  return (
   <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Link to={'/'}><p>MENU</p></Link>  <Link to={'/'}><p>__XPENCE__</p></Link> <Link to={'/'}><p>{displayUsername}</p></Link>
      </div>
      <div className={styles.screenContainer}>
            <div className={styles.screen}>
                <div className={styles.screenTitle}>TOTAL COST</div>
                <div className={styles.balance}>{amount}</div>
            </div>
      </div>
      <div className={styles.controlsAndShortcutsContainer}>
          <div className={styles.controls}>
            <p>SHORTCUTS</p> <p></p> <Link to={'/add'}><p>ADD</p></Link>
          </div>
          <div className={styles.shortcutsContainer}>
              {/* <div className={styles.shortcut}>
                  <p className={styles.shortcutTitle}>Snacks</p>
                  <p className={styles.shortcutAmount}>50</p>
              </div>
              <div className={styles.shortcut}>
                  <p className={styles.shortcutTitle}>Snacks</p>
                  <p className={styles.shortcutAmount}>50</p>
              </div>
              <div className={styles.shortcut}>
                  <p className={styles.shortcutTitle}>Snacks</p>
                  <p className={styles.shortcutAmount}>50</p>
              </div>
              <div className={styles.shortcut}>
                  <p className={styles.shortcutTitle}>Snacks</p>
                  <p className={styles.shortcutAmount}>50</p>
              </div>
              <div className={styles.shortcut}>
                  <p className={styles.shortcutTitle}>Snacks</p>
                  <p className={styles.shortcutAmount}>50</p>
              </div>
              <div className={styles.shortcut}>
                  <p className={styles.shortcutTitle}>Snacks</p>
                  <p className={styles.shortcutAmount}>50</p>
              </div> */}
              {shortcuts.map((shortcut)=>{
                return ( 
                <div onClick={()=>{
                  addToAmount(shortcut.name, Number(shortcut.amount),shortcut.desc);
                }}className={styles.shortcut} id={shortcut.id}>
                  <p className={styles.shortcutTitle}>{shortcut.name}</p>
                  <p className={styles.shortcutAmount}>{shortcut.amount}</p>
                </div>
              )
              })}
          </div>
      </div>
    </div>
  )
}

export default Home