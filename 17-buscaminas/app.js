/* Ejercicio Buscaminas */
const tablero =
[
  ['📦', '💣', '📦'],
  ['📦', '📦', '💣'],
  ['💣', '💣', '📦']
]

const taleroL2 = [
    ['📦', '💣', '📦'],
    ['📦', '📦', '💣'],
    ['💣', '💣', '💣'],
    ['📦', '💣', '📦'],
    ['💣', '📦', '📦'],
    ['📦', '📦', '💣']
]

const btnGame = document.querySelectorAll('.btn--game'); //de esta forma me toma todos los botones, incluso los que creo con JS
const mainContainer = document.querySelector('.main_container');
const container = document.querySelector('.container');
const container2 = document.querySelector('.container2');
const btnReset = document.querySelector('.btn--reset');
const btnLevel = document.querySelectorAll('.btn');
const displayText = document.getElementsByClassName('displayText');

let newTablero = tablero.flat();
let newTablero2 = taleroL2.flat();

/*----- ESTO ES SIN USO: 
//este for me sirve para llegar a cada uno de los items del array2d y me los muestre como botones
// for (let i= 0; i< tablero.length; i++ ) {

//     option = tablero[i];
    
//     for(let i= 0; i < option.length; i++ ){

        
//         container.innerHTML += '<button  class="btn">' + option[i] + '</button>';

//     }
// }
----------------------- */

//esta funcion, q la uso con .filter, me devuelve un array solo con las cajas. sacando el length de este array de solo cajas, puedo mechar con la funcion de clicks y saber cuando gano la persona sin pinchar una bomba
const cantCajas = (option) => {
    return option == '📦'
}

const changeTablero = (tablero) => {

    //este counter me sirve para la funcion clickCount 
let counter = 0;

    for(let i= 0; i < tablero.flat().length; i++ ){

        //esta funcion me sirve para contar la cantidad de veces que hacen click en un btnGame.
        const clickCount = () => {
            btnGame[i].onclick = counter++;

           // console.log(`el counter: ${counter}`)
        }
        
        

        btnGame[i].addEventListener('click', () => {
        
            console.log(i, btnGame[i].clicked)
            btnGame[i].innerHTML =  tablero[i] ;

            //tengo que llamar a esta funcion dentro de la ejecucion del boton, caso contrario no cumple su funcion de contar los clicks
            clickCount();
            
            if (btnGame[i].innerHTML == "💣"){
                
                alert("BOOOOOM ud encontro una 💣 - Perdio");
        
                check(tablero)
                
            }

            //aca uso la funcion del contador de clicks + la funcion que me devuelve el lenght del array de cantidad de cajas. si la persona pincha sobre todas las cajas, sin tocar la bomba, entonces gana.
             if (counter  == tablero.filter(cantCajas).length) {
                 
                alert('ud ganoooo!!! iujuuuu')
                check(tablero);
            }
            
        })
    }
}

const check = (tablero) => {

    for (let i = 0; i < tablero.length; i++){
        btnGame[i].disabled = true;
    }
    
}

btnReset.addEventListener('click', () => {
    btnReset.disabled = false;
    btnLevel[1].disabled = false;
    btnLevel[0].disabled = false;

    displayText[0].innerHTML = "Seleccione su Nivel:";

    // for (let i = 0; i < 18; i++){
    //     btnGame[i].disabled = false;
    //     btnGame[i].innerHTML = "";
    // }
    location.reload()
}) 

btnLevel[0].addEventListener('click', () => {
    btnLevel[0].disabled = false;

    displayText[0].innerHTML = "";

    container2.style.display = "none";
    btnLevel[1].disabled = true;

    changeTablero(newTablero)
    
})

btnLevel[1].addEventListener('click', () => {
    btnLevel[1].disabled = false;

    displayText[0].innerHTML = "";
           
    container2.style.display = "inline-block";
    btnLevel[0].disabled = true;   
    
    changeTablero(newTablero2)
})



