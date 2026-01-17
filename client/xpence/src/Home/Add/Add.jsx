import styles from './Add.module.css';
import {Link} from 'react-router-dom'
import {useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Add (){

    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [id, setId] = useState(null);
    const [shortcutEditMode, setShortcutEditMode] = useState(false);
    const [shortcutAddMode, setShortcutAddMode] = useState(false);
    const [expenceAddMode, setExpenceAddMode] = useState(false);
    const [resultText, setResultText] = useState("");
    


     useEffect(() => {

        //If in edit shortcut mode, the shortcut details is passed through from Homejsx to here
        if (location.state?.title?.shortcutName) {
            console.log("Shortcut Edit Mode");
            setShortcutEditMode(true);
            setTitle(location.state.title.shortcutName);
            setDescription(location.state.description.shortcutDesc);
            setAmount(location.state.amount.shortcutAmount);
            setId(location.state.id.shortcutId);

            console.log(location.state);
            
            navigate(location.pathname, { replace: true, state: null });
            setResultText("");

        } else if (location.state?.shortcutAddMode) {
            setShortcutAddMode(true)
            console.log("Shortcut Add Mode")
    
        } else {
            setExpenceAddMode(true);
            console.log("Expence Add Mode")
        }   
        }, []);

    const handleAddExpence = async () =>{
                const result = await axios.post('http://localhost:5000/home/addexpense', {
                title: title,
                description: description,
                amount: amount,
                userId: localStorage.getItem("userId")
                });

                console.log(result);
                clearForm();

                setResultText("Successfully Added Expenses")
                const resultTextStyling = document.getElementById('resultText')
                resultTextStyling.style.color = "rgb(148, 245, 68);"
    }

    const handleShortCutEdit = async ()=>{
        //insert UPDATE axios here
    }

    const handleShortCutAdd = async ()=>{
        //insert POST axios here
    }
    
    function handleError(error){
        setResultText(`Error: ${error.response.data.message ? error.response.data.message : 'Server error'}`)
        const resultTextStyling = document.getElementById('resultText')
        resultTextStyling.style.color = "rgb(228, 67, 39);"
    }

    
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!shortcutEditMode){
            try {
                handleAddExpence();
            } catch (error){
                handleError(error);
            }
        } else if (shortcutEditMode){
            // Edit shortcut
            try {
                // input edit request here
            } catch (error){
                console.log(error);
            }
        }else if (shortcutAddMode){

        }
        
        
    }
    const clearForm = () =>{
        setTitle("")
        setDescription("")
        setAmount("")
        setId(null)
    }
  

    
    return(
      <div className={styles.pageContainer}>
        <div className={styles.header}>
            <Link to={'/'}><p>__XPENCE__</p></Link>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputFieldContainer}>
            <div className={styles.inputField}><label htmlFor="title">TITLE: </label><input type="text" name="title" required value={title} onChange={(e) => setTitle(e.target.value)}/></div>
            <div className={styles.inputField}><label htmlFor="description">DESCRIPTION: </label><input type="text" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} /></div>
            <div className={styles.inputField}><label htmlFor="amount">AMOUNT: </label><input type="number" name="amount" required value={amount} onChange={(e) => setAmount(e.target.value)}/></div>
        </div> 
        <div className={styles.controlContainer}>
            <div className={styles.control}><p>BACK: </p> <Link to="/home">HOME</Link></div>
            <div className={styles.control}><p>{shortcutEditMode ? "SAVE" : "ADD"}: </p><button type="submit">{shortcutEditMode ? "SAVE" : "ADD"}</button></div>
        </div>

         <div className={styles.controlContainer}>
            <div className={styles.control}><p>EXIT: </p> <Link to="/">MENU</Link></div>
            <div className={styles.control}><p>CLEAR: </p><button onClick={ clearForm }>CLEAR</button></div>
        </div>

        <div className={styles.resultTextContainer}><h4 className={styles.resultText} id='resultText'>{resultText}</h4></div>
        </form>
      </div>  
    );
}

export default Add