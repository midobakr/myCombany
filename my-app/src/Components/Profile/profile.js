import classes from './profile.module.css'

function Profile({user}) {
    console.log('Profile' ,user)
    return(
        <div className={classes.container}>
            <div style={{display:'flex',alignItems:'center' , justifyContent:'center'}}>
                <img style={{borderRadius:'50%',width:'30%'}} src={`https://www.gravatar.com/avatar/${user.avatar}?s=500`} alt='profile ' />
            </div>    
           <div> 
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