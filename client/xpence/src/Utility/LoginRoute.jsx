import { Navigate} from 'react-router-dom';

function LoginRoute({destination}) {
    const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
    console.log('LoginRoute: ' + loginDetails.username + loginDetails.password);

    if(!loginDetails){
        return <Navigate to="/login" />
    }
  return destination;
}

export default LoginRoute