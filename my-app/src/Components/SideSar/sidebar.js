import {useState} from "react";
import classes from "./sidebar.module.css";

import SidebarItem from "./sidebar_item/sidebarItem";

function Sidebar({username , avatar}) {
    
    let [activeItem ,set_activeItem] = useState('/') 
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
            
                <SidebarItem name='My Profile' path='/myprofile' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
                <SidebarItem name='My History' path='/myhistory' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
                <SidebarItem name='Attendance registration' path='/Register' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
                <SidebarItem name='Leave' path='/leave' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
            
                <SidebarItem name='send' path='/send' 
                setActive ={set_activeItem} theActiveItem={activeItem}/>
            
            </ul>
        </div>
    )
}

export default Sidebar