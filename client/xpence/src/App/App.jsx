import { Routes, Route} from 'react-router-dom'
import Landing from '../Landing/Landing.jsx'
import styles from './App.module.css';
import Login from '../Login/Login.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import About from '../About/About.jsx';
import Add from '../Home/Add/Add.jsx';
import Home from '../Home/Home.jsx';
import LoginRoute from '../Utility/LoginRoute.jsx';



function App() {
  return (
    <div className={styles.pageContainer}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home/>}/> 
        <Route path="/add" element={<Add/>}/>
      </Routes>
    </div>
  );
}

export default App