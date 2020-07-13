/* GENERALES */

//mientras img se carga
const imgIsLoading = (imgID) => {
    const img = document.getElementById(`${imgID}`);
    img.classList.remove("img-is-loading") 
}


/* SECCION MENU*/
let selectedTab;
const displayTab = ( tab) => {
      if (selectedTab) { // remove is-active from last selectedTab
        selectedTab.classList.remove('is-active');
      }
      selectedTab = tab;
      selectedTab.classList.add('is-active');

};

const displaySection = (link) => {

    tabSection.forEach( tab => {
        //le saco el # al href asi queda la palabra pelada
        let newLink = link.hash.substring(1);
      

        if (tab.id === newLink) { 
            tab.classList.remove('is-hidden');
          }
        else {
            tab.classList.add('is-hidden');
        }
    
    });
};


/* SECCION RAnDOM*/
const getRandom = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search/");
    const data = await response.json();
    
    // if(!response.ok){
    //     alert("algo salio mal")
    // }
    
    imgRandom.src = data[0].url;
     
};

/* SECCION RAZAS*/
let breedDetails;
let breedFull; 


//Funcion gral para traer ID con un name
const getID = (name) => {
    console.log(name)
    let breed = breedDetails.filter(breed => breed.name == name)
    console.log(breed)
    return breed[0].id
}

//para que cuando arrancar la pagina, ya disponer de las razas
//getBreeds()


// aparezcan opciones de razas en dropdown
const dropBreedDisplay = (data) => {

    dropBreed.innerHTML = data.reduce( (html, breed) => {

        return html + 
        `
        <option onchange="optionSelected('${breed.id}')" value='${breed.id}' >${breed.name}</option>    
        `
    },"");

    optionSelected(dropBreed[0].value)   

}
//cuando seleccionas una opcion que te muestre el contendo de la raza
const optionSelected = async (selected) => {
   

    let data;
    let dataImg;
    if(selected.length > 4){
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/${selected.value}`);
         data = await response.json();

        const responseImg = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${selected.value}`);
         dataImg = await responseImg.json();
    }
    else {
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/${selected}`);
         data = await response.json();

        const responseImg = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${selected}`);
         dataImg = await responseImg.json();

    }

    //img
    imgBreed.src = dataImg[0].url

    //Mostrar titulo
    titleBreed.innerHTML = data.name;

    //Mostrar descripcion
    detailBreed.innerHTML = data.description;

    //Mostrar tags
    //1. primera extraigo los temperaments, q es un string. el map me crea 1 arr con 1 solo item que es el string
    let temperament = data.temperament
    let arrTemperament = temperament.split(",")
    
    //2. a ese item del arr le hago un split y dsps un reduce para imprimir los tags
    tagBreed.innerHTML =  arrTemperament
        .reduce( (html, tag) => {
            return html + `
            <span class="tag"> ${tag}</span>
            `
        },"")
 }
 
 

/* SECCION BUSCADOR RAZAS*/


const searchBreedRT = async (input) => {
    
  
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();

    let result = data.filter( breed => {
        return ((breed.name).toLowerCase()).includes(input)
    })

    tableBreedSearch.innerHTML = result.reduce( (html, cat) => {
        return html + 
        `
        <tr>
            <td ><a onclick="btnRedirect('${cat.name}')">${cat.name}</a></td>
        </tr>
        `
    },"")

};

//cuando pincho el btn Buscar que me muestre la raza en #breeds
const btnRedirect = (name) => {
    
    console.log(name)
    const menuBreed = document.getElementById("breeds");
    let result = breedDetails.filter( cat => {
        return (cat.name).toLowerCase() == name.toLowerCase();
    });
    
    optionSelected(result[0].id);

    //estas proximas lineas me sirven para que en el dropdown me aparezca en nombre del gato que elegi en "buscador razas"
    arrayDropdownOption = [...dropBreed.children]
   arrayDropdownOption.forEach(item => {
    
        if(item.textContent == name){
            console.log(item.index)
            dropBreed.selectedIndex = item.index
           
        }
    })

   
    
    displayTab(menuBreed);
    displaySection(menuBreed.children[0]);

};


/* SECCION BUSCADOR FILTROS */
const displayFilterAll =  (data) => {
    console.log("llego data displayFilter", data)
    
        breedResult.innerHTML = breedFull.reduce( (html, breed,i) => {
        
            return html + 
                `
                <div id="${breed.id}" class="column is-6 ">
                <div class="card">
                    <div class="card-image ">
                    <figure  class="image is-4by3 imgFilter">
                        <img 
                        src="${breed.url}"
                        alt="${breed.name}" class="imgFiltros" 
                        />
                    </figure>
                    </div>
                    <div class="card-content">
                    <p class="title is-5">${breed.name}</p>
                    </div>
                </div>
                </div>
                `
        },"");
    
 }


