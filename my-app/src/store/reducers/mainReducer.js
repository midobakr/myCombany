import * as Actions from  '../actions/actions';

let initialState ={
    user :{},
    token :'',
    backdrop :false,
    loading :false,
    errors :'',
    Attendance :null,
    history :[],
    conversation:{},
    notification :[]
}

function reducer(state = initialState , action) {
    switch (action.type) {
        case Actions.SET_TOKEN:
                    localStorage.setItem('token' , action.payload); 
            return {...state , token: action.payload}
    
        case Actions.GET_DATA:
            return {...state , backdrop:true , loading:true,errors :''}
    
        case Actions.SET_ERRORS:
            if(action.payload.msg ==='invalid token'){
                localStorage.removeItem('token')
                return {...state ,  loading:false , errors:action.payload ,token:''}        
            }
            return {...state ,  loading:false , errors:action.payload}
    
        case Actions.SET_USER:
            console.log('SET_USER' , action.payload)

            return {...state , user: action.payload ,backdrop:false , loading:false}
    
        case Actions.SHOW_BACKDROP:
            return {...state , backdrop: true}
    
    
        case Actions.HIDE_BACKDROP:
            return {...state , backdrop: false}
    
        case Actions.SET_ATTENDANCE:

            return {...state , Attendance: action.payload ,backdrop:false , loading:false}
    
    
        case Actions.SET_HISTORY:
            return {...state , history: action.payload ,backdrop:false , loading:false}
    
    
        case Actions.SET_CONVERSATION:
            return {...state , conversation: action.payload ,backdrop:false , loading:false}
    
        case Actions.SET_NOTIFICATION:
            return {...state , notification: action.payload ,backdrop:false , loading:false}
    
    
        default:
            return state
    }
}

export default reducer