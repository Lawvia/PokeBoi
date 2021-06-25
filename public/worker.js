var CACHE_NAME = 'pokeBoi-v2';
var urlsToCache = [
  '/',
  '/index.html'
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  // console.log("fetching something ...",event)
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }else{
          return fetch(event.request)
            .then(function(res) {
              return caches.open('dynamic')
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function (err){
              console.log("dari fetch ",err)
              return caches.open('dynamic')
                .then(function (cache){
                  console.log("obaboaob")
                  // if (event.request.url.indexOf('https://graphql-pokeapi.vercel.app/api/graphql')){
                    console.log("ini errror get fetch")
                    return cache.match('https://graphql-pokeapi.vercel.app/api/graphql');
                  // }
                })
            });
        }
        // return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = [CACHE_NAME,'dynamic'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});