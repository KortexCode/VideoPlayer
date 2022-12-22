//PROBANDO SCOPE DEL THIS
/* 
class AmbitoAdjunto{
    constructor(){
        this.video = 4;
    }
    probandoAmitoDelThis(){
        const objetoLiteral = {
            video: 5,
            e: function(){
                return this.video;
            },
        }
        return objetoLiteral.e();
    }
}

const test = new AmbitoAdjunto();
console.log(test.probandoAmitoDelThis()); */

//PROXY
/* const target = {
    red : "red",
    green : "green",
    blue : "blue",
}

const handler = {
    get(target, prop){
        
        if(prop in target)
            return target[prop];
        //
        const suggestion = Object.keys(target).find(key => {
            return Levenshtein.get(key, prop) <= 3;
        });
        if(suggestion){
            console.log(`${prop} no se encontró. Quizá quisiste decir ${suggestion}`);
        }
        return target.prop;
    },
}

const p = new Proxy(target, handler); */

//GENERADORES
let hero = [{"name" : "Misaka", "skill": "ElectroMaster"}, {"name" : "Shana", "skill": "FireSword"}];

/* function* showHero(array){

    let x = yield array.map(item => item.name);
    console.log("valor es: ", x);
    yield array.map(item => item.name);
  
}

const generador = showHero(hero);
generador.next(true); //Misaka
generador.next(); //Misaka */
/* console.log(generador.next().value[1]); //Shana
console.log(generador.next().value);    //undefined */


/* function* genere(){
    let id = 1;
    let reset;
    reset = yield id;
    console.log(id);//Muestra este resaultado de segundo
    if(reset){
        console.log("reset es verdadero", reset);//Muestra este resaultado de tercero
    }
}
const doit = genere();
//los next siempre se detienen en el yield que encuentren
const y = doit.next().value;
console.log("el valor", y);//Muestra este resaultado primero
doit.next(true); */

