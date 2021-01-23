import {Link} from "react-router-dom";

import classes from "./sidebarItem.module.css";

function sidebarItem(props) {
    
    return(
        <li className={classes.sidebar_item}
                onClick={()=>{props.setActive(props.path)}} 
                style={props.theActiveItem===props.path?{backgroundColor:'red'}:{}}>
                   <Link className={classes.Link} to={props.path}>{props.name}</Link>
        </li>
    )
}

export default sidebarItem
