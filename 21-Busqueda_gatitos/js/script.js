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

//PASO 1: aca traigo todas las razas
const getBreeds = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();
   
    breedDetails = data;

    //para mostrar razas en dropdown
    dropBreedDisplay(breedDetails)
    
    //armar objeto completo q tengo la url de img
    obtainBreedFull(breedDetails)
    
    encontrarIMG(breedDetails)
    
    
}
/* pruebas  carga imgenes --------------------------*/
let urlImg;
const encontrarIMG = async (data) => {
    data.map( async (item) => {

        const response2 = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${item.id}`);
        const data2 = await response2.json();
        urlImg = data2[0].url
    })
}
encontrarIMG()

let breedFull; 
//quiere tener un objeto que ya tega la url de imagenes
const obtainBreedFull = async (info) => {
    let arrUrlImg =[];

    let arrID = info.map(item => {
        return item.id
    })

    for(let id of arrID){

        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${id}`);
        const data = await response.json();
        arrUrlImg.push(data[0].url)
        
    }

    let i= 0;
    for (item in breedDetails){
      
        breedFull = breedDetails
        breedFull[item].url = arrUrlImg[i]
        i++
    }
    

    //para filtro 
    displayFilterAll(breedFull)
}



//para que cuando arrancar la pagina, ya disponer de las razas
getBreeds()
obtainBreedFull()

//PASO 2: aparezcan opciones de razas en dropdown
const dropBreedDisplay = (data) => {

    dropBreed.innerHTML = data.reduce( (html, breed) => {

        return html + 
        `
        <option onclick="fetchBreedDetail('${breed.id}')">${breed.name}</option>    
        `
    },"");

}

//PASO 4: mostrar img de la raza seleccionada


const displayBreedImg = async (id) => {

    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${id}`);
    const data = await response.json();
    

    imgBreed.src = data[0].url

};


//PASO 5: mostrar detalle de la raza seleccionada
const displayBreedDetails =  (data) => {

    //Mostrar titulo
    titleBreed.innerHTML = data[0].name;

    //Mostrar descripcion
    detailBreed.innerHTML = data[0].description;

    //Mostrar tags
    //1. primera extraigo los temperaments, q es un string. el map me crea 1 arr con 1 solo item que es el string
    let temperament = data.map( item => {

        return item.temperament
         
    })
    //2. a ese item del arr le hago un split y dsps un reduce para imprimir los tags
    tagBreed.innerHTML =  temperament[0]
        .split(",")
        .reduce( (html, tag) => {
            return html + `
            <span class="tag"> ${tag}</span>
            `
        },"")
    

};


//PASO 3 : con el array q contiene todas las razas hago un filter del ID al que hicieron click. solo el array con todas las razas tiene toda la info
const fetchBreedDetail = async (id) => {
    
    let result = breedDetails.filter(breed => {
        return breed.id === id;
    })
    
    //mostrar imagen
    imgBreed.classList.add("img-is-loading") 
    //displayBreedImg(id);
    displayBreedImg(id)

    //mostrar descripcion
    displayBreedDetails(result)

    
};




/* SECCION BUSCADOR RAZAS*/
const buscadorRazas = async (input) => {
    console.log(input)
    let result = breedDetails.filter( cat => {
        return cat.name == input;
    })
    console.log(result)
    // const response = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${result[0].id}`);
    // const data = await response.json();

    tableBreedSearch.innerHTML = result.reduce( (html, cat) => {
        return html + 
        `
        <tr>
            <td>${cat.name}</td>
        </tr>
        `
    },"")
   
};

const searchBreedRT = async (input) => {
  
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();

    let result = [];
    

    for(let i = 0; i < data.length; i++){
        
        
        for(let j = 0; j < input.length; j++){
            

            if(data[i].name.startsWith(input)){
            
                if(!result.includes(data[i])){
                    
                    result.push(data[i])
                }
                else {
                    break;
                }
            }
            else{
                break;
            }
            
    
        }
    }

    tableBreedSearch.innerHTML = result.reduce( (html, cat) => {
        return html + 
        `
        <tr>
            <td>${cat.name}</td>
        </tr>
        `
    },"")

}


/* SECCION BUSCADOR FILTROS */


const displayFilterAll =  async (info) => {
  
   
   filter.innerHTML = info.reduce( (html, breed,i) => {
    
      return html + 
        `
        <div class="card">
            <div class="card-image">
            <figure class="image is-4by3">
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
        `
    },"");
   
}




const displayFilterAll2 =  async () => {
  
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();

    filter.innerHTML = data.reduce( (html, breed,i) => {
     
       return html + 
         `
         <div class="card">
             <div class="card-image">
             <figure class="image is-4by3">
                 <img 
                 src="${urlImg}"
                 alt="${breed.name}" class="imgFiltros" 
                 />
             </figure>
             </div>
             <div class="card-content">
             <p class="title is-5">${breed.name}</p>
             </div>
         </div>
         `
     },"");
    
 }

displayFilterAll2()
 //displayFilterAll()