// if your browser supports service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js").then(res=>{
        // on every reload this function is being called
        console.log(res)        
        console.log('service worker registered')
    })
 }

setTimeout(() => {
    const img = new Image();
    img.src = 'always.jpeg';
    document.body.appendChild(img);
}, 3000);

// This code executes in its own worker or thread
self.addEventListener("install", event => {
    // this event triggers only once the tab is opened
    // if n tabs are opened, this will be triggered n times on the begining
    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => { 
    // this event is not being triggered 
    console.log("Service worker activated");
 });

const urlsToCache = ["/", 'sw.js', "index.html", "always.jpeg", "afterAllThisTime.jpeg"];
self.addEventListener("install", event => {
   event.waitUntil(
      caches.open("chamber-of-secrets")
      .then(cache => {
         return cache.addAll(urlsToCache);
      })
   );
});