import classes from "./getUser.module.css";
import {useEffect , useState} from "react";
import {useParams , useLocation} from "react-router-dom";

import Spinner from "../../../employee/Components/UI/spinner/spinner";
import HistoryTable from "../../../employee/Components/historyTable/historyTable";
import TextUser from "../textUser/textUser";
import Profile from "../../../employee/Components/Profile/profile";

import myAsyncFunction from "../../../store/actions/myAsyncFunction"; 

let myDivs = ['profile' ,'history' , 'messages'] 

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function GetUser() {
    const {id} = useParams();
    let active_section = useQuery().get('active') ||0

    const [activeDiv , setActiveDiv] = useState(+active_section)
    const [user , setUser] = useState(null)
    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)
         
    let submit = ()=>{
        if(activeDiv=== 2){
            setActiveDiv(0)
            return;
        }
           setActiveDiv(activeDiv+1)
        
    }
    useEffect(()=>{
        setLoading(true)
        myAsyncFunction('/dashboard/employee/'+id).then((res)=>{
            setUser(res)
            setLoading(false)
        }).catch(e=>{
            setError(e.errors[0].msg)
            setLoading(false)
        })

    },[id])

    if(error){
        return <h1 style={{margin:'auto'}}>{error}</h1>
    }

    if(loading){
        return <div style={{margin:'auto'}}>
            <Spinner show margin='auto'/>
        </div>
    }
    return(
        user ? 
        <div className={classes.container}>
    
        {activeDiv ===0 ?<div className={classes.profileContainer}>
                            <Profile admin={true} user={user.employee}/>
                            </div> : ''} 
                                    
            {activeDiv ===1 ? <HistoryTable history={user.history ||[]}/> : ''} 
            
            {activeDiv ===2 ?
            <div className={classes.textContainer}>
            <TextUser ID={id} myUser={user.employee}/>
            </div>
             :''}
            <button onClick={submit}className={classes.button}>Go to {myDivs[activeDiv+1] || 'profile'}</button>

        </div>
        :''

    )
    
}

export default GetUser