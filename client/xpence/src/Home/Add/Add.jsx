import styles from './Add.module.css';
import {Link} from 'react-router-dom'


function Add (){
    function handleSubmit(){

    }
    return(
      <div className={styles.pageContainer}>
        <div className={styles.header}>
            <Link to={'/'}><p>__XPENCE__</p></Link>
        </div>
        <form onSubmit={handleSubmit()}>
            <input type="text" name="title"/>
            <input type="text" name="description"/>
            <input type="number" name="amount"/>
        <div>
            <label htmlFor="exit"><p>Exit</p> <Link>:Menu</Link></label>
             <label htmlFor="add"><p>Add</p> <button type="submit">Add</button></label>

        </div>
        </form>
      </div>  
    );
}

export default Add