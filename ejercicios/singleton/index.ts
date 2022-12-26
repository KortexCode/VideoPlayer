import Singleton from "./singleton";

const a = Singleton.getInstance();
console.log("la instancia a", a)
const b = Singleton.getInstance();
console.log("la instancia b", b)

console.log("A es igual a B?", a === b);