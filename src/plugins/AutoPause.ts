import MediaPlayer from "../MediaPlayer";//Importamos la clase para que exista este tipo de dato en el archivo
//y así poder tipar con él.

export default class AutoPause{
    private video:HTMLMediaElement;
    constructor(video){
        
        this.video = video;
    }
  
    run(player:MediaPlayer){
        //Definimos el objeto que llevará las opciones o configuración del observador
        const ratio = {
            threshold : 0.25,
        }
        //Luego creamos una instancia de la clase InstersectionObserver
        //En este caso la funciñon callback es definidad directamente como parámetro
        const observer = new IntersectionObserver((entries:IntersectionObserverEntry[]) =>{
            //Extraemos la entrada en la primera posición(ya que sólo hay una)
            const entry= entries[0];
            //Se compara si la cantidad de piixeles visibles del video es mayor menor a su 25%
            const isVisible = entry.intersectionRatio >= ratio.threshold;
            //Si es mayor, hará play; si menor, hará pause.
            if(isVisible){
                console.log("entro a play")
                player.playVideo();
            }
            else{
                console.log("entro a pause")
                player.pauseVideo(); 
            }
            
        }, ratio/*Aquí va el objeto de configuración */);
        
        //Observamos la etiqueta video de la página
        observer.observe(this.video);

        document.addEventListener("visibilitychange", ()=>{
            //Si el estado es visible hará play al video, de lo contrario será pause
            if (document.visibilityState === "visible")
                player.playVideo();
            else
                player.pauseVideo();
        })
        
    }
}