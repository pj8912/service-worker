const cacheName = 'v1';

const cacheAssets = [
	'index.php',
	'about.php',
	'css/style.css',
	'js/main.js'
]

self.addEventListener('install', e=>{
	e.waitUntil(
		caches.open(cacheName)
		.then( cache => {
			console.log('Service Worker:Caching Files')
			cache.addAll(cacheAssets)
		})
		.then( ()=> self.skipWaiting())
	)
})

self.addEventListener('activate', e=>{
	console.log('Service Worker: Activated')

	e.waitUntil(
		caches.keys().then( cacheNames =>{
			return Promise.all(
				cacheNames.map(cache =>{
					if(cache !== cacheName){
						console.log('Serivce Worker:Cleaning old cache')
						return caches.delete(cache);
					}
				})
			)
		})
	)
})


//call fetch event
//to show cache file offline
//


self.addEventListener('fetch', e=>{
	console.log('service worker: fetching')
	e.respondWith(
		fetch(e.request).catch(()=>caches.match(e.request))	
	)
})


