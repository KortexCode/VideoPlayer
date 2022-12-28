//CLASE MEDIA PLAYER
//Se crea una clase la cual manejará el comportamiento del reproductor de video.
export default class MediaPlayer{
    video:HTMLMediaElement;
    plugins:any[];
    container:HTMLElement;
    constructor(config){
        this.video = config.video;
        this.plugins = config.plugin || [];
        //cualquier instancia de esta clase llamará a la función iniciadora de plugins apenas sea declarada
        this.initMediaPlayer();
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
        this.video.muted= false;
    }
    private initMediaPlayer(){
        this.container = document.createElement("div");
        this.container.classList.add("VideoContainer");
        this.container.style.position = "relative";
        this.video.parentNode?.insertBefore(this.container, this.video);
        this.container.appendChild(this.video);
    }
    //Este método inicializa todos los plugins asociados con el reproductor de video
    private initPlugins(){
        this.plugins.forEach(plugin => {
            plugin.run(this);
        });
    }

}

