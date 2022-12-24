function suma(a:number, b:number):number{
    return a+ b;
}
const sum = suma(3, 4);//ts me dice que tipo son los argumentos y que tipo de dato retorna

//Se define una función que retorna una función, además los parámetros que recibe y qué retorna
function retorno(a:number):()=>void{
    return function add(){
        console.log("ayer")
    }
}
let call = retorno(3)
console.log(call());// el resultado será 6

//Argumentos opcionales
function fullname(firtsName:string, lastName?:string):string{
    return `${firtsName} ${lastName}`;
}
console.log(fullname("Mikoto"));//Al poner last name como opcional el valor retornado será "Mikoto undefined"

//Poner valores por defecto en caso de omisión
function fullname2(firtsName:string, lastName:string="otroApellido"):string{
    return `${firtsName} ${lastName}`;
}
console.log(fullname2("Mikoto"));
