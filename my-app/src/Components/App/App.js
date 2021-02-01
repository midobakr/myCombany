import React, {Component} from 'react';
import {Switch,Route , Redirect, Link} from "react-router-dom";
import {connect} from "react-redux";

import Home from "../../Containers/Home/home";
import Login from '../Auth/Login/login'
import Signup from '../Auth/SignUp/signup'
import Backderop from "../UI/backdrop/backdrop";
import Model from "../UI/model/model";
import {SET_TOKEN , HIDE_BACKDROP} from '../../store/actions/actions'


import './App.css';

class  App extends Component {
    Components =[]
  
  componentDidMount(){

      let token = localStorage.getItem('token'); 
    if(token){
      this.props.set_token(token)
    }
  }
  
  
  render(){
    
    if(this.props.token){
        this.Components =[<Route  path='/'><Home/></Route>]
    }else{
    this.Components=[
                <Route path='/login' render={props=><Login {...this.props}/>}></Route>
                ,<Route path='/signup' render={props=><Signup {...this.props}/>}></Route>
                ,<Route path='/' >
                  <Link to='/login'>Log in</Link>
                </Route>
              ]

    }

      return (
        <div className="App">
                <Backderop show={this.props.showBackdrop}/>
                <Model errors={this.props.errors} loading={this.props.loading} hide={this.props.hideBackdrop} show={this.props.showBackdrop} content='it is working'/>

            <Switch>
              {this.Components.map(C=>C)}
              </Switch>   
        </div>
      );
    }
}

let mapStateToprops =(state)=>({
  token : state.token,
  showBackdrop : state.backdrop,
  loading : state.loading,
  errors : state.errors,


})
let mapDispatchToprops =(dispatch)=>({
  set_token : (token)=>dispatch({
    type : SET_TOKEN,
    payload : token
  }),
  hideBackdrop : ()=>{dispatch({type :HIDE_BACKDROP})},
})


export default connect(mapStateToprops,mapDispatchToprops)(App);
