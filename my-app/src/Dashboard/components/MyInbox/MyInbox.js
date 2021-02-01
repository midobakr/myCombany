import {useEffect} from 'react'
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

    </div>
    )

}


export default MyInbox