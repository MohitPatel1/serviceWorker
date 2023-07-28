

 self.addEventListener('install', event => {
    console.log('V1 installing…');
  
    // cache a cat SVG
    event.waitUntil(
      caches.open('static-v1').then(cache => cache.add('/jim-identity-theft.jpg'))
    );
  });
  
  self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');
  });
  
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
   console.log({url})
   console.log(url.origin == location.origin)
    // serve the cat SVG from the cache if the request is
    // same-origin and the path is 'jim-identity-theft.jpg'
    if (url.origin == location.origin && url.pathname == '/jim-as-dwight.jpg') {
      event.respondWith(caches.match('/jim-identity-theft.jpg'));    
    }
  });