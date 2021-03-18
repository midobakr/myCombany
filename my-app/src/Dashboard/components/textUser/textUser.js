import {useEffect,useState,useRef} from "react";
import {connect} from 'react-redux'
import classes from './textUser.module.css'
import {SET_MYCHAT} from "../../../store/actions/actions";
import postAsync from "../../../store/actions/postAsync";
import getAsync from "../../../store/actions/getAsync";

function Send({getConversation,sendConversation,myChat,myUser , myID}) {
    const holder = useRef(null)
    const [message, setMessage]= useState('')
    useEffect(()=>{
            getConversation(myUser._id)
    },[getConversation , myUser._id]) 
    useEffect(()=>{
        holder.current.scroll(0, holder.current.scrollHeight)  
    })
    let send =(e)=>{
       sendConversation({
            id:myUser._id,
            avatar:myUser.avatar,
            name:myUser.name,
            theMessage:message
        })
        setMessage('')

    }
    let saveInput =(e)=>{
        setMessage(e.target.value)
    }      

    return(
        <div className={classes.container} style={{width:'100%',textAlign: 'center'}} >
            <div  ref={holder} className={classes.holder}>
                {
                myChat.messages?    
                myChat.messages.map((conv)=>{
                            return(<div className={classes.box} style={conv.from ===myID? {marginRight:'auto',marginLeft:0}:{}}>
                                <p style={{paddingBottom:'5px' , borderBottom:'1px solid black'}}>{conv.name}</p>
                                <p>{conv.content}</p>
                                <p className={classes.date}>{new Date(conv.date).toLocaleString()}</p>
                            </div>)
                    }) 
                    :'Loading...'
                }
            </div>         
            <textarea value={message} style={{width:'50%',margin:'0 auto',borderRadius:'15px',resize:'none'}} onChange={saveInput}>

            </textarea>
            <button className={classes.button} onClick={send} >Send</button>
        </div>
    )
}
const mapStateToprop =(state)=>({
    myChat :state.myChat,
    myID : state.user._id
})
const mapDispatchToprop =(dispatch)=>({
    sendConversation :(body)=>dispatch(postAsync('/dashboard/send',body,SET_MYCHAT)),
    getConversation:(id)=>dispatch(getAsync('/dashboard/myChat/'+id,SET_MYCHAT))
})


export default connect(mapStateToprop,mapDispatchToprop)(Send)