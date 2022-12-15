//Se define una constante que guarda un selector de nodos en el html
const node = (id) => document.querySelector(id);
//NODOS A MANIPULAR
//etiqueta video
const video = node(".movie");
//etiqueta de botón de play
const btnPlay = node("#movie-play");

//CLASE MEDIA PLAYER
//Se crea una clase la cual manejará el comportamiento del reproductor de video.
class MediaPlayer{
    constructor(video){
        this.video = video;
    }
    playVideo(){
        this.video.play();
    }
    pauseVideo(){
        this.video.pause();
    }
}
//Objeto reproductor de video
const player = new MediaPlayer(video);
//Al darle click al botón ejecutará accione de reproducir o pausar el video
btnPlay.addEventListener("click", ()=>{
    //Si está pausado reproduce, si está reproduciendo entonces lo pausa.
    player.video.paused ? player.playVideo() : player.pauseVideo();
   
});