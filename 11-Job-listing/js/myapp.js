const displayCards = document.getElementsByTagName("main");
const itemTags = document.getElementsByClassName("item-tags")
const filtros = []


const modalContent = document.getElementById("modalContent");
const close = document.getElementById("close");
const closeTag = document.getElementsByClassName("closeTag");
const displayTag = document.querySelector(".displayTag");
const showTag = document.getElementsByClassName("showTag");

let  closeTagsarr ;


//prueba tag en modal
const abrirnModalPorItem = () => {
    let  itemTagsarr = Array.from(document.getElementsByClassName("item-tags"))
    
    itemTagsarr.forEach( item => {
       
        
        item.addEventListener("click", (e) => {
            modalContent.classList.add("active");
            
            
            displayTag.innerHTML +=  `<span class="showTag"> ${item.textContent}<span class="closeTag ">x</span></span>`

    
            //recien aca me toma el array xq antes de imprimir las lineas de arriba, no existe
            closeTagsarr = Array.from(document.getElementsByClassName("closeTag"))

            //para q me ejecute la funcion cuando hago click y aparezca en modal
            filtrar(item.textContent)
            //console.log("con click",filtros)

             funcionCerrarTag()

        })
        
    })
             

}

const funcionCerrarTag = () => {
    closeTagsarr.forEach( (closeitem, indice) => {
        closeitem.addEventListener("click", () => {
            //para que todo el tag desaparezca
            showTag[indice].classList.add("fade")


            filtrar((closeitem.previousSibling.nodeValue).trim())
        })
    })
}


const filtrar = (item) => {

    if (filtros.indexOf(item) === -1) { 
    filtros.push(item) }
    else{
        filtros.splice(filtros.indexOf(item),1)
    }
    if(filtros.length == 0){
        modalContent.classList.remove("active");
        ofertasTrabajo(trabajos)
    }

    let jobsFiltered = [...trabajos]

    jobsFiltered = jobsFiltered.filter(job => {
        return filtros.every(filtro => {
        return [
            job.role,
            job.level,
            ...(job.languages || []),
            ...(job.tools || [])
        ].includes(filtro)
        });
    })
    // console.log("filtros dps de filtrar", filtros)

   

    ofertasTrabajo(jobsFiltered);

    


    
}
 //para imprimer badge de "new" y featured" 
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

//imprime los tags de role, nivel, lenguajes y tools
const tags = (array) => {
    // ACA SE ESTA MODIFICANDO CON FILTRAR
    return array.reduce((accum, item) => {
      //return accum + `<span onclick = "filtrar('${item}')" class="item-tags">${item}</span>`
      return accum + `<span  class="item-tags" >${item}</span>`
    }, "");
}
  
//imprime las cards
const ofertasTrabajo = (trabajos) => {
console.log("ofertasTraajo",trabajos)
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

    abrirnModalPorItem()
}
ofertasTrabajo(trabajos);


//cerrarcon el modal
close.addEventListener("click", function () {
    modalContent.classList.remove("active");
    ofertasTrabajo(trabajos);
    displayTag.innerHTML = "";

});


/*

condicion && resultado -> con el doble& le digo, si la condicion es verdadera, ejecuta el resultado. si no, no hagas nada.

doble && seria solo un if() ??
sin el else..
De nicolaslevyrenaud para todos:  10:13 AM
si, algo asi
si es verdadero se ejecuta
De Ada Online para todos:  10:13 AM
&&
De mí para todos:  10:13 AM
perfecto!!
De Ada Online para todos:  10:14 AM
true && "Hola"
false ||  "hola"


*/
