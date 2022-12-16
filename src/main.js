import MediaPlayer from './MediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';

//Se define una constante que guarda un selector de nodos en el html
const node = (id) => document.querySelector(id);
//NODOS A MANIPULAR
//etiqueta video
const video = node(".movie");
//etiqueta de botón de play
const btnPlay = node("#movie-play");

//Objeto reproductor de video
const player = new MediaPlayer({video, plugin:[new AutoPlay(video)]});
//Al darle click al botón ejecutará accione de reproducir o pausar el video
btnPlay.addEventListener("click", ()=>{
    //Si está pausado reproduce, si está reproduciendo entonces lo pausa.
    player.video.paused ? player.playVideo() : player.pauseVideo();
   
});