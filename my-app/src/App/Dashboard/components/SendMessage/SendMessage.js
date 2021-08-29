import {useEffect , useState} from 'react'
import {Link,Route} from "react-router-dom";

import TextUser from "../textUser/textUser";
import Search from "../../../employee/Components/UI/search/Search";
import Spinner from "../../../employee/Components/UI/spinner/spinner";

import myAsyncFunction from "../../../store/actions/myAsyncFunction";

import classes from './SendMessage.module.css';
 
function SendMessage() {
    let [usersArray , setUsersArray] = useState([])
    let [allUsers , setAllUsers] = useState([])
    let [pathID , setpathID] = useState(window.location.pathname.split('/')[3])
    
    function search(arr){
        // if(!arr[0]){
            console.log('arr=no',arr)
        // }
        setUsersArray(arr)
    }
    useEffect(()=>{
        myAsyncFunction('/dashboard/allEmployees').then(res=>{
            setAllUsers(res)
            setUsersArray(res)
        })
    },[])

    let theAction =(id)=>{
        setpathID(id);
        console.log('gogog=>' , id)
    }
  
    return(
        <div  className={classes.container} >      
            
            <div  className={classes.container2} >
                <div className={classes.searchContainer}>
                    <Search action={search} fullArray={allUsers}/>
                </div>

                <div className={classes.boxContainer}>
                    {usersArray==='no'?'':!usersArray[0]?
                            <Spinner show margin='auto'/>
                            :
                            usersArray.map(m=>        
                            <Link to={`/admin/sendMessage/${m._id}`} className={classes.box}
                            style={pathID===m._id?
                            {background:'#1A92DC'}
                            :
                            {}
                           }>
                            <div className={classes.info} >
                                <span className={classes.name}>
                                 {m.name}

                                </span>
                                </div>
                                <img  className={classes.icon} style={{borderRadius:'50%'}} src={`/image/${m.name}.png`} alt='ff'/>
                            </Link> 
                    )}
                </div>
            </div>
            <div className={classes.container3} >
                        <Route  path='/admin/sendMessage/:id'>
                            <TextUser action={theAction}/>
                        </Route>
            </div>
        </div>
    ) 
}

export default SendMessage 