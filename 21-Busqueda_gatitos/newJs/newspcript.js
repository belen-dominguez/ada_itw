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
//PASO 1: aca traigo todas las razas
const getBreeds = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();
   
    breedDetails = data;

    //para mostrar razas en dropdown
    dropBreedDisplay(breedDetails)
    
}

//Funcion gral para traer ID con un name
const getID = (name) => {
    console.log(name)
    let breed = breedDetails.filter(breed => breed.name == name)
    console.log(breed)
    return breed[0].id
}


//para que cuando arrancar la pagina, ya disponer de las razas
getBreeds()


//PASO 2: aparezcan opciones de razas en dropdown
const dropBreedDisplay = (data) => {

    dropBreed.innerHTML = data.reduce( (html, breed) => {

        return html + 
        `
        <option onchange="optionSelected('${breed.id}')" value='${breed.id}' >${breed.name}</option>    
        `
    },"");

    optionSelected(dropBreed[0].value)   

}

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

}

//cuando pincho el btn Buscar que me muestre la raza en #breeds
const btnRedirect = (name) => {
    
    const menuBreed = document.getElementById("breeds");
    let result = breedDetails.filter( cat => {
        return (cat.name).toLowerCase() == name.toLowerCase();
    });
    
  // fetchBreedDetail(result[0].id);
    optionSelected(result[0].id)

    displayTab(menuBreed)
    displaySection(menuBreed.children[0])

}


/* SECCION BUSCADOR FILTROS */


// const getInfo = async () => {
//     const response = await fetch("https://api.thecatapi.com/v1/breeds");
//     const data = await response.json();
//     return data
// }

// getInfo()
//     .then(displayFilterAll)
//     .then(applyFilter)


const displayFilterAll =  async (data) => {
 
    if(typeof data === "undefined"){
       
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        const data = await response.json();
        
        
        breedResult.innerHTML = data.reduce( (html, breed,i) => {
        
            return html + 
                `
                <div id="filter" class="column is-6 ">
                <div class="card">
                    <div class="card-image ">
                    <figure  class="image is-4by3 imgFilter">
                        <img 
                        src=""
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

        breedResult.innerHTML = breedFull.reduce( (html, breed,i) => {
        
            return html + 
                `
                <div id="filter" class="column is-6 ">
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
    else {
    //esto es para extraer la data de breedFull, porq breedFull tiene las imagenes.
        let newResult = breedFull.reduce((acc, breedData) => {

              data.forEach(breed => {
                if(breed.id == breedData.id ){
                    acc.push(breedData)
                }
                
            })
            return acc
       },[])

       
        filter.innerHTML = newResult.reduce( (html, breed,i) => {
    
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
 }

displayFilterAll()



 let filterResults = [];
 const applyFilter = async (idInput, isCheched) => {

    const response = await fetch(`https://api.thecatapi.com/v1/breeds/`);
    const data = await response.json();

    let search = data.filter((cat) => {
        
        return cat[idInput] == 1
       
    })
  
    if(isCheched){
         filterResults.push(search)
        console.log("filter on clck", filterResults)

        result = filterResults.flat()
            .map(i => i.id) //obtengo solo los ID
            .map( (id, i, final) => final.indexOf(id) === i && i) //aca veo si hay id repetidos y me quedo con los indices y los "false" 
            .filter(id => typeof id == "number") //elimino todo aquello que no sean numero (elimina los false)
            .map(id => filterResults.flat()[id]) //agarro los objetos completos del array original

       
        displayFilterAll(result.flat())

    }
    else {
        
        filterResults.forEach( itemArr => {
            if(itemArr.length == search.length){
            
            
                if( itemArr.every((item, i) => { return item.id === search[i].id})){
                    console.log(itemArr)
                    console.log(filterResults)
                    let index = filterResults.indexOf(itemArr)
                    filterResults.splice(index,1)
                    displayFilterAll(filterResults.flat())
                }
            }
        })

        if(filterResults.length == 0){
            displayFilterAll()
         }

     }

     
}



