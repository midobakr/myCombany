import {useEffect,useState,useRef} from "react";
import {connect} from 'react-redux'
import classes from './send.module.css'
import {SET_CONVERSATION} from "../../store/actions/actions";
import postAsync from "../../store/actions/postAsync";
import getAsync from "../../store/actions/getAsync";
function Send({getConversation,sendConversation,conversation}) {
    const holder = useRef(null)
    const [message, setMessage]= useState('')
    const [holder_height, setHolder]= useState(0)

    let setmyholder = ()=>{
        holder.current.scrollTop=200
        console.log('gujdkml',holder.current.scrollTop)
    }
    useEffect(()=>{
            getConversation()
            // setTimeout(() => {
            //     holder.current.scroll(0, holder.current.scrollHeight)          
            // console.log('=====================>',holder.current.scrollHeight)

            // }, 400);
            // document.querySelector('#holder').scroll(0, 200)
    },[getConversation]) 
    let send =()=>{
       sendConversation({
            theMessage:message
        })
    }
    let saveInput =(e)=>{
        setMessage(e.target.value)
        console.log(message)
    }     
    // console.log('===<<<<<<<<>>>>>>>>>>>',conversation.messages)
    return(
        <div className={classes.container}>
            <div onLoad={()=>{
                console.log('onload')
                                holder.current.scroll(0, holder.current.scrollHeight)          
            }} ref={holder} className={classes.holder}>
                {
                conversation.messages?    
                conversation.messages.map((conv)=>{
                            return(<div className={classes.box}>
                                <p>{conv.content}</p>
                                <p className={classes.date}>{new Date(conv.date).toLocaleString()}</p>
                            </div>)
                    })
                    :'haha'
                }
            </div>         
            <textarea style={{width:'50%',margin:'0 auto',borderRadius:'15px',resize:'none'}} onChange={saveInput}>

            </textarea>
            <button className={classes.button} onClick={send} >Send</button>
        </div>
    )
}
const mapStateToprop =(state)=>({
    conversation :state.conversation
})
const mapDispatchToprop =(dispatch)=>({
    sendConversation :(body)=>dispatch(postAsync('/conversation/send',body,SET_CONVERSATION)),
    getConversation:(body)=>dispatch(getAsync('/conversation',SET_CONVERSATION))
})


export default connect(mapStateToprop,mapDispatchToprop)(Send)