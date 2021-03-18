import {useEffect,useState,useRef} from "react";
import {connect} from 'react-redux'
import classes from './send.module.css'
import {SET_CONVERSATION} from "../../store/actions/actions";
import postAsync from "../../store/actions/postAsync";
import getAsync from "../../store/actions/getAsync";
function Send({getConversation,sendConversation,conversation , myID}) {
    const holder = useRef(null)
    const [message, setMessage]= useState('')

    useEffect(()=>{
            getConversation()
    },[getConversation]) 
    useEffect(()=>{
        holder.current.scroll(0, holder.current.scrollHeight)  
    })
    let send =(e)=>{
       sendConversation({
            theMessage:message
        })
        setMessage('')

    }
    let saveInput =(e)=>{
        setMessage(e.target.value)
    }     

    return(
        <div className={classes.container}>
            <div  ref={holder} className={classes.holder}>
                {
                conversation.messages?    
                conversation.messages.map((conv)=>{
                    return(<div className={classes.box} style={conv.from ===myID? {marginRight:'auto',marginLeft:0}:{}}>
                        <p style={{paddingBottom:'5px' , borderBottom:'1px solid black'}}>{conv.name}</p>
                        <p>{conv.content}</p>
                        <p className={classes.date}>{new Date(conv.date).toLocaleString()}</p>
                    </div>)
            }) 
                    :'haha'
                }
            </div>         
            <textarea value={message} style={{width:'50%',margin:'0 auto',borderRadius:'15px',resize:'none'}} onChange={saveInput}>

            </textarea>
            <button className={classes.button} onClick={send} >Send</button>
        </div>
    )
}
const mapStateToprop =(state)=>({
    conversation :state.conversation,
    myID : state.user._id

})
const mapDispatchToprop =(dispatch)=>({
    sendConversation :(body)=>dispatch(postAsync('/conversation/send',body,SET_CONVERSATION)),
    getConversation:(body)=>dispatch(getAsync('/conversation',SET_CONVERSATION))
})


export default connect(mapStateToprop,mapDispatchToprop)(Send)