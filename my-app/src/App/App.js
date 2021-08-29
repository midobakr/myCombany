import {useEffect} from 'react';
import {Switch,Route} from "react-router-dom";
import {connect} from "react-redux";

import Employee from "./employee/Containers/Home/home";
import Admin from "./Dashboard/containers/Home/home";
import Login from './employee/Components/Auth/Login/login' 
import Signup from './employee/Components/Auth/SignUp/signup'
import Guest from './employee/Components/Auth/guest/guest'

import {SET_TOKEN , SET_STATUS} from './store/actions/actions'
import getAsync from './store/actions/getAsync'


import './App.css';

function  App ({loading ,token , status , set_token , getStatus}){
  
  
 let Components =[]
  
 useEffect(()=>{
    let token = localStorage.getItem('token'); 

    if(token){
      set_token(token)
    
    }
  },[set_token])
  useEffect(()=>{ 
    if(token){
     getStatus()
    }
  },[token , getStatus])
  
  
  
    if(localStorage.getItem('token')){
      if(status ==='admin'){
        Components =[<Route key={1}  path='/'><Admin/></Route>]                    
      }else if(status ==='employee'){
        Components =[<Route key={1}  path='/'><Employee/></Route>]
      }
    }else{
          Components=[
                      <Route key={2} path='/signup' render={props=><Signup {...props}/>}></Route>
                      ,
                      <Route key={3}  path='/guest' render={props=><Guest/>}></Route>
                      ,
                      <Route key={1}  path='/' render={props=><Login {...props}/>}></Route>
          ]

    }

      return (
        <div className="App">

            <Switch>
              {Components.map(C=>C)}
              </Switch>   
        </div>
      );
}


let mapStateToprops =(state)=>({
  token : state.token,
  status : state.status.status,
})
let mapDispatchToprops =(dispatch)=>({
  set_token : (token)=>dispatch({
    type : SET_TOKEN,
    payload : token
  }),
  getStatus :()=> dispatch(getAsync('/status',SET_STATUS))

})


export default connect(mapStateToprops,mapDispatchToprops)(App);
