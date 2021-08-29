import {useSelector} from 'react-redux'
import classes from './profile.module.css'
import icon from './camera.svg'

function Profile({user}) {
    let token = useSelector(state =>state.token)
   async function  send(e){
        const formData = new FormData()
  formData.append('file', e.target.files[0])
        let res = await fetch('/image' ,{
            method: 'POST',
            headers: {
                Authorization: token
            },
             body:formData 
        })
        res = await res.json()
      if(res.saved === true){
          window.location.reload()
      }
    }
 
    return(
        <div className={classes.container}>
            <div>

            <label   for='profile-picture' className={classes.imageContainer}>
                <img className={classes.image}  
                src={`/image/${user.name}.png`} 
                alt={`https://www.gravatar.com/avatar/${user.avatar}`} 
                />
                <input style={{display:'none'}} id='profile-picture' type='file' name='file' onChange={send}></input>    
                <div className={classes.icon}>
                <img  style={{width:'25px'}} src={icon} alt='profile ' />
                </div>
            </label> 
            </div>
        {/* <form action='http://192.168.1.8:3333/image' id='ddd' > */}
        {/* <input type='file' name='file'></input> */}
            {/* <button type='submit'>ama n4oof</button>  
        */}
        {/* </form>  */} 
           <div className={classes.container2}> 
                <div className={classes.box}>
                    <h2 className={classes.label}>your name:</h2>
                    <h2>{user.name}</h2>
                </div>
                <div className={classes.box}> 
                    <h2  className={classes.label}>your Email:</h2>
                    <h2>{user.email}</h2> 
                </div>
                <div className={classes.box}>
                    <h2 className={classes.label}>Date of Employment:</h2>
                    <h2>{new Date(user.dateOfEmployment).toLocaleDateString()}</h2>
                </div>
            </div>

        </div>
    )
}

export default Profile