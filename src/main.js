import MediaPlayer from './MediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';
import AutoPause from './plugins/AutoPause.js';

//Se define una constante que guarda un selector de nodos en el html
const node = (id) => document.querySelector(id);
//NODOS A MANIPULAR
//etiqueta video
const video = node(".video-player");
//etiqueta de botón de play
const btnPlay = node("#video-play");
const btnMuted = node("#video-muted");

//Objeto reproductor de video
const player = new MediaPlayer({video, plugin:[new AutoPlay(video), new AutoPause(video)]});
//Al darle click al botón ejecutará acción de reproducir o pausar el video
btnPlay.addEventListener("click", ()=>{
    //Si está pausado reproduce, si está reproduciendo entonces lo pausa.
    player.video.paused ? player.playVideo() : player.pauseVideo();
   
});
btnMuted.addEventListener("click", ()=>{
    console.log(player.video.muted)
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
