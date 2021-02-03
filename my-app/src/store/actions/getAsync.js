import * as Actions from "./actions";


 const getAsync = (path ,Actiontype) => async (dispatch, getState) => {
    console.log('i am here ==>' , getState().token)
    dispatch({
        type: Actions.GET_DATA
    })

            console.log('state' , getState())
    try {
        let Response = await fetch('http://192.168.1.6:3333'+ path, {
            method: 'GET',
            headers: {
                Authorization: getState().token
            }
        })
        
        if(Response.ok){
            console.log('raw data==>',Response.ok)
        
            Response = await Response.json();
    
            console.log(Response)
    
            dispatch({
                type :Actiontype,
                payload: Response
            })
    
    
        }else{
            Response = await Response.json()
            throw (Response)    
        }


    } catch (e) {
        console.log('e======>',e)
        dispatch({type : Actions.SET_ERRORS,payload:e.errors[0]})
    }


}
export default getAsync 