if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js").then(res=>{
        // on every reload this function is being called
        console.log(res)        
        console.log('service worker registered')
    })
 }

// This code executes in its own worker or thread
self.addEventListener("install", event => {
    // this event is triggered
    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => { 
    // this event is not being triggered 
    console.log("Service worker activated");
 });