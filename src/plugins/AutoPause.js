export default class AutoPause{
    constructor(video){
        this.video = video;
    }
  
    run(player){
        //Definimos el objeto que llevará las opciones o configuración del observador
        const ratio = {
            threshold : 0.25,
        }
        //Luego creamos una instancia de la clase InstersectionObserver
        //En este caso la funciñon callback es definidad directamente como parámetro
        const observer = new IntersectionObserver(entries =>{
            //Extraemos la entrada en la primera posición(ya que sólo hay una)
            const entry= entries[0];
            //Se compara si la cantidad de piixeles visibles del video es mayor menor a su 25%
            const isVisible = entry.intersectionRatio >= ratio.threshold;
            //Si es mayor, hará play; si menor, hará pause.
            if(isVisible){
                console.log("entro a play")
                player.play();
            }
            else{
                console.log("entro a pause")
                player.pause(); 
            }
            
        }, ratio/*Aquí va el objeto de configuración */);
        
        //Observamos la etiqueta video de la página
        observer.observe(this.video);

        document.addEventListener("visibilitychange", ()=>{
            //Si el estado es visible hará play al video, de lo contrario será pause
            if (document.visibilityState === "visible")
                player.play();
            else
                player.pause();
        })
        
    }
}