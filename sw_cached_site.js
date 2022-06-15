const cacheName = 'v2';

/**const cacheAssets = [
	'index.php',
	'css/style.css',
	'js/main.js'
] **/  

self.addEventListener('install', e=>{
	console.log('Service worker installed')
	/**	e.waitUntil(
		caches.open(cacheName)
		.then( cache => {
			console.log('Service Worker:Caching Files')
			cache.addAll(cacheAssets)
		})
		.then( ()=> self.skipWaiting())
	) **/
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
		//fetch(e.request).catch(()=>caches.match(e.request))	
		fetch(e.request)
		.then( res=>{
			const resClone = res.clone();
			//open cache
			caches
			.open(cacheName)
			.then(cache =>{
				cache.put(e.request, resClone)
			})
			return res
		})
		.catch(err=> caches.match(e.request).then(res => res))
	)
})

