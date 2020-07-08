
const btn = document.getElementsByTagName('button')
const displayResultado = document.getElementsByClassName('mostrarResultado');

let tamanio = [50, 75, 100, 120]
let armario = 250;
let newVar = [];
let posibilidades = [];


/* 3er PASO */


const cuantasVecesEntra = (option) => {


    //ahora tengo que sacar del array la opcion que me trae.
    indice = tamanio.indexOf(option)
    tamanio.splice(indice,1)
    //console.log(tamanio)

    
    let resultado = armario - option;

    for (let j = 0; j< tamanio.length; j++){
        

        if (Number.isInteger(resultado2 = resultado / tamanio[0])){
            //console.log(tamanio[0])
            console.log(`${j+1} de ${option}  + ${resultado2} de ${tamanio[0]}`)
            posibilidades.push(`${j+1} de ${option}  + ${resultado2} de ${tamanio[0]}`)
        }
     
        
        if (Number.isInteger(resultado2 = resultado / tamanio[1])){
            //console.log(tamanio[1])
            console.log(`${j+1} de ${option} + ${resultado2} de ${tamanio[1]}`)
            posibilidades.push(`${j+1} de ${option} + ${resultado2} de ${tamanio[1]}`)
        }
       
        resultado -=   option
     }

    //necesito volver a ingrear la opcion que saque, para lo proxima vuelta.
    tamanio.push( option)
    
}

/* 2DO PASO 

QUE NUMERO ENTRA ENTERO
*/
const nroEntraEntero = () => {
    for (let j = 0; j< tamanio.length; j++){
        
        let i= 0;

        while (i <armario){
            i++;
            //console.log(i, j)
            resultado = tamanio[j] * i

            //console.log(resultado)
        
            if(resultado === armario){
             console.log(`${tamanio[j]} entra ${i} veces el armario `);
             posibilidades.push(`${tamanio[j]} entra ${i} veces el armario `)
             break   
            }
            else if (resultado > armario) {

                //este newVar es para que solo me separa las opciones que no dejan un resto de 0 (% ) que van a ser 75 y 100
                 newVar.push(tamanio[j])

               break        
            }
        }
    }
    //tengo que llamar a esta funcion fuera del for, sino me trae errores.
  
    newVar.map(cuantasVecesEntra);
}



/* 1er PASO */

//aca descarto al 120, porq no puedo utilizarlo con nada
const funcion25 = (option) => {

    if (option % 25 !== 0){
        
        //console.log(option % 25)
        indice = tamanio.indexOf(option);

        //console.log(indice)
      tamanio.splice(indice,1)

      return tamanio
        
    }
}

const funcionPrimera = () => {

    tamanio.map(funcion25)
}




funcionPrimera();

nroEntraEntero(tamanio);


btn[0].addEventListener('click', () => {

    displayResultado[0].innerHTML = 
    " Las diferentes opciones son: \n <ul>" +  posibilidades.reduce( (html, opcion) => {
        return html + 
        ` 
        <li>${opcion} </li>
        `
    },"")
    "</ul>"
})

