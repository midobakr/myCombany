import {useEffect , useState} from 'react'
function Timer() {
    const [nowDate ,setNowDate] = useState(new Date().toLocaleTimeString())

        useEffect(()=>{
            const timer=  setInterval(()=>{
                setNowDate(new Date().toLocaleTimeString())
                console.log('beb')
            },1000)
            return ()=>{
                clearInterval(timer)
            }
        },[])

       return nowDate
    
}

export default Timer