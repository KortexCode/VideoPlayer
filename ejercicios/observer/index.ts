const node = (id) => document.querySelector(id);
const price:HTMLElement = node("#price");
const input:HTMLInputElement = node("input");


interface Observer{
    update: (data:any)=> void;
}
interface Subject{
    subscribe: (observer:Observer) => void;
    unSubscribe: (observer:Observer) =>void;
}

class BitcoinPrice implements Subject{
    observer: Observer[] = [];//Aquí se guardan las instancias de PriceDisplay

    constructor(input:HTMLInputElement){
        
        input.addEventListener("input", ()=>{
            this.notify(input.value);
        });
    }

    subscribe(observer:Observer){
        console.log("QUE TIPO", observer);

        this.observer.push(observer);
        console.log(this.observer)
    }
    unSubscribe(observer:Observer){
        const index = this.observer.findIndex(obs =>{
            return obs === observer;
        });

        this.observer.splice(index, 1);
    }

    notify(data:any){
        this.observer.forEach(observer => observer.update(data));
    }
}

class PriceDisplay implements Observer{
    private elem:HTMLElement;
    constructor(elem){
       this.elem = elem;//1 Este parámetro contiene a la etiqueta em
    }
    update(data: any){
        this.elem.innerText = data;//Se actualiza el valor de la etiqueta em
    }
}


const display = new PriceDisplay(price);//1 Se crea la instancia de display
//Esta recibe como argumento el valor actual de la etiqueta <em> donde se muestra el texto 
const value = new BitcoinPrice(input);//2 Se crea la instancia de BitcoinPrice
//Esta recibe como argumento el valor actual del input

value.subscribe(display);
value.unSubscribe(display);