let arrAll = []
const applyFilter =  (idInput, isCheched) => {

    //este arrayDivCards es un array con todos los divs que imprimen las cards
    let arrayDivCards = [...breedResult.children]

    if(isCheched){
        //en esta linea lo que hago es: si se presiono un filtro, entonces escondeme todas las cards
        arrayDivCards.forEach(item => {
            return item.classList.add("is-hidden")
        })
        //Aca encuentro los objetos que tengo que imprmir
        let result = breedFull.filter(cat => cat[idInput] == 1)
               
        arrAll.push(result)

        let arrayDivResult = [];
        //Matcheo los objetos que tengo que imprmir con los divs que imprimen esos objetos. Los matcheo con los id. los pusheo a arrayDivResult
        arrayDivCards.forEach( (item, i) => { 
           
            arrAll.flat().forEach(obj => {
            
               if(obj.id === item.id ){
                                
                  arrayDivResult.push(item)
               }  
                
            })
         })
       //les saco la clase is-hidden para que se vean
        arrayDivResult.forEach(div => {
            
          return  div.classList.remove("is-hidden")

        })
       
    }
    else {
        //esta parte es si el filtro esta desclickeado. este result me devuelve los objetos que tengo que sacar
        let result = breedFull.filter(cat => cat[idInput] == 1)

        let arrayDivResult = [];
        //Aca matcheo los objetos que tengo que ocultar con los divs que imprimen esos objetos. Los matcheo con los id.
        arrayDivCards.forEach( (item, i) => { 
           
            result.forEach(obj => {
            
               if(obj.id === item.id ){
                      arrayDivResult.push(item)
               }  
                
            })
        })
       //agrego a esos objetos la class is-hidden
        arrayDivResult.forEach(div => {
            
          return  div.classList.add("is-hidden")

        })

        //Aca limpio el arrAll para q no siga acumulando cosas
        arrAll.forEach( itemArr => {
            if(itemArr.length == result.length){
            
                if( itemArr.every((item, i) => { return item.id === result[i].id})){
                       
                    //Elimino de arrAll lo q no va mas
                    let index = arrAll.indexOf(itemArr)
                    arrAll.splice(index,1)

                    //desde la linea 460 hasta la 476 sirve para que todos los resultados q tienen q verse, se vean. porq me estaba eliminando los duplicados.
                    let arrayDivResult = [];

                    arrayDivCards.forEach( (item, i) => { 
                    
                            arrAll.flat().forEach(obj => {
                        
                                if(obj.id === item.id ){
                                
                                    arrayDivResult.push(item)
                                }  
                         })
                    })
                
                    arrayDivResult.forEach(div => {
            
                        return  div.classList.remove("is-hidden")
              
                    })
                }
            }
        })

        if(arrAll.length == 0){
            arrayDivCards.forEach(div => {
                        
                return  div.classList.remove("is-hidden")

            })
        }
        
    }
    //imprimir el count
    resultCounts.innerHTML =` ${arrAll.flat().length} resultado(s) ` ;
    if(arrAll.length == 0){
        resultCounts.innerHTML =` ${breedResult.childElementCount} resultado(s) ` ;
     }

}



/*traer Informacion */

//getInfo y getFullBreed sirven para Filtros, esta separado porque sino todo tarda mucho en cargar.
const getFullBreed = async (data) => {
     //breedFull
     let arrUrlImg =[];

     let arrID = data.map(item => {
         return item.id
     })

     for(let id of arrID){

         const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${id}`);
         const data = await response.json();
         arrUrlImg.push(data[0].url)
         
     }

     let i= 0;
     for (item in data){
     
         breedFull = data
         breedFull[item].url = arrUrlImg[i]
         i++
     }
     console.log("breedFull",breedFull)
     return breedFull

}

const getInfo = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();
    console.log(data)
    return data
}

//esta funcion trae lo mismo que getInfo pero dispongo de la info mas rapido, casi que el dropdown o el buscador de razas dispongan de la info mas rapido
const getBreeds = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();
   
    breedDetails = data;
    return data
    
}

//aca raigo el array gral. cuando carga ejecuto la funcion fullBreed, le agrega a cada obj la url de la img. por ultimo ejecuto displayFilter para que me iprima las cards
getInfo()
    .then(getFullBreed)
    .then(displayFilterAll)
getBreeds()
    .then(dropBreedDisplay)
   


