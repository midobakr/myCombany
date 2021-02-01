import {useEffect , useState } from 'react'
import {connect} from "react-redux";
import classes from './UnRegisterUsers.module.css'
import getAsync from "../../../store/actions/getAsync";
import {SET_ALL_USERS, SET_REGISTEREDUSERS} from "../../../store/actions/actions";

let days = ['Sunday' , 'Monday' , 'Tuesday' , 'Wendsday','Thrusday','Friday' , 'Saturday']

function RegisteredUsers({allUsers , getAllUsers, registeredUsers,getRegisteredUsers}) {
    let todayDate = new Date().toJSON().split('T')[0]
    let [selectedDate , setSelectedDate] = useState(todayDate)
    let [unRegisteredUsers , setUnRegisteredUsers] = useState([])
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
    },[allUsers , registeredUsers ])

    return(
        <div className={classes.container}>
            <div style={{display:'inline-block' , position:'relative'}}>
            <input max={todayDate} 
                   onChange={(e)=>{setSelectedDate(e.target.value)}} 
                   type='Date' 
                   Value={selectedDate} 
                   className={classes.dateInput}/>
            <div style={{position:'absolute' ,display:'flex',alignItems:'center', right:'40px', bottom:'0' , height:'30px'}}>{days[new Date(selectedDate).getDay()]}</div>
            </div>
           <div style={{display:'flex' ,justifyContent:'space-between' , width:'50%' , margin:'0 auto'}}>
            <h3 style={{cursor:'pointer',visibility:todayDate ===selectedDate ? 'hidden' : 'visible'}} onClick={()=>{setSelectedDate(getPreviousDayDate(-1))}} >next day</h3>
            <h3 style={{cursor:'pointer'}} onClick={()=>{setSelectedDate(getPreviousDayDate(1))}} >previous day</h3>

            </div>
        {unRegisteredUsers[0] ?
                    unRegisteredUsers.map((record)=>{
                        return(
                            
                 <div className={classes.box}>
                <img style={{borderRadius:'50%' , width:'80px' , height:'80px'}} src={`https://www.gravatar.com/avatar/${record.avatar}`} alt='profile ' />
                <h2 style={{textAlign:'center' , width:'5em'}}>{record.name}</h2>
            
                 </div> 
                        )
                })
                
            :
            <h3 style={{textAlign:'center ' , margin:'auto'}}>there is no Users unRegistered on that day</h3>
                
            
                 
        }
    </div>
    )

}
const mapStateToProps = (state)=>({
    allUsers : state.allUsers,
    registeredUsers : state.registeredUsers

})
const mapDispatchToProps = (dispatch)=>({
    getAllUsers :()=> dispatch(getAsync('/dashboard/allEmployees',SET_ALL_USERS)),
    getRegisteredUsers : (todayDate)=>dispatch(getAsync('/dashboard/registeredUsers/'+todayDate , SET_REGISTEREDUSERS))


})


export default connect(mapStateToProps , mapDispatchToProps)(RegisteredUsers)