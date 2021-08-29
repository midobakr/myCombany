import {useState} from 'react';
import validator from 'validator';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import classes from './signup.module.css';
import Form from '../../UI/Form/form';
import postAsync from '../../../../store/actions/postAsync'
import CloudsSticker from '../../UI/stickers/clouds/clouds'





function SignUp(props) {

    
  let [state , setState] = useState({username:'',email:'' , password : '',password2:'',theKey:''})
  
  let [errors,setErrors] = useState({}) 
  let [asAdmin,setAsAdmin] = useState(true) 
  
  let validate=(type, value)=>{
    let obj={}
      switch (type) {
        case 'username':
            if(!validator.isLength(value ,{min:3 })){
              obj.username ='too short';
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
              obj.password ='short password';
            }else{
              obj.password ='';
            }
            if(value===''){obj.password ='';}
          break;

          case 'password2':
            if(!(value === state.password)){
              obj.password2 ='No match';

            }else{
              obj.password2 ='';
            }
            if(value===''){obj.password2 ='';}
          break;
          
          case 'theKey':
            if(!validator.isLength(value ,{min:8 })){
              obj.theKey ='too short';
            }
            else{
              obj.theKey ='';
            }
            if(value===''){obj.theKey ='';}
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
  let sendData =async (e)=>{
      e.preventDefault()
    let validForm =!Object.values(errors).join('')
    if(validForm ){
      if(validForm){
        console.log('ok' , validForm)
        let errors =[]
        if(!asAdmin){
           errors = await props.dispatch(postAsync('/signup_admin',state))
        }else{
         errors = await props.dispatch(postAsync('/signup',state))
        }
       setErrors(errors)
    }

      console.log('dddddd===>',state)
    }  
}

// function checkLoginState() { // Called when a person is finished with the Login Button.
//  window.FB.login(function (response) {

//       console.log(response)
//       if (response.status === "connected") {
//         window.FB.api('/me', {
//               fields: 'email,last_name,birthday,picture'
//           }, function (response) {
//               console.log(response);
//           });
//       }
//   }, {
//       scope: 'public_profile,email'
//   }); 
// }
  console.log('asAdmin' , asAdmin)
   
  return (
    <div className={classes.container} >
                     <h4 className={classes.h4}>You can  <Link className={classes.link} to='/guest'>Enter As A guest </Link></h4>

        <Form
            title='Sign Up' 
            id = 'signUp'

            items={[{
                name:'username',
                type:'username',
                value:state.username,
                placeholder:'username',
                errorMsg:errors.username,
                saveInputData
          
              },{
              name:'Email',
              type:'email',
              value: state.email,
              placeholder:'Email address',
              saveInputData,
              errorMsg:errors.email,
        
            },{
              name:'Password',
              type : 'password',
              value: state.password,
              placeholder:'your password',
              saveInputData,
              errorMsg:errors.password,
            },
            {
                name:'confirm Password',
                type : 'password2',
                value: state.password2,
                placeholder:'write password again',
                saveInputData,
                errorMsg:errors.password2,
              },
            {
                name:'Sign UP As Admin',
                type:'checkbox',
                setAdmin:setAsAdmin
                
              },
              {
                name:'secret key',
                type : 'theKey',
                value: state.theKey,
                placeholder:'enter the secret key',
                saveInputData,
                errorMsg:errors.theKey,
                asAdmin:asAdmin
              }
            
            
            ]}
            onSubmit={sendData}
            />
            {/* <input type='checkBox'/> */}
            
            <h4 className={classes.h4}>Already have an account? <Link className={classes.link} to='/login'>Log In</Link></h4>
              <CloudsSticker/>
    </div>
  );    
}

export default connect(null)(SignUp)