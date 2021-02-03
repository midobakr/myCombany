import classes from "./getUser.module.css";
import { useEffect , useState} from "react";
import {connect} from "react-redux";
import {useParams , useLocation} from "react-router-dom";
import HistoryTable from "../../../Components/historyTable/historyTable";
import TextUser from "../../components/textUser/textUser";
import Profile from "../../../Components/Profile/profile";

import getAsync from "../../../store/actions/getAsync";
import {SET_MY_USER} from "../../../store/actions/actions";
let myDivs = ['profile' ,'history' , 'messages']
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function GetUser({myUserInfo , getMyUser}) {
    const {id} = useParams();
    let active_section = useQuery().get('active') ||0

    const [activeDiv , setActiveDiv] = useState(+active_section)
         
    let submit = ()=>{
        if(activeDiv=== 2){
            setActiveDiv(0)
            return;
        }
           setActiveDiv(activeDiv+1)
        
    }
    useEffect(()=>{
        getMyUser(id)
    },[id , getMyUser])
    return(
        myUserInfo ? 
        <div className={classes.container}>
            {activeDiv ===0 ? <Profile admin={true} user={myUserInfo.employee}/> : ''} 
            
            {activeDiv ===1 ? <HistoryTable history={myUserInfo.history ||[]}/> : ''} 
            
            {activeDiv ===2 ?<TextUser myUser={myUserInfo.employee}/> :''}
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