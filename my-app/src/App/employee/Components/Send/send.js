import {useEffect,useState,useRef} from "react";
import {connect ,useDispatch } from 'react-redux'
import classes from './send.module.css'

import {SET_UNSEEN_MSGS , INC_UNSEEN_MSGS} from '../../../store/actions/actions' 
import Spinner from '../UI/spinner/spinner' 

import myAsyncFunction from "../../../store/actions/myAsyncFunction";
import myPostAsyncFunction from "../../../store/actions/myPostAsyncFunction";
import sendIcon from "./send.png"
function Send({ user , socket}) {
    const myID = user._id
    const holder = useRef(null)
    const dispatch = useDispatch()

    const [message, setMessage]= useState('')
    const [myMSG, setMyMSG]= useState([])
    const [loading, setloading]= useState(false)
    useEffect(()=>{ 
        if(socket){
            let mounted =true
            socket.off('recieve_message_from_admin')

        socket.on('recieve_message_from_admin' , (m)=>{
            if(!m.fromMe && !mounted){
                document.querySelector('#audio').play() 
                dispatch({type:INC_UNSEEN_MSGS})
            }
            if(mounted){
            setMyMSG((ss)=>[...ss ,m])
            myAsyncFunction('/conversation')
            }
        })
       return ()=>{
           mounted= false
       }
    } 
    },[socket, dispatch])
  
    useEffect( ()=>{
        dispatch({type:SET_UNSEEN_MSGS, payload:0})

        async function fetchData(){
            setloading(true)
            let conv = await  myAsyncFunction('/conversation')
          setMyMSG(conv.messages)
          setloading(false)
        
        }
        fetchData()
    },[dispatch]) 

    useEffect(()=>{
        if(myMSG[0]){
            holder.current.scroll(0, holder.current.scrollHeight)  
        }
    })
    let send =(e)=>{
        if(e.keyCode ===13 || e.type ==='click'){
         if(/[a-z]/i.test(message)){
            const newMessage ={
                from:myID,
                avatar:user.avatar,
                content:message,
                name :user.name,
                date:Date.now()
            }
            socket.emit('send_message_to_admins',newMessage)
            setMessage('')
            // sendConversation({theMessage:message})
            myPostAsyncFunction('/conversation/send',{theMessage:message})
            }
        }
    }
    let saveInput =(e)=>{
        setMessage(e.target.value)
    }     
// if(true){
//     return 'okkkk'
// }
    return(
        <div className={classes.container}>
            <div  ref={holder} className={classes.holder}>
                {
                   
                myMSG[0]?    
                myMSG.map((conv)=>{
                   
                    return(<div className={classes.box} style={conv.from ===myID? {marginRight:'auto',marginLeft:0 , backgroundColor:'#1A92DC'}:{}}>
                        <p style={{paddingBottom:'5px' , borderBottom:'1px solid black'}}>{conv.name}</p>
                        <p className={classes.content}>{conv.content}</p>
                        <p className={classes.date}>{new Date(conv.date).toLocaleString()}</p>
                    </div>)
            }) 
                    // :''
                    :<Spinner show={loading}  margin='100px auto'/>
                
                }
            </div>        
            <div className={classes.buttonContainer}>
                    <input  className={classes.input} type='text' onKeyUp={send} value={message} onChange={saveInput}/>
                    <span className={classes.send} onClick={send}>
                        <img src={sendIcon} alt=""></img>
                    </span>
            </div>
        </div>
    )
}
const mapStateToprop =(state)=>({
    conversation :state.conversation,
    user : state.user,
    socket:state.socket

})


export default connect(mapStateToprop)(Send)