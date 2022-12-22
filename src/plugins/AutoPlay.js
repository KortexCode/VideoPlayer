//CLASE AUTOPLAY
//Se crea la clase AutoPlay la cual es un plugin para generar una reproducción automática al cargar el sito web
export default class AutoPlay{
    constructor(){ 
        
    }
     //Enviamos un objeto "player" que contiene las propiedades y métodos de la clase MediaPlayer
    run(player){
        //Auto play busca que el video esté en muted para poderlo reproducir
        !player.muted ? player.muted = true : false//si el video no está muted, se establece en muted
        player.play();
    }
} 