
const tablaBody = document.querySelectorAll(".tabla--body")
const btnNuevaVenta = document.querySelector(".btn--ventaNueva")
const mejores = document.querySelectorAll(".mejores")

const selectVendedora = document.getElementById("vendedora--select");
const selectComponente = document.getElementById("componente--select");
const selectSucursal = document.getElementById("sucursal--select");
const btnModalAceptarVenta = document.getElementsByClassName("btnAgregarVenta")
const btnModalCancelarVenta = document.getElementsByClassName("btnCancelarVenta")



//modal mati
const buttonModal = document.getElementById("btnModal");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const close = document.getElementById("close");

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

//me crea un nueva objeto por una nueva venta
const resultadoNuevaVenta = () => {
  const {ventas} = local;

  const nuevaVenta =  {
    id: (ventas.length +1),
    fecha: new Date(),
    nombreVendedora: selectVendedora.options[selectVendedora.selectedIndex].value,
    sucursal: selectSucursal.options[selectSucursal.selectedIndex].value,
    componentes:   [...selectComponente.options].filter(option => option.selected).map(option => option.value),
  }
  
  return nuevaVenta
}

//esto me pushea el objeto creado en resultadoNuevaVenta() al array de "ventas"
const publicarNuevaVenta = (ingreso) => {
  const {ventas} = local;

  ventas.push(ingreso)

  tablaVentas()
  tablaSucursales()
  mejorProducto()
  mejorVendedora()
} 


//me genera las opciones en el modal para nueva venta
const generarOpcionesModal = () => {
  const {vendedoras, precios, sucursales} = local

  //crear arr de componentes
  const arrComponentes = precios.reduce((acc, componente) => {
    return [...acc, componente.componente]
  },[])
  

  selectVendedora.innerHTML = vendedoras.reduce((html, vendedora) => {
      return (
      html +
      `
      <option value="${vendedora}">${vendedora}</option>
        `
    ); 
  }, ""); 

  selectComponente.innerHTML = arrComponentes.reduce((html, componente) => {
    return (
    html +
    `
    <option value="${componente}">${componente}</option>
      `
    ); 
  }, ""); 

  selectSucursal.innerHTML = sucursales.reduce((html, sucursal) => {
    return (
    html +
    `
    <option value="${sucursal}">${sucursal}</option>
      `
    ); 
  }, ""); 
};

//boton del Modal para cerar la nueva Venta
btnModalAceptarVenta[0].addEventListener("click", () =>  {

  nuevaVenta = resultadoNuevaVenta()

  console.log(nuevaVenta)
  publicarNuevaVenta(nuevaVenta);

  modal.classList.replace("show", "fade")

})

btnModalCancelarVenta[0].addEventListener("click", () => {
  modal.classList.replace("show", "fade");
  modalContent.classList.remove("active");

})

//fecha formateada
const getFormattedDate = (date) => {
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
}

//generar la tabla de Ventas
const tablaVentas = () => {
    const {ventas} = local
    
    tablaBody[0].innerHTML = ventas.reduce((html, empleado) => {
      return (
        html +
        `<tr>
            <td >${getFormattedDate(empleado.fecha) }</td>
            <td>${empleado.nombreVendedora}</td>
            <td>${empleado.sucursal}</td>
            <td>${empleado.componentes}</td>
            <td>${precioMaquina(empleado.componentes)}</td>
            <td>
              <i onclick="borrarItem(${empleado.id})" class="fas fa-trash"></i> 
            </td>
        </tr>
          `
      ); 
    }, "");
  };

//boton del tachito
const borrarItem = (id) => {

  Swal.fire({
    title: 'Esta seguro desea eliminar?',
    text: "Esta accion no podra ser revertida!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.value) {

      local.ventas = local.ventas.filter( empleado => {
        return empleado.id != id
      })
      tablaVentas()
      tablaSucursales()
      mejorProducto()
      mejorVendedora()

      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )

    }
  })

  
  
}


//generar la tabla de Secursales 
const tablaSucursales = () => {
  const {sucursales} = local
  
  tablaBody[1].innerHTML = sucursales.reduce((html, sucursal) => {
      return (
      html +
      `
      <tr>
          <td >${sucursal}</td>
          <td>${ventasSucursal(sucursal)}</td>
      </tr>
        `
    ); 
  }, ""); 
};

 



const mejorProducto = () => {

  mejores[0].innerHTML = componenteMasVendido();

}

const mejorVendedora = () => {

  mejores[1].innerHTML = vendedoraConMasVentas();
  
}



generarOpcionesModal()
tablaVentas() 
tablaSucursales()
mejorProducto()
mejorVendedora()