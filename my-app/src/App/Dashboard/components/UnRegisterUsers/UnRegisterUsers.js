import {useEffect , useState } from 'react'
import {connect} from "react-redux";

import Search from "../../../employee/Components/UI/search/Search";
import Spinner from "../../../employee/Components/UI/spinner/spinner";

import getAsync from "../../../store/actions/getAsync";
import {SET_ALL_USERS, SET_REGISTEREDUSERS} from "../../../store/actions/actions";

import classes from './UnRegisterUsers.module.css'

let days = ['Sunday' , 'Monday' , 'Tuesday' , 'Wendsday','Thrusday','Friday' , 'Saturday']

function RegisteredUsers({allUsers , getAllUsers, registeredUsers,getRegisteredUsers , loading}) {
    let todayDate = new Date().toJSON().split('T')[0]
    let [selectedDate , setSelectedDate] = useState(todayDate)
    let [unRegisteredUsers , setUnRegisteredUsers] = useState([])
    let [searchResult , setSearchResult] = useState([])

    function setResult(result){ 
        setSearchResult(result)
    }
    useEffect(()=>{
        getRegisteredUsers(selectedDate)
    },[getRegisteredUsers , selectedDate])
    
    useEffect(()=>{       
        getAllUsers()
    },[getAllUsers])
    
 
    const getPreviousDayDate =(num)=>{
        const today = new Date(selectedDate)
        const yestarday  =new Date(today.setDate(today.getDate()-num))
        return yestarday.toJSON().split('T')[0]
    }
   
    useEffect(()=>{
        
        const allRegisteredUsersId = registeredUsers.map((record)=>record.user_id)
        let unRegisteredUsersArray = allUsers.filter((user)=>!allRegisteredUsersId.includes(user._id))
        unRegisteredUsersArray = unRegisteredUsersArray.sort((a ,b)=>{
                if(a.name > b.name){return 1;}
                if(a.name < b.name){return -1;}
                return 0 ;
            })
            setUnRegisteredUsers(unRegisteredUsersArray)
            setSearchResult(unRegisteredUsersArray)
        
    },[allUsers , registeredUsers ])

    return(
        <div className={classes.container}>
            <Search action={setResult} fullArray={unRegisteredUsers}/>
            <div className={classes.container2}>
                    <h3 className={classes.label} style={{cursor:'pointer',visibility:todayDate ===selectedDate ? 'hidden' : 'visible'}} onClick={()=>{setSelectedDate(getPreviousDayDate(-1))}} >Next Day</h3>
                    <div style={{display:'inline-block' , position:'relative'}}>
                        <div className={classes.theDay}>{days[new Date(selectedDate).getDay()]}</div>
                        {/* <div style={{position:'absolute' ,display:'flex',alignItems:'center', right:'40px', bottom:'0' , height:'30px'}}>{days[new Date(selectedDate).getDay()]}</div> */}
                            <input max={todayDate} 
                                onChange={(e)=>{setSelectedDate(e.target.value)}} 
                                type='Date' 
                                Value={selectedDate} 
                                className={classes.dateInput}/>
                    </div>

                    <h3 className={classes.label} 
                    style={{cursor:'pointer'}} 
                    onClick={()=>{setSelectedDate(getPreviousDayDate(1))}} >
                        Previous Day</h3>
            </div>
        
            <div className={classes.recordsContainer}>
                {loading? <Spinner show margin='100px auto'/>: searchResult[0] ?
                            searchResult.map((record)=>{
                                return(    
                                    <div className={classes.box}>
                                        <div className={classes.name}>{record.name}</div>
                                        <img  className={classes.icon} style={{borderRadius:'50%'}} src={`/image/${record.name}.png`} alt='ff'/>   
                                    </div> 
                                )
                            })
                        
                    :
                    <h2 style={{textAlign:'center ' , margin:'auto'}}>there is no Users unRegistered on that day</h2>
                        
                    
                        
                }
            </div>
        </div>
    )

}
const mapStateToProps = (state)=>({
    allUsers : state.allUsers,
    registeredUsers : state.registeredUsers,
    loading:state.loading

})
const mapDispatchToProps = (dispatch)=>({
    getAllUsers :()=> dispatch(getAsync('/dashboard/allEmployees',SET_ALL_USERS)),
    getRegisteredUsers : (todayDate)=>dispatch(getAsync('/dashboard/registeredUsers/'+todayDate , SET_REGISTEREDUSERS))


})


export default connect(mapStateToProps , mapDispatchToProps)(RegisteredUsers)