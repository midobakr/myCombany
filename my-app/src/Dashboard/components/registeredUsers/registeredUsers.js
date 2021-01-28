import {useEffect} from 'react'
import {connect} from "react-redux";
import classes from './registeredUsers.module.css'
import getAsync from "../../../store/actions/getAsync";
import {SET_REGISTEREDUSERS} from "../../../store/actions/actions";

function RegisteredUsers({registeredUsers , getRegisteredUsers}) {
    
    useEffect(()=>{
        getRegisteredUsers()
    },[getRegisteredUsers])
    return(
        <div className={classes.container}>
        {registeredUsers[0] ?
                    registeredUsers.map((record)=>{
                    let today_record = new Date(record.AttendAt)

                        return(
                            
                 <div className={classes.box}>
                <img style={{borderRadius:'50%'}} src={`https://www.gravatar.com/avatar/${record.avatar}`} alt='profile ' />
                <h2 style={{textAlign:'center'}}>{record.name}</h2>
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
            <h1 style={{textAlign:'center'}}>there is no Users registered yet !!</h1>
                
            
                 
        }
    </div>
    )

}
const mapStateToProps = (state)=>({
    registeredUsers : state.registeredUsers
})
const mapDispatchToProps = (dispatch)=>({
getRegisteredUsers : (id)=>dispatch(getAsync('/dashboard/registeredUsers/' , SET_REGISTEREDUSERS))

})


export default connect(mapStateToProps , mapDispatchToProps)(RegisteredUsers)