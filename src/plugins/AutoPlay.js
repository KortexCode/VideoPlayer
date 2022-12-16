//CLASE AUTOPLAY
//Se crea la clase AutoPlay la cual es un plugin para generar una reproducción automática al cargar el sito web
export default class AutoPlay{
    constructor(){ 
        
    }
    //Se crea la función run, esta función recibirá la clase MediaPlayer como parámetro
    run(player){
        //la clase MediaPlayer puede ejecutar sus funciones internas
        player.muted();
        player.playVideo();
    }
}