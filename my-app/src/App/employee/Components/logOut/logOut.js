import {useEffect ,useState, Fragment } from "react";
import {useDispatch , useSelector} from "react-redux";
import Timer from "../UI/timer/timer";
import Spinner from "../UI/spinner/spinner";
import classes from './logOut.module.css'
import myPostAsyncFunction from "../../../store/actions/myPostAsyncFunction";
import myAsyncFunction from "../../../store/actions/myAsyncFunction";

function LogOut(props){
    let date1 =new Date()
    let date =new Date().getTimezoneOffset()
    let today_record = null ; 
    let user = useSelector(state => state.user)
    let dispatch = useDispatch();
    let [Attendance ,setAttendance] = useState(null)
    const [isAllowed , setAllowed] = useState(true)
    const [loading , setLoading] = useState(false)
        useEffect(()=>{
            setLoading(true)
            myAsyncFunction('/user/register').then((s)=>{
                setAttendance(s)
                setLoading(false)
            }).catch(e=>{setLoading(false)})
        },[dispatch])

        let register =()=>{
            setLoading(true)

            myPostAsyncFunction('/user/registerOut' ,{date ,hours:date1.getHours() ,minutes:date1.getMinutes()}).then((s)=>{
                setAttendance(s)
                setLoading(false)
            }).catch(e=>{setLoading(false)})
        }

        if(Attendance){
                 today_record = new Date(Attendance.LeftAt)
        }
    if(loading && !Attendance){
            return  <Spinner show margin='auto'/>
    }
    if(Attendance ===null){
            return <h1 style={{width:'100%' , textAlign:'center'}}>you need to register in first</h1>
    }
        
    return(
    <div className={classes.container}>
        {Attendance?.LeftAt ?
                <div>
                <h1 style={{textAlign:'center'}}>you already registered out today</h1>
                 <div className={classes.box}>
                 <img style={{borderRadius:'50%',width:'80px',height:'80px',border:'2px solid #1A92DC' }} src={`/image/${user.name}.png`} alt='profile ' />
                <h2 style={{textAlign:'center'}}>{Attendance.name}</h2>
                <h2>
                    <span>{today_record.getHours()>12 ?
                        today_record.getHours()-12 +':'+today_record.getMinutes() +' PM'
                        :
                        today_record.getHours()+':'+today_record.getMinutes() +' AM'    
                }</span>
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
                <div style={{textAlign:'center' , flex:'0 0 25%'}}>
                    <h1>Time at work </h1>
                    <h2>
                    <Timer setAllowed={setAllowed} xx={Attendance.AttendAt}/>
                    </h2>
                </div>
                {/* <Spinner show={true} margin='auto'/> */}
                <Spinner show={loading} margin='50px auto'/>

                <div style={{textAlign:'center'}}>
                    <button disabled={isAllowed} onClick={register} style={{backgroundColor:isAllowed?'gray':'',border:0,width:'50%', margin:'50px auto'}}>Regiester</button>
                </div>
                <div style={{flex:'0 0 25%'}}>
                    <h2 style={{textAlign:'center'}}>you can register out at
                            {'  '+ new Date(+new Date(Attendance?.AttendAt)+8*60*60*1000).toLocaleTimeString()} 
                    </h2>
                </div>
                </Fragment>
            
                 
        }
    </div>

    )
} 

export default LogOut