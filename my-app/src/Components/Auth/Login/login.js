import {useState} from "react";
import validator from 'validator';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import classes from './login.module.css';
import Form from '../../UI/Form/form'
import postAsync from '../../../store/actions/postAsync'
function Login(props) {
  
  let [state , setState] = useState({email:'' , password : ''})
  let [errors,setErrors] = useState({})


  let validate=(type, value)=>{
    let obj={}
      switch (type) {
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
          
          default:
            break;
        }
        return obj;
  } 
  let saveInputData=(type, e)=>{
    console.log('props==>' , props)
    let value = e.target.value
    let new_errors = Object.assign(errors ,validate(type ,value))
    setErrors(new_errors)

    let newState = Object.assign(state ,{[type] : value})
    setState({...newState})
  }

  let sendData =async (e)=>{
    e.preventDefault()
    let validForm =!Object.values(errors).join('')
    if(validForm){
        const {email , password} = state
          console.log('i am here',state , email ,password)
          props.dispatch(postAsync('/login',{email : state.email ,password :state.password}))
      }

    }
  
  
  console.log('loggggggg in' , props)
   
  return (
    <div className={classes.container}>
          <h1 style={{textAlign:'right' , margin:0,padding:'15px'}}>
        <Link to="/signup">Sign Up</Link>
        </h1>
        <Form 
            title='Login' 
            items={[{
              name:'Email',
              type:'email',
              placeholder:'your Email address',
              saveInputData,
              error:errors.email,
              value: state.email,


        
            },{
              name:'Password',
              type : 'password',
              placeholder:'your password',
              saveInputData,
              error:errors.password,
              value: state.password,


            }]}
            onSubmit={sendData}
            />
    </div>
  );
}

export default connect(null)(Login);
