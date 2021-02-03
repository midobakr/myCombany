import {useEffect} from 'react'
import {Link} from "react-router-dom";
import {useDispatch ,useSelector} from "react-redux";
import classes from './MyInbox.module.css'
import getAsync from "../../../store/actions/getAsync";
import {SET_MYINBOX} from "../../../store/actions/actions";

function MyInbox() {
   const dispatch = useDispatch();
   const myInbox = useSelector(state =>state.myInbox);
    
   useEffect(()=>{
            dispatch(getAsync('/dashboard/getMyInbox',SET_MYINBOX))

    },[dispatch])
    console.log('myInbox==>' , myInbox)
    return(
        <div className={classes.container}>
            {myInbox[0] ?
                    myInbox.map((record)=>{
                    let today_record = new Date(record.lastUpdatedAt)

                        return(
                            
                 <Link to={`/dashboard/employee/${record.userOne}`} className={classes.box}>
                <img style={{borderRadius:'50%' , width:'80px' , height:'80px'}} src={`https://www.gravatar.com/avatar/${record.avatar}`} alt='profile ' />
                <h2 style={{textAlign:'center' , width:'5em'}}>{record.userName}</h2>
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
                 </Link> 
                        )
                    })
                
            :
            <h3 style={{textAlign:'center ' , margin:'auto'}}>there is no Users registered on that day</h3>
                
            
                 
        }

    </div>
    )

}


export default MyInbox