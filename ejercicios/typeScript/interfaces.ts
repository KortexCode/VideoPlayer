enum Color {
    rojo = "rojo",
    verde = "verde",
}
interface Rectangulo {
    ancho: number;
    alto:number;
    color?:Color,//Podemos poner una propiedad opcional en la interface
}
let rect: Rectangulo= {
    ancho: 5,
    alto:4,
    color: Color.rojo,
}
//Esta función recibe un argumento de tipo Interface
function area(r: Rectangulo):number {
    return r.alto * r.ancho;
}

const areaRect = area(rect);
console.log(areaRect);
console.log(rect.toString);

//El método toString puede ser re definido
rect.toString = function(){
    return this.color ? `Un rectángulo ${this.color}` : "Un rectángulo";
}
//Al usar nuevamente el método toString ya se verá como la cadena retornada en la función
console.log(rect.toString());
