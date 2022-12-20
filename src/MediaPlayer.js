//CLASE MEDIA PLAYER
//Se crea una clase la cual manejará el comportamiento del reproductor de video.
export default class MediaPlayer{
    constructor(config){
        this.video = config.video;
        this.plugins = config.plugin || [];
        //cualquier instancia de esta clase llamará a la función iniciadora de plugins apenas sea declarada
        this._initPlugins();
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
    _initPlugins(){
        const player = {
            conso: console.log(this),
            play: () => this.playVideo(),
            pause: () => this.pauseVideo(),
            video: this.video,
            get muted(){
                console.log(this)
                return this.video.muted;
            },
            set muted(value){
                this.video.muted = value;
            }

        }
        player.conso;
        this.plugins.forEach(plugin => {
            plugin.run(player);
        });
    }

}

