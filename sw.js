//El self es como el this para el serviceworker
//Cuando se instala el serviceworker se disparará este evento
self.addEventListener("install", event =>{
    event.waitUntil(precache());//Lista de recursos que ya queremos que tenga en caché
});

self.addEventListener("fetch", event =>{
    const request = event.request;
    if(request.method !== "GET"){
        return;
    }
    event.respondWith(cacheResponse(request))
})

async function precache(){
    //caches es un API del Dom
    const cache = await caches.open("v1");
    return cache.addAll([
        //Aquí añadimos varios recursos
       /*  "/",
        "/index.html",
        "/src/normalize.css",
        "/src/index.css",
        "/src/MediaPlayer.js",
        "/src/main.js",
        "/src/plugins/AutoPlay.js",
        "/src/plugins/AutoPause.js",
        "/src/assets/btr.mp4" */
    ])
}

async function cacheResponse(request){
    const cache = await caches.open("v1");
    //Para saber si hay un copia del request solicitado usamos match
    const responde = await cache.match(request);
    console.log("respuesta", responde)
    //Respondemos con lo obtenido y si no hay nada, respondemos con lo que venga de internet
    return responde || await fetch(request);
}