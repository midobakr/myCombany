import {useEffect} from "react";
import {connect} from "react-redux";
import classes from "./history.module.css";
import {SET_HISTORY} from "../../store/actions/actions";
import getAsync from "../../store/actions/getAsync";

const days = ['sunday' ,'monday','tuesday','wendthday','thrusday' ,'friday' , 'saturday']
function History(props) {
    let {dispatch} = props
    useEffect(()=>{
       dispatch(getAsync('/user/allrecords' , SET_HISTORY))    
    },[dispatch])
    if(!props.history[0]){
        return <h1>you have no history</h1>
    }
    return(
        <div className={classes.container}>
            <table>
            <tr>
                <th>date</th>
                <th>time of leaving</th>
                <th>time of arriving</th>

                <th>day</th>

            </tr>
            {
                props.history.map((record)=>{
                let today_record = new Date(record.AttendAt)
                let today_record2 = new Date(record.LeftAt)
            
                return(
                    <tr>
                        <td>
                                <span>{today_record.getFullYear()}</span>
                                <span>/{today_record.getMonth()+1}</span>
                                <span>/{today_record.getDate()}</span>
                            
                        </td>

                        <td>
                            <span>
                                {
                                  today_record2.getHours()?  
                                    today_record2.getHours()>12 ?
                                        today_record2.getHours()-12 +':'+today_record2.getMinutes() +' PM'
                                        :
                                        today_record2.getHours()+':'+today_record2.getMinutes() +' AM'    
                                   :'' 
                                }
                            </span>
                        </td>
                        <td>
                            <span>
                                {
                                    today_record.getHours()>12 ?
                                        today_record.getHours()-12 +':'+today_record.getMinutes() +'PM'
                                        :
                                        today_record.getHours()+':'+today_record.getMinutes() +'AM'    
                                 }
                            </span>
                        </td>

                        <td>{days[today_record.getDay()]}</td>

                    </tr>
                 )
                     
                })
            }
            </table>
        </div>
    )
}
const mapStateToprop =(state)=>({
    history :state.history    
})

export default connect(mapStateToprop)(History)