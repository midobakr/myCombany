import * as Actions from "./actions";


 const postAsync = (path  ,body,actionType=Actions.SET_TOKEN) => async (dispatch, getState) => {
    dispatch({
        type: Actions.GET_DATA
    })
    try {
        let Response = await fetch('http://192.168.1.6:3333'+ path, {
            method: 'POST',
            headers: {
                Authorization: getState().token,
                'Content-Type':'application/json' 
            },
            body: JSON.stringify(body)
        })
    
        if(Response.ok){
                console.log('okkkkkkkkkkkkkkkk')
            const Data = await Response.json();
    
            dispatch({
                type :actionType,
                payload: Data
            })
    
    
        }else{
            Response = await Response.json()
            throw (Response)
        }


    } catch (e) {
        dispatch({type : Actions.SET_ERRORS,payload:e.errors[0]})
    }


}
export default postAsync