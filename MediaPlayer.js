"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//CLASE MEDIA PLAYER
//Se crea una clase la cual manejará el comportamiento del reproductor de video.
var MediaPlayer = /** @class */ (function () {
    function MediaPlayer(config) {
        this.video = config.video;
        this.plugins = config.plugin || [];
        //cualquier instancia de esta clase llamará a la función iniciadora de plugins apenas sea declarada
        this.initMediaPlayer();
        this.initPlugins();
    }
    //Métodos de la clase
    MediaPlayer.prototype.playVideo = function () {
        this.video.play();
    };
    MediaPlayer.prototype.pauseVideo = function () {
        this.video.pause();
    };
    MediaPlayer.prototype.muted = function () {
        this.video.muted = true;
    };
    MediaPlayer.prototype.unmuted = function () {
        this.video.muted = false;
    };
    MediaPlayer.prototype.initMediaPlayer = function () {
        var _a;
        this.container = document.createElement("div");
        this.container.classList.add("VideoContainer");
        this.container.style.position = "relative";
        (_a = this.video.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(this.container, this.video);
        this.container.appendChild(this.video);
    };
    //Este método inicializa todos los plugins asociados con el reproductor de video
    MediaPlayer.prototype.initPlugins = function () {
        var _this = this;
        this.plugins.forEach(function (plugin) {
            plugin.run(_this);
        });
    };
    return MediaPlayer;
}());
exports.default = MediaPlayer;
