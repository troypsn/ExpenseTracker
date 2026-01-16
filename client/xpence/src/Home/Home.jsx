import { Link, useNavigate } from "react-router-dom"
import styles from './Home.module.css';
import { useEffect, useState, useRef } from "react";
import axios from "axios";


function Home() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0)
  const [displayUsername, setDisplayUsername] = useState("USERNAME")
  const [displayTimeline, setDisplayTimeline] = useState("TODAY");
  const [shortcutName, setShortcutName] = useState("SHORTCUTS")
  const [shortcutEditMode, setShortcutEditMode] = useState(false)
  const [timelineIndex, setTimelineIndex] = useState(0);
  
useEffect(()=>{
  console.log("I am refreshiing")
  console.log(localStorage.getItem("username"))
  console.log(localStorage.getItem("password"))
  if (localStorage.getItem("username")){
    const username = localStorage.getItem("username").toUpperCase();
    setDisplayUsername(username)
  }

  getTotalExpence();

},[])

 

 const shortcuts = [
    // {
    //   id : 1,
    //   name: "SNACK",
    //   desc: "Eat",
    //   amount: 50
    // },
    // {
    //   id : 2,
    //   name: "FOOD",
    //   desc: "Eat",
    //   amount: 100
    // },
    // {
    //   id : 3,
    //   name: "BILLS",
    //   desc: "Electricity",
    //   amount: 500
    // },
    // {
    //   id : 4,
    //   name: "RENT",
    //   desc: "Dorm",
    //   amount: 2000
    // },
    // {
    //   id : 5,
    //   name: "COMMUTE",
    //   desc: "Jeep",
    //   amount: 75
    // },
    // {
    //   id : 6,
    //   name: "COFFEE",
    //   desc: "Beverage",
    //   amount: 100
    // }
  ]

    function handleShortcutClick(shortcutName, shortcutDesc, shortcutAmount, shortcutId){
      if(shortcutEditMode){
 
          navigate('/add', {state: {title : {shortcutName}, description : {shortcutDesc}, amount :{shortcutAmount}, id :{shortcutId}}})
        
        
      } else {
        setAmount((prev)=> prev + shortcutAmount);
      }
    }
     
  
  //handle type of filter
  const timelines = [
    { label: "TODAY", value: "day" },
    { label: "THIS WEEK", value: "week" },
    { label: "THIS MONTH", value: "month" },
    { label: "THIS YEAR", value: "year" },
    { label: "ALL TIME" , value: "all" }
  ];
  

  const getTotalExpence = async ()=>{
          try{  
            const userId = localStorage.getItem("userId");
            const time = timelines[timelineIndex].value;

            const result = await axios.get(`http://localhost:5000/home/totalexpense?userId=${userId}&time=${time}`);

            console.log(result);
            const fetchedAmount = result.data.data.amount ? result.data.data.amount : 0;
            setAmount(fetchedAmount);

          } catch (error) {
            console.log(error);
          }
  }

  const toggleTimeline = () => {
     setTimelineIndex((prev) => (prev + 1) % timelines.length);
     console.log(timelineIndex)
     setDisplayTimeline(timelines[timelineIndex].label);

    getTotalExpence();
  }
    

  

    //handle shortcut long and short presses

  const shortcutShortPress = () =>{
    //insert switching modules for shortcuts
  }

  const shortcutLongPress = () =>{
    console.log("Long press!")
    let currentName = shortcutName;
    const shortcut = document.querySelectorAll(`.${styles.shortcut}`)

    if(currentName === "SHORTCUT | EDIT MODE"){
      setShortcutName("SHORTCUT")
      setShortcutEditMode(false)
      shortcut.forEach((element)=> element.style.outline = "4px solid white")
    } else {
      setShortcutName("SHORTCUT | EDIT MODE")
      setShortcutEditMode(true)
      shortcut.forEach((element)=> element.style.outline = "4px solid yellow")
    }
  }
  
  const holdTimeout = useRef(null);
  const activatedRef = useRef(false);
  const releasedRef = useRef(false);

  const HOLD_TIME = 1000;

  const handlePointerDown = () => {
    releasedRef.current = false;
    activatedRef.current = false;

    holdTimeout.current = setTimeout(() => {
      activatedRef.current = true;
      shortcutLongPress();
    }, HOLD_TIME);
  };

  const handlePointerUp = () => {
    if (releasedRef.current) return; // ✅ prevent double fire
    releasedRef.current = true;

    if (!activatedRef.current) {
      shortcutShortPress();
    }

    clearTimeout(holdTimeout.current);
    holdTimeout.current = null;
  };


  return (
   <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Link to={'/'}><p>MENU</p></Link>  <Link to={'/'}><p>__XPENCE__</p></Link> <Link to={'/'}><p>{displayUsername}</p></Link>
      </div>
      <div className={styles.screenContainer}>
            <div className={styles.screen} onClick={() =>{toggleTimeline();}}>
                <div className={styles.screenTitle}>TOTAL COST</div>
                <div className={styles.timeline}>{`:${displayTimeline}`}</div>
                <div className={styles.balance}>{amount}</div>
            </div>
      </div>
      <div className={styles.controlsAndShortcutsContainer}>
          <div className={styles.controls}>
            <p
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onContextMenu={(e) => e.preventDefault()}
            style={{ userSelect: "none", touchAction: "none", cursor: "pointer" }}
          >
            {shortcutName}
          </p><p></p> <Link to={'/add'}><p>ADD</p></Link>
          </div>
          <div className={styles.shortcutsContainer}>

              {shortcuts.map((shortcut)=>{
                return ( 
                <div onClick={()=>{
                  handleShortcutClick(shortcut.name,shortcut.desc, Number(shortcut.amount) , shortcut.id);
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