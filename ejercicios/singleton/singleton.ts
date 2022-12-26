export default class Singleton{
    private static instance: Singleton;//Propiedad privada y estática de tipo Singleton

    private constructor(){ //Es privado para que no pueda ser instanciada
        //init
    }
    static getInstance(){
        //Debemos validar si la instancia existe o no
        if(!Singleton.instance){
            Singleton.instance = new Singleton();//Creamos la instancia y la guardamos en la propiedad "instance"
        }

        console.log(Singleton.instance);
        return Singleton.instance;
    }
}

