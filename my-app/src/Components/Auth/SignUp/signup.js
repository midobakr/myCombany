import {useState} from 'react';
import validator from 'validator';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import classes from './signup.module.css';
import Form from '../../UI/Form/form';
import postAsync from '../../../store/actions/postAsync'





function SignUp(props) {

    
  let [state , setState] = useState({username:'',email:'' , password : '',password2:''})
  
  let [errors,setErrors] = useState({})
  
  let validate=(type, value)=>{
    let obj={}
      switch (type) {
        case 'userName':
            if(!validator.isLength(value ,{min:3 })){
              obj.username ='invalid username';
            }else{
              obj.username ='';
            }
            if(value===''){obj.username ='';}  
            break;
        case 'email':
            if(!validator.isEmail(value)){
              obj.email ='invalid Email';
            }else{
              obj.email ='';
            }
            if(value===''){obj.email ='';}
          break;
          case 'password':
            if(!validator.isLength(value ,{min:8 })){
              obj.password ='invalid password';
            }else{
              obj.password ='';
            }
            if(value===''){obj.password ='';}
          break;
          case 'password2':
            if(value === state.password){
              obj.password2 ='';

            }else{
              obj.password2 ='password not match';
            }
            if(value===''){obj.password2 ='';}
          break;
          
          default:
            break;
        }
        return obj;
  }
  let saveInputData=(type, e)=>{
    let value = e.target.value
    let new_errors = Object.assign(errors ,validate(type ,value))
    setErrors(new_errors)

    let newState = Object.assign(state ,{[type] : value})
    setState({...newState})
  }
  let sendData =(e)=>{
      e.preventDefault()
    let validForm =!Object.values(errors).join('')
    if(validForm ){
      if(validForm){
        console.log('ok' , validForm)
        props.dispatch(postAsync('/signup',state))
    }

      console.log('dddddd===>',state)
    }  
}
   
  return (
    <div className={classes.container}>
       <h1 style={{textAlign:'right' , margin:0,padding:'15px'}}>
        <Link to="/login">log  In</Link>
        </h1>
        <Form 
            title='Sign Up' 
            items={[{
                name:'username',
                type:'username',
                value:state.username,
                placeholder:'your user name',
                error:errors.username,
                saveInputData
          
              },{
              name:'Email',
              type:'email',
              value: state.email,
              placeholder:'your Email address',
              saveInputData,
              error:errors.email
        
            },{
              name:'Password',
              type : 'password',
              value: state.password,
              placeholder:'your password',
              saveInputData,
              error:errors.password
            },
            {
                name:'confirm Password',
                type : 'password2',
                value: state.password2,
                placeholder:'write password again',
                saveInputData,
                error:errors.password2
              }]}
            onSubmit={sendData}
            />
    </div>
  );    
}

export default connect(null)(SignUp)