import classes from "./getUser.module.css";
import {useEffect , useRef , useState} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import HistoryTable from "../../../Components/historyTable/historyTable";
import Profile from "../../../Components/Profile/profile";

import getAsync from "../../../store/actions/getAsync";
import {SET_MY_USER} from "../../../store/actions/actions";
let myDivs = ['profile' ,'history' , 'messages']
function GetUser({myUserInfo , getMyUser}) {
    const {id} = useParams()
    const holder = useRef(null)
    const [activeDiv , setActiveDiv] = useState(0)
    useEffect(()=>{
        holder.current?.scroll(0, holder.current.scrollHeight)  
    })

    let submit = ()=>{
        if(activeDiv=== 2){
            setActiveDiv(0)
            return;
        }
           setActiveDiv(activeDiv+1)
        
    }
    useEffect(()=>{
        console.log('id')
        getMyUser(id)
        console.log(id)
    },[id , getMyUser])
    console.log('myUserInfo' , activeDiv)
    return(
        myUserInfo ? 

        <div className={classes.container}>
            {activeDiv ===0 ? <Profile admin={true} user={myUserInfo.employee}/> : ''} 
            
            {activeDiv ===1 ? <HistoryTable history={myUserInfo.history ||[]}/> : ''} 
            
            {activeDiv ===2 ? 
            <div  ref={holder} className={classes.holder}>
                {
                myUserInfo.conversation.messages?    
                myUserInfo.conversation.messages.map((conv)=>{
                            return(<div className={classes.box}>
                                <p>{conv.content}</p>
                                <p className={classes.date}>{new Date(conv.date).toLocaleString()}</p>
                            </div>)
                    })
                    :'haha'
                }
            </div>         
            :''}
            <button onClick={submit} style={{width:'50%',height:'45px' , margin:'10px'}}>Go to {myDivs[activeDiv+1] || 'profile'}</button>

        </div>
        :''

    )
    
}
const mapStateToProps = (state)=>({
        myUserInfo : state.myUserInfo
})
const mapDispatchToProps = (dispatch)=>({
    getMyUser : (id)=>dispatch(getAsync('/dashboard/employee/'+id , SET_MY_USER))
})

export default connect(mapStateToProps , mapDispatchToProps)(GetUser)