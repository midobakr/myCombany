import {useEffect , Fragment} from "react";
import {connect} from "react-redux";
import Timer from "../UI/timer/timer";
import classes from './attend.module.css'
import {SET_ATTENDANCE} from "../../store/actions/actions";
import postAsync from "../../store/actions/postAsync";
import getAsync from "../../store/actions/getAsync";

function Attend(props){
    let date1 =new Date()
    let date =new Date().getTimezoneOffset()
    let today_record = null ;
    let {dispatch} = props;
     
        useEffect(()=>{
            console.log('hooooooooooo======>',props.Attendance)
            console.log('hooooooooooo======>',!!props.Attendance)
            
        },[props.Attendance])
        useEffect(()=>{
            dispatch(getAsync('/user/register',SET_ATTENDANCE))
        },[dispatch,date]) 
        let register =()=>{
            props.dispatch(postAsync('/user/register' ,{date ,hours:date1.getHours() ,minutes:date1.getMinutes()},SET_ATTENDANCE))
        
        }
        if(props.Attendance){
             today_record = new Date(props.Attendance.AttendAt)
            // today_record.setHours(0)
        }
    return(
    <div className={classes.container}>
        {props.Attendance ?
                <div>
                <h1 style={{textAlign:'center'}}>you already registered today</h1>
                 <div className={classes.box}>
                <img style={{borderRadius:'50%'}} src={`https://www.gravatar.com/avatar/${props.user.avatar}`} alt='profile ' />
                <h2 style={{textAlign:'center'}}>{props.Attendance.name}</h2>
                <h2>
                    <span>{today_record.getHours()>12 ?
                        today_record.getHours()-12 +':'+today_record.getMinutes() +' PM'
                        :
                        today_record.getHours()+':'+today_record.getMinutes() +' AM'    
                }</span>
                    {/* <span>:{today_record.getMinutes()}</span> */}
                </h2>
                <h2>
                    <span>{today_record.getFullYear()}</span>
                    <span>/{today_record.getMonth()+1}</span>
                    <span>/{today_record.getDate()}</span>
                </h2>
                 </div> 
                </div>   
            :
                <Fragment>
                <h1 style={{textAlign:'center'}}>
                <Timer/>
                </h1>
                <div style={{display:'flex' , justifyContent:'center' , alignItems:'center',flex:'1 0 0'}}>
                    <button onClick={register} style={{width:'50%', margin:0}}>Regiester</button>
                </div>
                </Fragment>
            
                 
        }
    </div>

    )
} 
const mapStateToprop =(state)=>({
    Attendance :state.Attendance  ,
    user :state.user  
})

export default connect(mapStateToprop)(Attend)