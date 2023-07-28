"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//y así poder tipar con él.
//CLASE AUTOPLAY
//Se crea la clase AutoPlay la cual es un plugin para generar una reproducción automática al cargar el sito web
var AutoPlay = /** @class */ (function () {
    function AutoPlay() {
    }
    //Enviamos un objeto "player" que contiene las propiedades y métodos de la clase MediaPlayer
    AutoPlay.prototype.run = function (player) {
        //Auto play busca que el video esté en muted para poderlo reproducir
        !player.video.muted ? player.video.muted = true : false; //si el video no está muted, se establece en muted
        player.playVideo();
    };
    return AutoPlay;
}());
exports.default = AutoPlay;
