import { useDispatch} from "react-redux";
import {LOG_IN} from '../../../../store/actions/actions'
import postAsync from '../../../../store/actions/postAsync'

import classes from './guest.module.css';
import AdminAvatar from './profile.svg';
import EmployeeAvatar from './man.svg';

function Guest() {
  
  const dispatch = useDispatch()

  let sendData =async (status)=>{
      console.log(status)
       await dispatch(postAsync('/guest',{as:status},LOG_IN))
  } 
  
  return (
    <div className={classes.container}>
        <h1 style={{textAlign:'center'}}>Enter As A guest</h1>
    <div  style={{display:'flex',justifyContent:'space-around'}}>
        <div onClick={()=>{sendData('admin')}} style={{textAlign:'center'}}>
        <img src={AdminAvatar} style={{width:'75%',height:'400px'}} alt=''/>
        <h2 >Manager</h2>
        </div>
        <div onClick={()=>{sendData('employee')}} style={{textAlign:'center'}}>
        <img src={EmployeeAvatar} style={{width:'75%',height:'400px'}} alt=''/>
        <h2 >Employee</h2>
        </div>
    </div>
    </div>
  );
}


export default Guest;
