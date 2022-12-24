console.log("Quiero jugar WOW pero juego Epic Seven");

//TIPADO
let boovariable1 = true; //ts establece como booleano la variable
boovariable1 = false; //ts permite re definir con el mismo tipo de dato
/* boovariable1 = 2; */ //Da error porque la variable fue establecida como booleano antes al ser declarada
let boovariable2:boolean = true; //con esta notación podemos mostrar el tipo de variable de forma visible

//con números
let cantidad:number = 2;
let cantidad2 = 3;
const resultado = cantidad + cantidad2;//ts sabe que el resultado es tipo número
//Ya no se puede hacer algo como "2"+2 = 4; como antes cuando js forzaba la operación

//con string
const nombre:string = "Misaka";
const lectura = `Personaje ${nombre}`;//ts sabe que lectura es un string

//ARREGLOS
//En ts podemos definir si queremos que el arreglo sea de un tipo específico o de diversos tipos
let character: string[] = [];
character = ["Roana", "Violet", "Luluca"];
/* character.push(2); */ //No deja agregar un elemento que no sea de tipo string
let bosses : Array<string | number> = ["Straze", "Archidimon", 100];
/* bosses.push(true); */ //ts no deja ya que sólo admite números y strings para ese array

//ENUMERABLES
 enum color{
    rojo,
    verde,
    amarillo,
 }

 const favorito = `Mi color favorito es ${color.amarillo}`;//El enumerable le da un número a cada valor en ese orden
 console.log(favorito)//Mi color favorito es 2

 enum colores{
    rojo = 2,
    amarillo = "amarillo",
 }
 const favorito1 = `Mi color favorito es ${colores.amarillo}`;//El enumerable otorga el valor asignado
 console.log(favorito1)//Mi color favorito es amarillo
 //ts sabe que favorito y favorito1 son strings

 //ANY
 let joker:any = "el string";
 joker = {game:"super Mario"};//ts deja cambiar el tipo de dato si se establece como any

 //OBJECT
 const ob:object = {game:"super Mario"};
