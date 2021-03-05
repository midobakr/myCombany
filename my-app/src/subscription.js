const publicVapidKey = 'BGoYWF08O9yIeCH8ZB6jymtlhq54Wk8Lvit8i-UsMhJlh1el0UYiK0FsCTpQlM8wQ2G5ttLDzVNkByNZWtw-G4I';

// Copied from the web-push documentation
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const sendSubscription = async () => {
  if ('serviceWorker' in navigator) { 
    navigator.serviceWorker.register('/serverWorker.js', {
    scope: '/',
    }).then(async ()=>{
      
      const registration = await navigator.serviceWorker.ready;
      let subRegistration = await registration.pushManager.getSubscription();
       
      // Subscribe to push notifications
    if(subRegistration === null){
      subRegistration = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey), 
      });
      
    } 
    
    fetch('http://192.168.1.6:3333/subscription', {
      method: 'POST',
      headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(subRegistration)
    }).then(()=>{
      console.log('done')
    })
    });

  }

  
};
// I am stoping here
// I should save the registerd subscription in reducer state
// to sent it with delete request while loggin out 'remove token'

const deleteSubscription =async ()=>{
  if ('serviceWorker' in navigator) { 
      const registration  = await navigator.serviceWorker.ready;
      let subRegistration = await registration.pushManager.getSubscription();
    
      await fetch('http://192.168.1.6:3333/subscription', {
        method: 'DELETE',
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(subRegistration)
      }).then(()=>{
        console.log('done')
      })

  }
  localStorage.removeItem('token');

}

export  {sendSubscription,deleteSubscription}