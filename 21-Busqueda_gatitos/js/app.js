///Menu Tabs
const menu = document.querySelector("ul");
const tabSection = document.querySelectorAll(".tab-section");



menu.addEventListener("click", (e) => {
    
    let target_a = e.target; //esto es el "a" - enlace
    let target_li = e.target.parentElement; //esto es el "li"
   
    //le saco la clase is-active al primer item menu
    menu.firstElementChild.classList.remove('is-active');

    displayTab(target_li)
    displaySection(target_a)
});


//Seccion Random
const btnRandom = document.getElementById("random-cat-btn");
const imgRandom = document.getElementById("cat-img");

btnRandom.addEventListener("click", () => {
    btnRandom.classList.add("is-loading") 
    getRandom()
});

//esto es una fx onload en la imagen. cuadno se termina de cargar le saca la clase is-loading
const stopIsLoading = () => {
   
    btnRandom.classList.remove("is-loading") 
};


//seccion razas
const dropBreed = document.getElementById("breed-dropdown");
 const imgBreed = document.getElementById("breed-img");
const titleBreed  = document.getElementById("breed-name");
const detailBreed  = document.getElementById("breed-description");
const tagBreed = document.getElementById("breed-temperament");




//seccion buscador razas
const btnBuscadorRazas = document.getElementById("breed-search-btn");
const inputBuscadorRazas = document.getElementById("breed-search-input");
const tableBreedSearch = document.getElementById("breed-search-results");

btnBuscadorRazas.addEventListener("click", () => {
    let inputSearch = inputBuscadorRazas.value;

    btnRedirect(inputSearch)
    
});

inputBuscadorRazas.addEventListener('keyup', (e) => {
    
    searchBreedRT(inputBuscadorRazas.value);

    if (e.keyCode === 13) {
        event.preventDefault();
        btnRedirect(inputBuscadorRazas.value)
    }

})
//que input se vacie onload
inputBuscadorRazas.addEventListener("load", () => {
    inputBuscadorRazas.value = "";
})


/* SECCION FITROS */
const filter = document.getElementById("filter");
const imgFiltros = document.getElementsByClassName("imgFiltros");
const fIlterOptions = document.getElementById("filter_content")
const filterSearch = document.querySelectorAll(".checkbox");
const filterInput = document.querySelectorAll(".breed-filter");
const breedResult = document.getElementById("breed-results");
const resultCounts = document.getElementById("breed-results-count")

fIlterOptions.addEventListener("click", (e) => {
   
    let targetID = e.target.id  //esto es el input value, ej: "hairless"

    let targetIfChecked = e.target.checked
    
     applyFilter(targetID, targetIfChecked)
});


//onload los inputs no esten tildados
fIlterOptions.addEventListener("load",(e) => {
    console.log(e.target)
    e.target.checked = false;
})


