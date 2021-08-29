import {useState , useEffect , useRef} from "react";
import {useDispatch , useSelector} from 'react-redux'
import {Link} from "react-router-dom";

import Spinner from '../UI/spinner/spinner';
import SidebarItem from "./sidebar_item/sidebarItem";
import {REMOVE_TOKEN} from '../../../store/actions/actions' 
import {SET_UNSEEN_MSGS} from '../../../store/actions/actions' 
import {deleteSubscription} from '../../../subscription' 
import myAsyncFunction from '../../../store/actions/myAsyncFunction' 

import classes from "./sidebar.module.css";

import historyIcon from "./icons/history.png"
import profileIcon from "./icons/profile.png"
import registerIcon from "./icons/register.png"
import leaveIcon from "./icons/leave.png"
import exitIcon from "./icons/exit.png" 
import message from "./icons/message.png"

function Sidebar({username , avatar}) {
    let [activeItem ,set_activeItem] = useState(window.location.pathname) 
    let unSeenMSGs = useSelector(state=>state.unseenMSGS)
    let nav = useRef(null)
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    const logOut =async()=>{
        setLoading(true)
        await deleteSubscription()
        dispatch({type:REMOVE_TOKEN})

    }
    useEffect(()=>{
        myAsyncFunction('/conversation/unSeenMSGs').then(res=>{
            dispatch({type:SET_UNSEEN_MSGS, payload:res})
        })
    },[dispatch]) 
    
    
    return (
        <div className={classes.container}>
            <div className={classes.info}>
                <img className={classes.image}  
                src={`/image/${username}.png`} 
                alt={`https://www.gravatar.com/avatar/${avatar}`} 
                />
                <span  className={classes.name} style={{verticalAlign:'middle',textAlign:'center' , color:'white',marginLeft:'10px'}}>{username}</span>
            </div>
            <ul  ref={nav} className={classes.sidebar_list}>
                <SidebarItem name='My Profile' path='/' 
                    setActive ={set_activeItem} theActiveItem={activeItem}
                    icon ={profileIcon} 
                />
                {/* <SidebarItem name='notification'  content ={newNotifications} path='/notification' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
                 */}
                <SidebarItem name='My History' path='/myhistory' 
                setActive ={set_activeItem} theActiveItem={activeItem}
                icon = {historyIcon} 
                />
            
                <SidebarItem name='register' path='/Register' 
                setActive ={set_activeItem} theActiveItem={activeItem}
                icon = {registerIcon}
              /> 
            
                <SidebarItem name='Leave' path='/leave' 
                setActive ={set_activeItem} theActiveItem={activeItem}
                icon = {leaveIcon}
              />
            
                <SidebarItem name='send' path='/send' 
                setActive ={set_activeItem} theActiveItem={activeItem}
                icon = {message}
                unSeenMSGs={unSeenMSGs>0? unSeenMSGs : ''}
          />
          
            
            <div className={classes.logOut} onClick={logOut}>
                    <Link to='/'> <img src={exitIcon} alt=''></img></Link>
                    <Spinner show={loading} margin='auto' size='3px' color='white'/>
                </div>
            </ul>
        </div>
    )
}

export default Sidebar 