import MediaPlayer from './MediaPlayer';
import AutoPlay from './plugins/AutoPlay';
import AutoPause from './plugins/AutoPause';
import AdsPlugin from './plugins/Ads/AdsPlugin';
import './normalize.css';
import './index.css';


//Se define una constante que guarda un selector de nodos en el html
const node = (id) => document.querySelector(id);
//NODOS A MANIPULAR
//etiqueta video
const video:HTMLMediaElement = node(".video-player");
//etiqueta de botón de play
const btnPlay:HTMLElement  = node("#video-play");

const btnMuted:HTMLElement  = node("#video-muted");

//Objeto reproductor de video
const player = new MediaPlayer({video, plugin:[new AutoPlay(), new AutoPause(video), new AdsPlugin()]});
//Al darle click al botón ejecutará acción de reproducir o pausar el video
btnPlay.addEventListener("click", ()=>{
    //Si está pausado reproduce, si está reproduciendo entonces lo pausa.
    player.video.paused ? player.playVideo() : player.pauseVideo();
   
});
btnMuted.addEventListener("click", ()=>{
    //Si el video está silenciado, entonces activa el sonido, de lo contrario lo silencia
    player.video.muted ? player.video.muted = false : player.video.muted = true;
   
});

//SERVICE WORKER
//Dentro del objeto navigator hay una propiedad llamada serviceWorker y dentro del prototy
//Tiene una propiedad register; con ella vamos a registrar un serviworker el cual será creado
//En el archivo sw.js
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("../sw.js").catch(error =>{
        return console.log(error.message);
    });
}
