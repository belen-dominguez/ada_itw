const cards = document.getElementsByClassName("cards");

const searchInput = document.getElementById("searchInput");
const search = document.getElementById("btnSearch");
const clear = document.getElementById("btnClear");

// const modal = document.getElementById("modal");
// const modalContent = document.getElementById("modalContent");
// const close = document.getElementById("close");


//imrpmir cards

const printCards = (characters) => {

    cards[0].innerHTML =  characters.reduce( (html, character) => {
        return html + 
        `
        <div class="card-item" class="card mb-3" style="width: 18rem;" >  
            
            <img src="${character.img}" class="card-img-top" alt="..." onclick="openModal('${character.name}', ${character.char_id})">
            
            <div class="card-body text-justify">
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text card-cumpleanios">Cumpleaños: ${character.birthday}</p>
            <p class="card-text card-status">Status: ${character.status}</p>
            <p class="card-text card-apodo">Apodo: ${character.nickname}</p>
            <p class="card-text card-temporada"> Temporadas: ${character.appearance}</p>
            </div>
            <div class="card-body pt-0 card-extra d-none text-justify" id="card-extra${character.char_id}">      
                <p class="card-text"> <span  id="quote${character.char_id}"></span></p>
                <p class="card-text" ><span  id="deaths${character.char_id}"></span></p>
            </div>

        </div>
        `

    },"");
}

//busqueda

search.addEventListener( "click", (e) => {

        //esto me entrega un objeto dentro de array
         result = characters.filter(character => character.name == searchInput.value);

         printCards(result)    
});

clear.addEventListener("click", () => {
    printCards(characters);
    searchInput.value = "";
})



//Modal - Display Extra info
const openModal = (character, id) => {
   
    const cardExtra = document.getElementById(`card-extra${id}`);
    const quote = document.getElementById(`quote${id}`);
    const deaths = document.getElementById(`deaths${id}`);
    
    cardExtra.classList.toggle("d-block")
   
    quote.textContent = `Frase: "${filterQuotes(character)}"`;
    deaths.textContent = `Cant de muertes: ${filterDeath(character)}`;
    

     // modal.classList.replace("fade", "show");
    // modalContent.classList.add("active");
    
}

// close.addEventListener("click", function () {
//     modal.classList.replace("show", "fade");
//     modalContent.classList.remove("active");
// });

