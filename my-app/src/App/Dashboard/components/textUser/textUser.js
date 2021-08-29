import {useEffect,useState,useRef} from "react";
import {connect } from 'react-redux';
import {useParams} from "react-router-dom";

import classes from './textUser.module.css'
import Spinner from "../../../employee/Components/UI/spinner/spinner";

import {DEC_UNSEEN_MSGS , INC_UNSEEN_MSGS} from "../../../store/actions/actions";
import myPostAsyncFunction from "../../../store/actions/myPostAsyncFunction";
import myAsyncFunction from "../../../store/actions/myAsyncFunction";
import sendIcon from "./send.png"
 
function Send({dispatch , myID , user, socket ,action}) {
    const holder = useRef(null)
    const [message, setMessage]= useState('')
    const [myMSG, setMyMSG]= useState([])
    const [reciever, setReciever]= useState() 
    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)
    let {id} = useParams()
    

    useEffect(()=>{
      let mounted = true
        if(socket){
            socket.off('recieve_message')
        socket.on('recieve_message' , (m)=>{ 
            if(!m.fromMe){
                // document.querySelector('#audio').play().then(t=>{console.log('test : ', t)}).catch(e=>{
                // })
                console.log('ya 4eeeeeee5')
                document.querySelector('#audio').play()
                if(m.from !== id || !mounted){
                dispatch({type: INC_UNSEEN_MSGS})
                }
            }
            if((m.from === id ||m.fromMe)&& mounted ){
                console.log('id==============' , mounted)
                setMyMSG((ss)=>[...ss ,m])  
                myAsyncFunction('/dashboard/myChat/'+id)
            }
        })
         return ()=>{
            mounted = false;
            
         }
    }
    },[socket,id ,dispatch ])
     
    useEffect(()=>{
        
        if(action){
            action(id)    
        }
    },[action , id])

    useEffect(()=>{
        setLoading(true)
        myAsyncFunction('/dashboard/myChat/'+id).then(res=>{
            if(!res){
                setMyMSG([])    

            }else{
            setMyMSG(res.messages)
            }
            setReciever({...res , messages:''})
            setLoading(false)
            console.log('t4t5gojgoji=>>',res)
            dispatch({type:DEC_UNSEEN_MSGS, payload:res.MangerUnseenMSGS})

        }).catch(e=>{
            setError(e.errors[0].msg)
            setLoading(false)
        })
        
    },[id , dispatch]) 

  useEffect(()=>{
      holder.current.scroll(0, holder.current.scrollHeight)  
    })

    let send =(e)=>{
        
        if(e.keyCode ===13 || e.type ==='click'){
        const newMessage ={
            from:myID,
            to:reciever.userOne,
            avatar:user.avatar,
            content:message,
            name :user.name,
            date:Date.now()
}
        socket.emit('send_message_to_employee',newMessage)
        setMessage('')
        
        myPostAsyncFunction('/dashboard/send',{
            id:reciever.userOne,
            avatar:reciever.avatar,
            name:reciever.userName,
            theMessage:message
        })
    }

    }
    let saveInput =(e)=>{
        setMessage(e.target.value)
    }      
    if(error){
        return <h1 style={{margin:'auto'}}>{error}</h1>
    }
 
    return(
        <div className={classes.container}>
            <div  ref={holder} className={classes.holder}>
                  {
                   loading?
                   <Spinner show margin='150px auto'/>
                   :myMSG[0]?    
                   myMSG.map((conv)=>{
                      
                       return(<div className={classes.box} style={conv.from ===myID? {marginRight:'auto',marginLeft:0 , backgroundColor:'#1A92DC'}:{}}>
                           <p style={{paddingBottom:'5px' , borderBottom:'1px solid black'}}>{conv.name}</p>
                           <p className={classes.content}>{conv.content}</p>
                           <p className={classes.date}>{new Date(conv.date).toLocaleString()}</p>
                       </div>)
               }) 
                       :<h1 style={{textAlign:'center'}}>Empty</h1>
                  
         }
            </div>         
            <div className={classes.buttonContainer}>
                    <input maxlength="50" className={classes.input} type='text' onKeyUp={send} value={message} onChange={saveInput}/>
                    <span className={classes.send} onClick={send}>
                        <img src={sendIcon} alt=""></img>
                    </span>
            </div>
            
        </div>
    )
}
const mapStateToprop =(state)=>({
    myChat :state.myChat,
    myID : state.user._id,
    user : state.user,
    socket :state.socket

})


export default connect(mapStateToprop)(Send)