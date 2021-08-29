import {useEffect , useState} from "react";
import {connect , useSelector} from "react-redux";
import classes from "./history.module.css";
import {SET_HISTORY} from "../../../store/actions/actions";
import getAsync from "../../../store/actions/getAsync";
import HistoryTable from "../historyTable/historyTable";
import Spinner from '../UI/spinner/spinner';
const Months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

function History(props){
    let {dispatch} = props;
    let today = new Date()
    const [fullYear , setFullYear] = useState(new Date().getFullYear())   
    const [currentMonth , setCurrentMonth] = useState(new Date().getMonth())    
    const loading = useSelector(state => state.loading)

    useEffect(()=>{
       dispatch(getAsync(`/user/allrecords?year=${fullYear}&month=${currentMonth}` , SET_HISTORY))    
    },[dispatch , fullYear , currentMonth])
    
    const getPrevMonth =()=>{
        let prevMonth = currentMonth - 1
        if(prevMonth <0){
            prevMonth =11;
            setFullYear(fullYear-1)
        }
        setCurrentMonth(prevMonth)
    } 
    
    const getNextMonth =()=>{
        let nextMonth = currentMonth + 1
        if(nextMonth >11){
            nextMonth =0;
            setFullYear(fullYear+1)
        }
        setCurrentMonth(nextMonth)
    } 
    
    // if(!props.history[0]){
    //     return <h1 style={{textAlign:'center'}}>you have no history</h1>
    // }
    // if(loading){
    //     return <Spinner size='25px' color='blue'/>
    // }
    console.log('hitoryyy' , props.history)
    return(
        <div className={classes.container}> 
            
            <h1 className={classes.label} style={{textAlign:'center'}}>{fullYear} - {Months[currentMonth]}</h1>
           <div className={classes.controllerContainer} >
            
            <h3 className={classes.controller} style={{cursor:'pointer',
                visibility:today.getMonth() ===currentMonth &&today.getFullYear()===fullYear ?
                 'hidden' : 'visible'}} 
                onClick={getNextMonth} >next month
            </h3>
            <div style={{textAlign:'center',display:'flex' , alignItems:'center'}}>
                <Spinner show={loading} size='5px'  margin='auto'/>
            </div> 

            <h3 className={classes.controller} style={{cursor:'pointer'}} onClick={getPrevMonth} >previous month</h3>

            </div>
            <HistoryTable history={props.history}/>
        </div> 
    )
}
const mapStateToprop =(state)=>({
    history :state.history    
})

export default connect(mapStateToprop)(History)