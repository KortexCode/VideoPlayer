"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//y así poder tipar con él.
var AutoPause = /** @class */ (function () {
    function AutoPause(video) {
        this.video = video;
    }
    AutoPause.prototype.run = function (player) {
        //Definimos el objeto que llevará las opciones o configuración del observador
        var ratio = {
            threshold: 0.25,
        };
        //Luego creamos una instancia de la clase InstersectionObserver
        //En este caso la funciñon callback es definidad directamente como parámetro
        var observer = new IntersectionObserver(function (entries) {
            //Extraemos la entrada en la primera posición(ya que sólo hay una)
            var entry = entries[0];
            //Se compara si la cantidad de piixeles visibles del video es mayor menor a su 25%
            var isVisible = entry.intersectionRatio >= ratio.threshold;
            //Si es mayor, hará play; si menor, hará pause.
            if (isVisible) {
                player.playVideo();
            }
            else {
                player.pauseVideo();
            }
        }, ratio /*Aquí va el objeto de configuración */);
        //Observamos la etiqueta video de la página
        observer.observe(this.video);
        document.addEventListener("visibilitychange", function () {
            //Si el estado es visible hará play al video, de lo contrario será pause
            if (document.visibilityState === "visible")
                player.playVideo();
            else
                player.pauseVideo();
        });
    };
    return AutoPause;
}());
exports.default = AutoPause;
