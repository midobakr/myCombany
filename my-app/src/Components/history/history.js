import {useEffect} from "react";
import {connect} from "react-redux";
import classes from "./history.module.css";
import {SET_HISTORY} from "../../store/actions/actions";
import getAsync from "../../store/actions/getAsync";
import HistoryTable from "../historyTable/historyTable";
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
            <HistoryTable history={props.history }/>
        </div>
    )
}
const mapStateToprop =(state)=>({
    history :state.history    
})

export default connect(mapStateToprop)(History)