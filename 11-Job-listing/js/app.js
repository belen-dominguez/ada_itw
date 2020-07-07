

const displayCards = document.getElementsByTagName("main");
const itemTag = document.getElementsByClassName("item-tags")

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const close = document.getElementById("close");
const displayTag = document.querySelector(".displayTag")
const closeTag = document.querySelectorAll(".closeTag")

const filtros = []
let tagPorContent = [];
let jobsFiltered ;




//dejar seleccionado todos tags

let items = Array.from(document.getElementsByClassName("item-tags"))
console.log("hola",items)
const funcionPrueba = () => {
  
 
  

  items.forEach( item => {
     
    item.addEventListener("click", () => {
      modalContent.classList.add("active");
      
      
      displayTag.innerHTML = `<span class="item-tags" > ${item.textContent}<span id="close" class="close ">×</span></span>`
    })
    
  })
}

close.addEventListener("click", function () {
  modalContent.classList.remove("active");

});


const tags = (array) => {
  // ACA SE ESTA MODIFICANDO CON FILTRAR
  return array.reduce((accum, item) => {
    return accum + `<span onclick = "filtrar('${item}')" class="item-tags">${item}</span>`
  }, "");
}

const filtrar = (item) => {

if (filtros.indexOf(item) === -1) { 
  filtros.push(item) }
  else{
    filtros.splice(filtros.indexOf(item),1)
  }
 if(filtros === []){
   ofertasTrabajo(trabajos)
 }

  let newTrabajos = [...trabajos]
  

/* resolucion iru*/
  jobsFiltered = newTrabajos.filter(job => {
   return filtros.every(filtro => {
    return [
      job.role,
      job.level,
            ...(job.languages || []),
            ...(job.tools || [])
          ].includes(filtro)
        });
})

console.log(jobsFiltered);

  ofertasTrabajo(jobsFiltered)
}

  

  const trabajoNuevo = (job) => {
  if(job.new) {
    return ` <span  class="item-badge item-badge__new">New!</span>`
  }else{
    return ""
  }
}
const trabajoFeature = (job) => {
  if(job.featured) {
    return `<span class="item-badge item-badge__feature">Featured!</span>`
  }else{
    return ""
  }
}

const ofertasTrabajo = (trabajos) => {

    displayCards[0].innerHTML = trabajos.reduce( (html, oferta) => {

        return html + `
        <div class="item item-new">
    <div class="item-content">
      <div class="item-img">
        <img src="${oferta.logo}" alt="">
      </div>
      <div class="item-detail">
        <span>${oferta.company}</span>
        ${trabajoNuevo(oferta)}
        ${trabajoFeature(oferta)}
        <h3 ><a href="">${oferta.position}</a></h3>
        <div class="item-detail-bottom flex">
          <p>${oferta.postedAt}</p>
          <p>${oferta.contract}</p>
          <p>${oferta.location}</p>
        </div>
      </div>
    </div><!--End item-descripcion-->
    <div class="item-tag">
    ${tags(
      [
        oferta.role,
        oferta.level,
        ...(oferta.languages || []),
        ...(oferta.tools || [])
      ])}

    
    </div><!--End item-tags-->
  </div><!--End item-->
        `

    },"")

    funcionPrueba()
  }

  
//dejar seleccionado todos tags

// const itemTag = Array.from(document.getElementsByClassName("item-tags"))

// console.log(itemTag)

// for(let i= 0; i < itemTag.length; i++){

//   console.log(itemTag[i].textContent )

//    tagPorContent = itemTag[i].textContent;

//console.log(tagPorContent)


  // if(itemTag[i].textContent === "Frontend"){
  //   itemTag[i].addEventListener("click", () => {

  //     itemTag[i].classList.add("selected")
  //   })
  // }
  // console.log( itemTag[i])
  

  // itemTag[i].textContent
//}


  //modal mati



/*
buttonModal.addEventListener("click", function () {
  modal.classList.replace("fade", "show");
  modalContent.classList.add("active");
});

close.addEventListener("click", function () {
  modal.classList.replace("show", "fade");
  modalContent.classList.remove("active");
});

modal.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.classList.replace("show", "fade");
    modalContent.classList.remove("active");
  }
});
  */
  ofertasTrabajo(trabajos);
  






