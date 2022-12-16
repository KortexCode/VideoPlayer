//CLASE MEDIA PLAYER
//Se crea una clase la cual manejará el comportamiento del reproductor de video.
export default class MediaPlayer{
    constructor(config){
        this.video = config.video;
        this.plugins = config.plugin || [];
        //cualquier instancia de esta clase llamará a la función iniciadora de plugins apenas sea declarada
        this.initPlugins();
    }
    //Métodos de la clase
    playVideo(){
        this.video.play();
    }
    pauseVideo(){
        this.video.pause();
    }
    muted(){
        this.video.muted = true;
    }
    unmuted(){
        this.video.unmuted = true;
    }
    //Este método inicializa todos los plugins asociados con el reproductor de video
    initPlugins(){
        this.plugins.forEach(plugin => {
            plugin.run(this);
        });
    }


}

