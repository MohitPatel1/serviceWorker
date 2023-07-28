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

setTimeout(() => {
    const img = new Image();
    img.src = 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/07/harry-potter-snape-patronus.jpg';
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

const simpleResponse = new Response("Body of the HTTP response");

const options = {
   status: 200,
   headers: {
	'Content-type': 'text/html'
   }
};
const htmlResponse = new Response("<b>HTML</b> content", options)

self.addEventListener('fetch', event => {
    // for getting image from internet,
    // on first call it gets cached and trigger fetch event
    // from second call takes 0ms to load and do not trigger fetch event

    // for getting image from internal folders
    // on every call it triggers fetch event
    // on every call it takes more than 1ms time
    console.log(event.request.url)
    // event.respondWith(htmlResponse)

    caches.match(event.request.url).then(res => {
        console.log(res ? res : 'not found in cache')
    })
})