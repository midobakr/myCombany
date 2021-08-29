import {useEffect , useState} from 'react'
import {Link} from "react-router-dom";

import classes from './inbox.module.css'
import Spinner from '../../../employee/Components/UI/spinner/spinner'

import myAsyncFunction from "../../../store/actions/myAsyncFunction";

//getMyInbox
export default function Inbox(){
    let [myInbox , setMyInbox] = useState([])

    useEffect(()=>{ 
        myAsyncFunction('/dashboard/getMyInbox').then(res=>{
            setMyInbox(res)
            // setUsersArray(res)
        })
    },[])
    if(!myInbox[0]){
        return <Spinner show margin='auto'/>
    }
    return(<div className={classes.container}>
            {myInbox.map(chat=><div>
                <Link to={`/admin/sendMessage/${chat.userOne}`} className={classes.box}>
                            <div style={{overflow:'hidden',height:'100%' ,width:'30%', display:'flex',flexDirection:'column',justifyContent:'center'}}>
                               <h2 style={{marginTop:'auto'}}>
                               {chat.messages[0]?.content}
                               
                               </h2> 
                                <p className={classes.date}>
                                    {new Date(chat.lastUpdatedAt).getDay()===new Date().getDay()?
                                    'today  '+new Date(chat.lastUpdatedAt).getHours()+':'+new Date(chat.lastUpdatedAt).getMinutes()
                                     :
                                     new Date(chat.lastUpdatedAt).toLocaleString()}
                                </p>

                            </div>
                            <h1 style={{color:'red'}}>{chat.MangerUnseenMSGS || ''}</h1>
                            <div  style={{display:'flex' ,flexDirection:'column',height:'100%',padding:'10px 0', justifyContent:'space-around' , paddingRight:'10px'}}>
                            <img  className={classes.icon} style={{borderRadius:'50%'}} src={`/image/${chat.userName}.png`} alt='ff'/>
                                <span className={classes.name}>{chat.userName}</span>

                            </div>
                </Link>
            
            
            </div>)}
    </div>)
}