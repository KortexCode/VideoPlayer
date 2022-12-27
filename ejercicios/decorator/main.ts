
const node = (id) => document.querySelector(id);
const email:HTMLInputElement = node("#email");;

class Field{
    errors : string[];
    input: HTMLInputElement;

    constructor(input:HTMLInputElement){
        this.input= input;
        this.errors= [];

        let errorMessage = document.createElement('p');
        errorMessage.className='text-danger';
        //aquí se posiciona la etiqueta p al final dentro de su padre.
        //nextSinbling devolverá nulo, por eso insertBefore tendrá que poner la etiqueta p al final.
        this.input.parentNode?.insertBefore(errorMessage, this.input.nextSibling); 
        this.input.addEventListener('input',()=>{
            this.errors=[];
            this.validate();
            errorMessage.innerText=this.errors[0] || '';
        })
    }
    validate(){}
}

function RequiredFieldDecorator(field:Field):Field{//Esta función es el decorator
    let preValidate = field.validate;//Guardamos el método antes de ser extendido
    field.validate = function(){//Aquí redefinimos o extendemos el método validate()
        preValidate();//Aquí llamamos al método anterior a ser extendido para ejecutar la y todas las validaciones anteriores
        let value = field.input.value;
        if(!value){
            field.errors.push("Campo requerido");
        }
    };
    return field
}
function emailFieldDecorator(field:Field):Field{//Esta función es el decorator
    let preValidate = field.validate;//Guardamos el método antes de ser extendido
    field.validate = function(){//Aquí redefinimos o extendemos el método validate()
        preValidate();//Aquí llamamos al método anterior a ser extendido para ejecutar la y todas las validaciones anteriores
        let value = field.input.value;
        if(value.indexOf("@")===-1){
            field.errors.push("Debes ingresar un email");
        }
    };
    return field
}
let field = new Field(email)
field = RequiredFieldDecorator(field);
emailFieldDecorator(field);
