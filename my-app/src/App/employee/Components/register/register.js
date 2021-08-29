import {useEffect,useState , Fragment} from "react";
import { useDispatch , useSelector} from "react-redux";
import Timer from "../UI/timer/timer";
import Spinner from "../UI/spinner/spinner";
import classes from './attend.module.css'

import myPostAsyncFunction from "../../../store/actions/myPostAsyncFunction";
import myAsyncFunction from "../../../store/actions/myAsyncFunction";

function Attend(props){
    let date1 =new Date()
    let date =new Date().getTimezoneOffset()
    let today_record = null ;
    let user = useSelector(state => state.user)
    let dispatch = useDispatch();
    let [Attendance ,setAttendance] = useState(null)
    const [loading , setLoading] = useState(false)
        useEffect(()=>{
            setLoading(true)
            myAsyncFunction('/user/register').then((s)=>{
                console.log('record \n' , s)
                setAttendance(s)
                setLoading(false)
            }).catch(e=>{setLoading(false)})
        },[dispatch])

        let register =()=>{
            setLoading(true)
            myPostAsyncFunction('/user/register' ,{date ,hours:date1.getHours() ,minutes:date1.getMinutes()}).then((s)=>{
                setAttendance(s)
                setLoading(false)
            }).catch(e=>{setLoading(false)})
        }
        if(Attendance){
             today_record = new Date(Attendance.AttendAt)
        }
    if(loading && Attendance){
        <Spinner show margin='auto'/>
    }     
    return(
    <div className={classes.container}>
        {Attendance ?
                <div>
                <h1 style={{textAlign:'center'}}>you already registered today</h1>
                 <div className={classes.box}>
                <div style={{textAlign:'center'}}>
                <img style={{borderRadius:'50%',width:'80px',height:'80px',border:'2px solid #1A92DC' }} src={`/image/${user.name}.png`} alt='profile ' />
                </div>
                <h2 style={{textAlign:'center'}}>{Attendance.name}</h2>
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
                <Timer normalMode />
                </h1>
                <div style={{display:'flex' ,flexDirection:'column', justifyContent:'flex-start' , alignItems:'center',flex:'1 0 0'}}>
                    
                     <Spinner show={loading} margin='125px auto'/>
                    <button onClick={register} style={{width:'50%', margin:0 , border:0}}>Regiester</button>
                </div>
                </Fragment>
            
                 
        }
    </div>

    )
} 

export default Attend