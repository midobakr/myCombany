import {useEffect , Fragment} from "react";
import {Switch ,Route,Redirect } from "react-router-dom";
import {io} from "socket.io-client";
import {sendSubscription} from '../../../subscription';
import {useSelector ,useDispatch} from 'react-redux'


import Register from "../../Components/register/register";
import Spinner from "../../Components/UI/spinner/spinner";
import RegisterOut from "../../Components/logOut/logOut";
import History from "../../Components/history/history";
import Profile from "../../Components/Profile/profile"; 
import Send from "../../Components/Send/send";
import classes from "./home.module.css";
// import Notification from "../../../Components/Notification/Notification";
import {INC_UNSEEN_MSGS} from '../../../store/actions/actions' ;
import SideBar from "../../Components/SideSar/sidebar";
import getAsync from "../../../store/actions/getAsync";
import {SET_USER} from "../../../store/actions/actions";


function Home (){
    const dispatch = useDispatch()
    const user = useSelector(state =>state.user)

    useEffect(()=>{
        console.log('did mounttttt')
        dispatch(getAsync('/user/me' ,SET_USER))

            if ('serviceWorker' in navigator) { 
                navigator.serviceWorker.register('/serverWorker.js', {
                scope: '/',
                }).then(()=>{
                sendSubscription()  
                console.log('working every timeeeeeeeeeeeeeeee')});
            } 
        
    },[dispatch])
    
    useEffect(() => {
        let socket = ''
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

            socket.on('recieve_message_from_admin', (m) => {
                if (!m.fromMe) {
                    document.querySelector('#audio').play()
                    dispatch({type: INC_UNSEEN_MSGS})

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
            }        }
    }, [dispatch , user._id])
    
    if(!user._id){
        return <Spinner show/>
    }
    

        return(
            <Fragment>
                <Switch>

                <Route path='/'>
                <div className={classes.container}>

                <div className = {classes.body}>
                <SideBar 
                    username={user.name} 
                    avatar={user.avatar}
                    />

                    <Route exact path='/notification'>
                        {/* <Notification notification={user.notification}/> */}
                    </Route>
                    <Route exact path='/'>
                        <Profile user={user} />
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
                    <Route  path='/'><Redirect to='/' /></Route>
                    </Route>
                    </Switch>

            </Fragment>

        )

    

}

export default Home