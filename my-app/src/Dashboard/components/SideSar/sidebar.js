import {useState} from "react";
import classes from "./sidebar.module.css";

import SidebarItem from "./sidebar_item/sidebarItem";

function Sidebar({username , avatar}) {
    
    let [activeItem ,set_activeItem] = useState(window.location.pathname) 
    console.log('activeItem==>',activeItem)
    return (
        <div className={classes.container}>
            <div style={{textAlign:'center'}}>
                <img style={{borderRadius:'50%'}} src={`https://www.gravatar.com/avatar/${avatar}`} alt='profile ' />
                <h2 style={{textAlign:'center'}}>{username}</h2>
            </div>
            <ul className={classes.sidebar_list}>
        
                <SidebarItem name='Home' path='/' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
                <SidebarItem name='All employees' path='/dashboard/allEmployees' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
                <SidebarItem name='Registered employees' path='/dashboard/registeredUsers' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
                <SidebarItem name='Absent employees' path='/dashboard/AbsentEmployees' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
                <SidebarItem name='recieved requests' path='/dashboard/recievedRequests' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
            
                <SidebarItem name='Send message' path='/dashboard/sendMessage' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
            </ul>
        </div>
    )
}

export default Sidebar