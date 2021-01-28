import  {Component} from "react";
import {Switch ,Route} from "react-router-dom";
import {connect} from "react-redux";
import classes from "./home.module.css";
import SideBar from '../../components/SideSar/sidebar';
import Nav from "../../../Components/nav/nav";
import getAsync from "../../../store/actions/getAsync";
import AllUsers from "../../components/allUsers/allUsers";
import GetUser from "../../components/getUser/getUser";
import RegisterUsers from "../../components/registeredUsers/registeredUsers";
import {SET_USER} from "../../../store/actions/actions";

class Home extends Component {
    componentDidMount(){
        this.props.dispatch(getAsync('/dashboard/me' ,SET_USER))

    }
    render(){
        return(
            <div className={classes.container}>
                <Nav/>
                <div className = {classes.body}>
                {/* <SideBar /> */}
                <SideBar username={this.props.user.name} avatar={this.props.user.avatar}/>
                <Switch>
                    <Route exact path='/'>
                    </Route>
                    <Route  path='/dashboard/allEmployees'>
                            <AllUsers/>
                    </Route>
                    <Route  path='/dashboard/employee/:id'>
                        <GetUser/>
                    </Route>
                    <Route  path='/dashboard/registeredUsers'>
                        <RegisterUsers/>
                    </Route>
                    <Route  path='/leave'>
                    </Route>
                    <Route  path='/send'>
                    </Route>
                    {/* <Route  path='/'><Redirect to='/' /></Route> */}
                </Switch>
                </div>

            </div>)
    }

}
const mapStateToprop =(state)=>({
    user : state.user    
})

export default connect(mapStateToprop)(Home)