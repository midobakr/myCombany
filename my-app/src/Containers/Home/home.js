import  {Component} from "react";
import {Switch ,Route , Redirect} from "react-router-dom";
import {connect} from "react-redux";

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

    }
    render(){
        return(
            <div className={classes.container}>
                <Nav/>
                <div className = {classes.body}>
                <SideBar username={this.props.user.name} avatar={this.props.user.avatar}/>
                <Switch>
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
                    <Route  path='/'><Redirect to='/' /></Route>
                </Switch>
                </div>

            </div>)
    }

}
const mapStateToprop =(state)=>({
    user : state.user    
})

export default connect(mapStateToprop)(Home)