import {useEffect , useState} from 'react'
import {connect} from "react-redux";
import classes from './registeredUsers.module.css'
import getAsync from "../../../store/actions/getAsync";
import {SET_REGISTEREDUSERS} from "../../../store/actions/actions";

let days = ['Sunday' , 'Monday' , 'Tuesday' , 'Wendsday','Thrusday','Friday' , 'Saturday']

function RegisteredUsers({registeredUsers , getRegisteredUsers}) {
    let todayDate = new Date().toJSON().split('T')[0]
    let [selectedDate , setSelectedDate] = useState(todayDate)
    useEffect(()=>{
        getRegisteredUsers(selectedDate)
    },[getRegisteredUsers , selectedDate])
    
    const getPreviousDayDate =(num)=>{
        const today = new Date(selectedDate)
        const yestarday  =new Date(today.setDate(today.getDate()-num))
        return yestarday.toJSON().split('T')[0]
    }
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
        {registeredUsers[0] ?
                    registeredUsers.map((record)=>{
                    let today_record = new Date(record.AttendAt)

                        return(
                            
                 <div className={classes.box}>
                <img style={{borderRadius:'50%' , width:'80px' , height:'80px'}} src={`https://www.gravatar.com/avatar/${record.avatar}`} alt='profile ' />
                <h2 style={{textAlign:'center' , width:'5em'}}>{record.name}</h2>
                <h2>
                    <span>{today_record.getHours()>12 ?
                            today_record.getHours()-12 +':'+
                            (today_record.getMinutes()<10?'0':'') + today_record.getMinutes() 
                            +' PM'
                        :
                            today_record.getHours()+':'+
                            (today_record.getMinutes()<10?'0':'') + today_record.getMinutes()  
                            +' AM'    
                    }
                    </span>
                </h2>
                <h2>
                    <span>{today_record.getFullYear()}</span>
                    <span>/{today_record.getMonth()+1}</span>
                    <span>/{today_record.getDate()}</span>
                </h2>
                 </div> 
                        )
                    })
                
            :
            <h3 style={{textAlign:'center ' , margin:'auto'}}>there is no Users registered on that day</h3>
                
            
                 
        }
    </div>
    )

}
const mapStateToProps = (state)=>({
    registeredUsers : state.registeredUsers
})
const mapDispatchToProps = (dispatch)=>({
getRegisteredUsers : (todayDate)=>dispatch(getAsync('/dashboard/registeredUsers/'+todayDate , SET_REGISTEREDUSERS))

})


export default connect(mapStateToProps , mapDispatchToProps)(RegisteredUsers)