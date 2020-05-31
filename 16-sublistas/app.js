const input = document.getElementsByTagName('input');
const btnTitle = document.getElementsByClassName('btnTitle');
const btnItem = document.getElementsByClassName('btnItem');
const btnCierre = document.getElementsByClassName('btnCierre');
const btnReset = document.getElementsByClassName('btnReset');
// const titulo = document.querySelector('.titulo');
// const itemContainer = document.getElementsByClassName('item_container');

const displayText = document.querySelector('.displayText');

const container = document.getElementsByClassName('container');



let tituloLista;
let items= [];
let lista = [];
let nro= 0;

const arrPrincipal = () => {

    // if(input[0].value == ""){
    //     alert('el campo no puede estar vacio')
    //     btnTitle[0].disabled = false;
    //     return
    // } 

    tituloLista = input[0].value;

    container[0].innerHTML += '<div class="titulo"><h3 class="titulo_lista">'+tituloLista+ '</h3></div>'; 


}

const funcionItems = () => {

    if(input[0].value == ""){
        alert('el campo no puede estar vacio')
        return
    } 

    contenidoItem = input[0].value;

        
    nro += 1;
    container[0].innerHTML += '<div class="item_container"><input class="item__checkbox" type="checkbox" name="" id=" '+nro+'"><label class="item" for=" '+nro+'" > ' +contenidoItem+'</label></div> ';

    
    
    input[0].value = "";

    
    items.push(contenidoItem)

    

}

/* Botones */
btnTitle[0].addEventListener('click', () => {

    //esta alerta lo tengo que poner aca para q no me deshabilite el boton si el campo esta vacio. sino lo deshabiklita y hay q presionar Nueva Lista para habilitarlo y me genera un array vacio.
    if(input[0].value == ""){
        alert('el campo no puede estar vacio')
        btnTitle[0].disabled = false;
        return
    } 

    arrPrincipal();
    input[0].value = "";

    input[0].placeholder = "ingrese los items de su lista";
    displayText.innerHTML = "Ingrese sus items"

    btnItem[0].disabled = false;
    btnTitle[0].disabled = true;
    btnCierre[0].disabled = false;
    btnReset[0].disabled = true;
})



btnItem[0].addEventListener('click',() => {
    
    
    funcionItems();

    btnReset[0].disabled = true;
    input[0].value = "";
})


btnCierre[0].addEventListener('click', () => {
    
    btnTitle[0].disabled = false;
    btnItem[0].disabled = true;
    lista.push (items);

    input[0].placeholder = "Ingrese el titulo ";
    displayText.innerHTML = "Ingrese el titulo de su lista:";

    input[0].value = ""; 
    btnCierre[0].disabled = true;
    btnReset[0].disabled = false;
    return items = [];
    
        
    
})

btnReset[0].addEventListener('click', () => {
    
    let pregunta = confirm('Seguro desea eliminar todo?')

   
    if (pregunta) {
        container[0].innerHTML = "";
        lista = [] ;
    } else {
        return
    }
    
})   


/*
Como funciona?

1. tuve q especificar que item es un array. entonces todo lo que cargan cuando abretan el boton de "cargar item a lista", me lo englobe todo en un array, con la funcion push

2. dentro de la funcion del boton "titulo"
habia puesto:

    if(items.length > 0){
        lista.push (items);
        return items = [];
    }

 COn esto lograba, FINALEMNTEEE, que me suba al array ppal, cada array de item. Pero el probrema era que tenia que si o si volver a ingresar un "titulo" para que me cargue el subarray.

 Entonces cree un btn "NUeva LIsta", que me ejecuta la funcion:

     lista.push (items);
    return items = [];

que logro con esto? que una vez que me empuja el array items al array lista, me devuelva array items en cero, para una nueva carga. 
si no siempre me concatenada todos los items.

3. para que sea funcional, puse que cuando cargan un titulo , se anule el boton, entocnes si o si tiene que apretar NUEVA lista para habilitarlo neuvamente.

pinchando el boton nuevalista es que enero el maldit@ array 2d :D


*/



