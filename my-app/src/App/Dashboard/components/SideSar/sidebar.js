import {useEffect, useState} from "react";
import {useDispatch , useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import classes from "./sidebar.module.css";

import {deleteSubscription}  from '../../../subscription'
import {SET_UNSEEN_MSGS , REMOVE_TOKEN , SET_ERRORS}  from '../../../store/actions/actions'
import myAsyncFunction  from '../../../store/actions/myAsyncFunction'

import SidebarItem from "./sidebar_item/sidebarItem"; 
import exitIcon from "./icons/exit.png";
import peopleIcon from "./icons/people.svg";
import inboxICON from "./icons/inbox.svg";
import messageICON from "../../../employee/Components/SideSar/icons/message.png";
import Spinner from "../../../employee/Components/UI/spinner/spinner";
import profileIcon from "../../../employee/Components/SideSar/icons/profile.png";

function Sidebar({username , avatar}) {
    let unSeenMSGs = useSelector(state=>state.unseenMSGS)
    let dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    let pathName = window.location.pathname
    let pathNameArray = pathName.split('/')

    if(pathNameArray.length>3){
        pathNameArray.splice(-1)
        pathName= pathNameArray.join('/')
    }
    let [activeItem ,set_activeItem] = useState(pathName) 
  
    useEffect(()=>{
        myAsyncFunction('/dashboard/unSeenMSGs').then(res=>{
            dispatch({type:SET_UNSEEN_MSGS, payload:res})
            console.log('res==>', res)
        }).catch((e)=>{
            dispatch({type : SET_ERRORS,payload:e.errors[0]})

        }) 

    },[dispatch]) 
    const logOut =async()=>{
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
        setLoading(true)
        await deleteSubscription()
        dispatch({type:REMOVE_TOKEN})

    }
    return (
        <div className={classes.container}>
            <div className={classes.info}>
                <img className={classes.image} 
                src=
                {`/image/${username}.png`}
            alt={`https://www.gravatar.com/avatar/${avatar}`}
                />
                <span className={classes.name} style={{verticalAlign:'middle',textAlign:'center' , color:'white',marginLeft:'10px'}}>{username}</span>
            </div>
            <ul className={classes.sidebar_list}>
        
                <SidebarItem name='Home' path='/' 
                setActive ={set_activeItem}
                theActiveItem={activeItem}
                icon={profileIcon}
                color='white'
                />
            
                <SidebarItem name='My Employees' path='/admin/allEmployees' 
                setActive ={set_activeItem} theActiveItem={activeItem}
                color='white'
                icon={peopleIcon}
                />
            
                <SidebarItem name='Registered' path='/admin/registeredUsers' 
                setActive ={set_activeItem} theActiveItem={activeItem}
                color='green'
                icon={peopleIcon}
                />
            
                <SidebarItem name='Absent' path='/admin/AbsentEmployees' 
                setActive ={set_activeItem} theActiveItem={activeItem}
                color='red'
                icon={peopleIcon}
                />
            
                <SidebarItem name='Inbox' path='/admin/recievedRequests'  
                setActive ={set_activeItem} theActiveItem={activeItem}
                color='white'
                icon={inboxICON}
                unSeenMSGs={unSeenMSGs>0? unSeenMSGs : ''}

                
                />
            
            
                <SidebarItem name='Send message' path='/admin/sendMessage' 
                setActive ={set_activeItem} theActiveItem={activeItem}
                color='white'
                icon={messageICON}
                
                />
             
            <div className={classes.logOut}  > 
            <Link to='/'> <img style={{cursor:'pointer'}} onClick={logOut} src={exitIcon} alt=''></img></Link>
                    <Spinner show={loading}  margin='auto' size='3px' color='white'/>

            </div>
            </ul>
        </div>
    )
}

export default Sidebar