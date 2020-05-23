const btn = document.getElementsByTagName('button');
const list = document.querySelector('.list');
const input = document.getElementsByTagName('input');
const displayPregunta = document.querySelector('.displayPregunta');




let tareaModificar;
const tareas = [];

/* Funciones */

const agregarTarea = () => {
    
    //necesito que retener tengo un valor 0, por sino me tira undefined
    let retener = "";
    
    if(input[0].value == "") {
        alert('El campo no puede estar vacio')
        return
    }
    
        tareaAgregada = input[0].value;
    
        tareas.push(tareaAgregada);

        for(let i = 0; i < tareas.length;i++ ){
           
            retener += '<p><input class="item__list" type="checkbox" name="" id="' + i + '"><label class="item" for="' + i + '">' +  i + ". " + tareas[i] + '</label></p>'  ;
            
                list.innerHTML = retener;
               
                input[0].value = "";
               
                displayPregunta.innerHTML = "Tarea Ingresada";  
               
            }   
        
         setTimeout(() => { 
                    displayPregunta.innerHTML = "Ingrese la tarea que quiera agregar";
                }, 1000);
    
}

const modificarTarea2 =() => {

    const nuevaTarea = input[0].value;

    if(input[0].value == "") {
        alert('El campo no puede estar vacio')
        return
    }
    
    tareas[tareaModificar] = nuevaTarea;

    //     //necesito que retener tengo un valor 0, por sino me tira undefined
    let retener = "";

    for(let i = 0; i < tareas.length;i++ ){
        // retener += '<li class="list__item">' + tareas[i] + '</li>'
        retener += '<p><input class="item__list" type="checkbox" name="" id="' + i + '"><label class="item" for="' + i + '">' + 'Nro: '+ i + " " + tareas[i] + '</label></p>'  ;
        
            list.innerHTML = retener;
           
            input[0].value = "";
           
            displayPregunta.innerHTML = "Tarea Modificada";  
           
        }   
    console.log(tareas)
 

    setTimeout(() => { 
        displayPregunta.innerHTML = "Ingrese el nro de la Tarea a modificar";
    }, 1000);
}

const modificarTarea = () => {
    
    tareaModificar = input[0].value;

    if(input[0].value == "") {
        alert('El campo no puede estar vacio')
        return
    }
    else if (input[0].value > (tareas.length -1) ){
        alert('El nro de tarea ingersado no existe')
        input[0].value= ""; 
        return
    }

   const decisionUsuario = confirm(`Seguro quiere modificar la tarea: ${tareas[tareaModificar]}`);

   
     if (decisionUsuario ) {
        input[0].value= "";  
        displayPregunta.innerHTML = "Modifique su tarea"
        input[0].value = tareas[tareaModificar];
        sacarFunciones();

        btn[4].addEventListener('click', modificarTarea2)
        
        
     }
   
}


const eliminarTarea = () => {
    
    const tareaEliminar = input[0].value;
         console.log(tareaEliminar);
        
    if(input[0].value == "") {
        alert('El campo no puede estar vacio')
        return
    }
    else if (input[0].value > (tareas.length -1) ) {
        alert('El nro de tarea ingersado no existe')
        input[0].value= ""; 
        return
    }
    

    const decisionUsuario = confirm(`Seguro quiere eliminar: ${tareas[tareaEliminar]}`);

    
    if (decisionUsuario ) {
        
        const eliminar = tareas.splice(tareaEliminar, 1)

        //necesito que retener tengo un valor 0, por sino me tira undefined
        let retener = "";

        for(let i = 0; i < tareas.length;i++ ){
            retener += '<p><input class="item__list" type="checkbox" name="" id="' + i + '"><label class="item" for="' + i + '">' + 'Nro: '+ i + " " + tareas[i] + '</label></p>'  ;

                list.innerHTML = retener;
               
                input[0].value = "";
               
                displayPregunta.innerHTML = "Tarea Eliminada";  
               
            }   
        console.log(tareas)
    }
    
    setTimeout(() => { 
        displayPregunta.innerHTML = "Ingrese el nro de la Tarea a Eliminar";
    }, 1000);
    
    
}


// esta funcion sirve para remover al boton GO todos los eventes que tiene, entonces, cuando lo utilizo con otro boton ppal, no me arrastra el evento del boton anterior (los btns ppales son: agregar., modificar y eliminar)
const sacarFunciones = () => {
    btn[4].removeEventListener('click', agregarTarea);
    btn[4].removeEventListener('click', modificarTarea);
    btn[4].removeEventListener('click', eliminarTarea);
    btn[4].removeEventListener('click', modificarTarea2);

    
}


/* Botones */

btn[0].addEventListener('click', () => {

    sacarFunciones();

    displayPregunta.innerHTML = "Ingrese el nombre de la tarea que quiera agregar";

    btn[4].addEventListener('click', agregarTarea);
    
});

btn[1].addEventListener('click', () => {
    
    sacarFunciones();

    displayPregunta.innerHTML = "Ingrese el nro de la Tarea a modificar";

    btn[4].addEventListener('click', modificarTarea)

});


btn[2].addEventListener('click', () => {
    
    sacarFunciones();
    
    displayPregunta.innerHTML = "Ingrese el nro de la Tarea a Eliminar";

    btn[4].addEventListener('click', eliminarTarea)
    
});

btn[3].addEventListener('click', () => {
    
    const userDesicion = confirm('Seguro desea eliminar toda la lista?');

    if(userDesicion){
        tareas.splice(0);
        list.innerHTML = "";
    }

    
    
});


//cuando ingresan elinput y le dan enter, que se ejecute el evento click al boton Go
input[0].addEventListener('keyup', (e) => {

    // Number 13 is the "Enter" key on the keyboard
    if(event.keyCode === 13){
        btn[4].click();
    }
})



