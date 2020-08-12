//this file is loaded when serviceWorker is registered
//this files returns a promise which is handled in index.html 
//since self is a restricted global, now it represents the sw since this in an sw file reps the sw itself.
const self = this;
//name of our cache storage
const CACHE_NAME = 'version-1';
//offline html is the page we want sw to show when there is no internet connection
const urlsToCache = ['index.html', 'offline.html'];

//event for Installing SW
self.addEventListener('install', (event)=> {
    //first open the cache and add the two fules to the cache
    //wait until...
    event.waitUntil(
        //... cache is opened,
        caches.open(CACHE_NAME)
            //then take the cache and...
            .then((cache)=> {
                console.log('Opened the cache, ');
                //put the files inside the cache
                return cache.addAll(urlsToCache);
            })
    )
});

//event for listening for requests
self.addEventListener('fetch', (event)=> {
    //respond with something on fetch request event
    event.respondWith(
        //match the requested file with the one in the cahche and
        caches.match(event.request)
            .then(()=> {
                //for each request, return a fetch of that request only
                return fetch(event.request)
                //if you cant fetch it e.g. due to no internet connection
                    .catch(()=> caches.match('offline.html'))
            })
    )
});

//event for activating the SW
self.addEventListener('activate', (event)=> {
    //we will have a lot of versions of cache, so when activating we will remove previous versions of cache
    //and keep the latest one
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        //wait until you get an array of cache keys i.e. names
        caches.keys().then((cacheNames)=> {
            //we will get an array of promises
            Promise.all(
                cacheNames.map((cacheName) => {
                    //if the cacheWhitelist array does not include the required cache name then...
                    if(!cacheWhitelist.includes(cacheName)) {
                        //...delete the specific cache with that name
                        return caches.delete(cacheName);
                    }
                    //but if it includes the name in the whitelist, keep it.
                    //so it will always only keep the one whitelist cache version
                })
            )
        })
    )
});