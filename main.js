"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MediaPlayer_1 = require("./MediaPlayer");
var AutoPlay_1 = require("./plugins/AutoPlay");
var AutoPause_1 = require("./plugins/AutoPause");
var AdsPlugin_1 = require("./plugins/Ads/AdsPlugin");
//Se define una constante que guarda un selector de nodos en el html
var node = function (id) {
  return document.querySelector(id);
};
//NODOS A MANIPULAR
//etiqueta video
var video = node(".video-player");
//etiqueta de botón de play
var btnPlay = node("#video-play");
var btnMuted = node("#video-muted");
//Objeto reproductor de video
var player = new MediaPlayer_1.default({
  video: video,
  plugin: [
    new AutoPlay_1.default(),
    new AutoPause_1.default(video),
    new AdsPlugin_1.default(),
  ],
});
//Al darle click al botón ejecutará acción de reproducir o pausar el video
btnPlay.addEventListener("click", function () {
  //Si está pausado reproduce, si está reproduciendo entonces lo pausa.
  player.video.paused ? player.playVideo() : player.pauseVideo();
});
btnMuted.addEventListener("click", function () {
  //Si el video está silenciado, entonces activa el sonido, de lo contrario lo silencia
  player.video.muted
    ? (player.video.muted = false)
    : (player.video.muted = true);
});
//SERVICE WORKER
//Dentro del objeto navigator hay una propiedad llamada serviceWorker y dentro del prototy
//Tiene una propiedad register; con ella vamos a registrar un serviworker el cual será creado
//En el archivo sw.js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(function (error) {
    return console.log(error.message);
  });
}
