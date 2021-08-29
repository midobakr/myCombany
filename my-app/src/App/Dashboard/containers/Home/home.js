import {useEffect} from "react";
import {Switch ,Route,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {io} from "socket.io-client";

import classes from "./home.module.css";
import SideBar from '../../components/SideSar/sidebar';
import AllUsers from "../../components/allUsers/allUsers";
import Inbox from "../../components/inbox/inbox";
import Profile from "../../../employee/Components/Profile/profile";
import GetUser from "../../components/getUser/getUser";
import RegisterUsers from "../../components/registeredUsers/registeredUsers";
import UnRegisterUsers from "../../components/UnRegisterUsers/UnRegisterUsers";
import SendMessage from "../../components/SendMessage/SendMessage";
import {sendSubscription} from "../../../subscription";
import getAsync from "../../../store/actions/getAsync";
import {INC_UNSEEN_MSGS , SET_USER} from "../../../store/actions/actions";
import Spinner from "../../../employee/Components/UI/spinner/spinner";

function Home ({user,dispatch , unseenMSGS}){
    useEffect(()=>{
        dispatch(getAsync('/dashboard/me' ,SET_USER))
        console.log('mounted')
        if ('serviceWorker' in navigator) { 
            navigator.serviceWorker.register('/serverWorker.js', {
            scope: '/',
            }).then(()=>{
            sendSubscription()  
            console.log('working every timeeeeeeeeeeeeeeee')});
        }
    },[dispatch])
    useEffect(() => {
        let socket =''
        if (user._id) {
            console.log('did updateeeeeeeeeeeee')

            const socket = io("/", {
            //  socket = io("http://192.168.1.8:3333/", {
                query: {
                    userId: user._id
                }
            });
            socket.off('recieve_message')
            socket.off('recieve_message_from_admin')

        
            socket.on('recieve_message', (m) => {
                if (!m.fromMe) {
                    document.querySelector('#audio').play()
                    dispatch({type: INC_UNSEEN_MSGS})
                    console.log('get it')
                }
            })

            dispatch({
                type: 'SET_DISPATCH',
                payload: socket
            })
        }
        return ()=>{
            if(socket){
                socket.emit('disconnection')
            }
        }
    }, [dispatch , user._id])
    console.log(user)
    if(!user._id){
        console.log('user._id')
       return <Spinner show margin='auto'/>
    }    
    return(
            <div className={classes.container}>
                <div className = {classes.body}>

                <SideBar username={user.name} avatar={user.avatar}/>
                <Switch>
                    <Route exact path='/'>
                        <Profile user={user}/>
                    </Route>
                    <Route  path='/admin/allEmployees'>
                            <AllUsers/> 
                    </Route>
                    <Route  path='/admin/employee/:id'>
                        <GetUser/>
                    </Route>
                    <Route  path='/admin/registeredUsers'>
                        <RegisterUsers/>
                    </Route>
                    <Route  path='/admin/AbsentEmployees'>
                    <UnRegisterUsers/>
                    </Route>
                    <Route  path='/admin/recievedRequests'>
                        <Inbox/> 
                    </Route>
                    <Route  path='/admin/sendMessage'>
                        <SendMessage/> 
                    </Route>
                    <Route  path='/'><Redirect to='/' /></Route>
                </Switch>
                </div>

            </div>)
    

}
const mapStateToprop =(state)=>({
    user : state.user
})

export default connect(mapStateToprop)(Home)