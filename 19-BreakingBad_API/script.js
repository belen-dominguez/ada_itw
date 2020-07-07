

let characters = [];
let quotes = [];
let qtyDeath = [];

const getCharacter = () => {
    
    fetch("https://breakingbadapi.com/api/characters")
    .then((response) => {
        return response.json();
      })
    .then( (data) => {
       // console.log(data)
        characters = data;
        printCards(data);
    })
};

const getDeath = () => {
    
    fetch("https://breakingbadapi.com/api/deaths")
    .then((response) => {
        return response.json();
      })
    .then( (data) => {
        //console.log(data)
        qtyDeath = data;

    })
};


const getQuotes = () => {
    
    fetch("https://breakingbadapi.com/api/quotes")
    .then((response) => {
        return response.json();
      })
    .then( (data) => {

        //console.log(data)
        quotes = data;
    })
};


//Bring death of character
const filterDeath = (character) => {

    let arrDEath =  qtyDeath.filter( item => {
     return item.responsible == character
    })
    //console.log("array muertes ", arrDEath)
  
   return cantMuertes = arrDEath.reduce( (acc, episodios) => {
        return acc + episodios.number_of_deaths
    },0)
  
};

//Bring quotes of character
const filterQuotes = (character) => {

  let arrQuotes =  quotes.filter( item => {
   return item.author == character
    })

    //console.log("arr citas", arrQuotes)
    
    if(arrQuotes.length == 0 ){
        return "NO existen citas";
    }
    else {
        let randomNumber = Math.ceil(Math.random()*arrQuotes.length);
      
        return randamQuote = arrQuotes[randomNumber-1].quote;
    }
};


getCharacter();
getDeath();
getQuotes();

