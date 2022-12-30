import MediaPlayer from "../MediaPlayer";//Importamos la clase para que exista este tipo de dato en el archivo
//y así poder tipar con él.

//CLASE AUTOPLAY
//Se crea la clase AutoPlay la cual es un plugin para generar una reproducción automática al cargar el sito web
export default class AutoPlay{
    constructor(){ 
        
    }
     //Enviamos un objeto "player" que contiene las propiedades y métodos de la clase MediaPlayer
    run(player:MediaPlayer){
        //Auto play busca que el video esté en muted para poderlo reproducir
        !player.video.muted ? player.video.muted = true : false//si el video no está muted, se establece en muted
        player.playVideo();
    }
} 