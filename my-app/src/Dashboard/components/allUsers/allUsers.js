import {useEffect} from 'react'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import getAsync from "../../../store/actions/getAsync";
import {SET_ALL_USERS} from "../../../store/actions/actions";
import classes from './allUsers.module.css';

function AllUsers({getAllUsers , allUsers}) {
    
    useEffect(()=>{
        getAllUsers()
    },[getAllUsers])
    return(
        <div  className={classes.dd}>
        {allUsers.map(m=>
                <Link to={`/dashboard/employee/${m._id}`} className={classes.box}>
                <div style={{display:'flex' , alignItems:'center' , paddingRight:'10px'}}>{m.name}</div>
                <img  style={{borderRadius:'50%'}} src={`https://www.gravatar.com/avatar/${m.avatar}`} alt='ff'/>
                </Link>
            )}
        
        </div>
    )
}
const mapStateToprop =(state)=>({
    allUsers : state.allUsers    
})
const mapDispatchToprop =(dispatch)=>({
    getAllUsers :()=> dispatch(getAsync('/dashboard/allEmployees',SET_ALL_USERS))
})

export default connect(mapStateToprop , mapDispatchToprop)(AllUsers) 