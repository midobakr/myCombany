import {useEffect , useState} from 'react'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'

import Search from  "../../../employee/Components/UI/search/Search";
import Spinner from "../../../employee/Components/UI/spinner/spinner"; 
import getAsync from "../../../store/actions/getAsync";
import {SET_ALL_USERS} from "../../../store/actions/actions";

import classes from './allUsers.module.css';

function AllUsers({getAllUsers , allUsers , user}) {
    let [MyUsers, setMyUsers] = useState(allUsers)
    useEffect(() => {
        getAllUsers().then((r) => {
            setMyUsers(r)
        })
    }, [getAllUsers])

    function setResult(result){
        setMyUsers(result)
    }
    if(!allUsers[0]){
      return  <Spinner show margin='auto'/>

    }

    return(
        <div className={classes.container}>
            <Search action={setResult} fullArray={allUsers}/>
            <div className={classes.recordsContainer}>
                {MyUsers?.map(m=>
                        <Link to={`/admin/employee/${m._id}`} className={classes.box}>
                        <div style={{display:'flex' , alignItems:'center' , paddingRight:'10px'}}>{m.name}</div>
                        <img  className={classes.icon} style={{borderRadius:'50%'}} src={`/image/${m.name}.png`} alt='ff'/>
                        </Link>
                    )}
            </div>
        </div>
    )
}
const mapStateToprop =(state)=>({
    allUsers : state.allUsers    ,
    user : state.user
})
const mapDispatchToprop =(dispatch)=>({
    getAllUsers :()=> dispatch(getAsync('/dashboard/allEmployees',SET_ALL_USERS))
})

export default connect(mapStateToprop , mapDispatchToprop)(AllUsers) 