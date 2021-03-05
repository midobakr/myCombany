import  {Component , Fragment} from "react";
import {Switch ,Route } from "react-router-dom";
import {connect} from "react-redux";

// import {sendSubscription} from '../../subscription';

import Dashboard from '../../Dashboard/containers/Home/home'
import Register from "../../Components/register/register";
import RegisterOut from "../../Components/logOut/logOut";
import History from "../../Components/history/history";
import Profile from "../../Components/Profile/profile";
import Send from "../../Components/Send/send";
import classes from "./home.module.css";
import Notification from "../../Components/Notification/Notification";
import  Nav from "../../Components/nav/nav";
import SideBar from "../../Components/SideSar/sidebar";
import getAsync from "../../store/actions/getAsync";
import {SET_USER} from "../../store/actions/actions";
class Home extends Component {
    componentDidMount(){
        this.props.dispatch(getAsync('/user/me' ,SET_USER))
            // if ('serviceWorker' in navigator) { 
            //     navigator.serviceWorker.register('/serverWorker.js', {
            //     scope: '/',
            //     }).then(()=>{
            //     sendSubscription()  
            //     console.log('working every timeeeeeeeeeeeeeeee')});
            // }
                
    }
    render(){
        return(
            <Fragment>
                <Switch>

                    <Route  path='/dashboard'>
                        <Dashboard/>
                    </Route>
                <Route path='/'>
                <div className={classes.container}>
                <Nav/>
                <div className = {classes.body}>
                <SideBar username={this.props.user.name} avatar={this.props.user.avatar}/>
                    <Route exact path='/'>
                        <Notification notification={this.props.user.notification}/>
                    </Route>
                    <Route  path='/myprofile'>
                        <Profile user={this.props.user}/>
                    </Route>
                    <Route  path='/myhistory'>
                        <History/>
                    </Route>
                    <Route  path='/Register'>
                        <Register/>
                    </Route>
                    <Route  path='/leave'>
                            <RegisterOut/>
                    </Route>
                    <Route  path='/send'>
                        <Send/>
                    </Route>
                </div>

            </div>
                    {/* <Route  path='/'><Redirect to='/' /></Route> */}
                    </Route>
                    </Switch>

            </Fragment>

        )

    }

}
const mapStateToprop =(state)=>({
    user : state.user    
})

export default connect(mapStateToprop)(Home)