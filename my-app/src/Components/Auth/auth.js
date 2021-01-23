import {
    Switch,
    Route
  } from "react-router-dom";
  
import Login from './Login/login'
import Signup from './SignUp/signup'

function Auth() {
    
    return(
        <Switch>
            <Route path='/login' render={props=><Login {...props}/>}></Route>
            <Route path='/signup' render={props=><Signup {...props}/>}></Route>
        </Switch>
    )
}

export default Auth