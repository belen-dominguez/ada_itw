
//ej1
const precioMaquina = (busqueda) => {
    return local.precios.reduce((totalPrecio, precioComponente) => {
      return totalPrecio = (busqueda.includes(precioComponente.componente))
        ? totalPrecio + precioComponente.precio
        : totalPrecio
    }, 0);
  
  }
  

//ej2
const cantidadVentasComponente = (componente) => {
    return local.ventas.reduce((vecesVendida, venta) => {
      return vecesVendida = (venta.componentes.includes(componente) ? vecesVendida + 1 : vecesVendida)
    }, 0);
  
  }
  

//ej3

/*
const vendedoraDelMes = (mes, anio) => {
   
   const fechas =  local.ventas.filter(venta => { 
       
        return venta.fecha.getMonth() === (mes-1) && venta.fecha.getFullYear() == anio
    })
    console.log(fechas)

   const vendedorConVenta = fechas.map( ( venta) => {
    return  {nombre: venta.nombreVendedora, precio : precioMaquina(venta.componentes) }

    }, {})

    // return vendedorConVenta.reduce( (acc, vendedor) => {
    //     let total;  
    //     if(local.vendedoras.includes(vendedor.nombre)){
    //         total = acc + vendedor.precio
    //     }
    //     return {nombre: vendedor.nombre, preciototal: total}
        
    // })


}
*/
/*resolucion chiari*/

const mayorDeUnObjeto = (objeto) => { 
    const valores = Object.values(objeto);
    const indice = valores.indexOf(Math.max(...valores)); 
    return Object.keys(objeto)[indice]; 
};


const vendedoraDelMes = (mes, anio) => {

    const {ventas} = local
   
    const ventasPorFecha =  ventas.filter(venta => venta.fecha.getMonth() === (mes -1) && venta.fecha.getFullYear() === anio);
   
    const vendedoresPrecio = ventasPorFecha.reduce((accum, venta) => {
     accum[venta.nombreVendedora]
     ? accum[venta.nombreVendedora] += precioMaquina(venta.componentes)
     : accum[venta.nombreVendedora] = precioMaquina(venta.componentes) 
     return accum
    }, {})
   
    console.log(vendedoresPrecio)
    return mayorDeUnObjeto(vendedoresPrecio)
    
   
   }
   
   
//ej4

const ventasMes = (mes, anio) => {

    const {ventas} = local
   
    const ventasPorMes =  ventas.filter(venta => venta.fecha.getMonth() === (mes -1) && venta.fecha.getFullYear() === anio);

   return ventasPorMes.reduce( (acc, venta) => {

        acc += precioMaquina(venta.componentes) 
        return acc
    },0)
}


//ej5
const ventasVendedora = (nombre) => {

   const {ventas} = local

   const ventasVendedora = ventas.filter( vendedora => vendedora.nombreVendedora === nombre)
    
   return ventasVendedora.reduce( (acc, venta) => {
        acc += precioMaquina(venta.componentes) 
        return acc
    },0)
}


//ej6
const componenteMasVendido = () => {
    const { precios} = local

    const arrComponentes = precios.map( componente =>  componente.componente )

    const ventasEquipos = arrComponentes.reduce( (acc, componente, indice) => {
       
        return{...acc, [arrComponentes[indice]] : cantidadVentasComponente(componente)}
    },{})
    //console.log(ventasEquipos)
    return mayorDeUnObjeto(ventasEquipos)

}


//ej7

const huboVentas = (mes, anio)=> {
    const {ventas} = local
   
    const ventasPorMes =  ventas.filter(venta => venta.fecha.getMonth() === (mes -1) && venta.fecha.getFullYear() === anio);

    if(ventasPorMes == ""){
        return false
    }
}



//ej8


/*
const ventasVendedora = (nombre) => {

   const {ventas} = local

   const ventasVendedora = ventas.filter( vendedora => vendedora.nombreVendedora === nombre)
    
   return ventasVendedora.reduce( (acc, venta) => {
        acc += precioMaquina(venta.componentes) 
        return acc
    },0)
}
*/


// const obtenerVentasPorSucursal = (sucursal) => {

//     const { ventas } = local

//     return ventas.filter(venta => venta.sucursal === sucursal);

// }

const ventasSucursal = (sucursal) => {

    //const ventasPorSucursal = obtenerVentasPorSucursal(sucursal);
    const { ventas } = local

    const ventasPorSucursal = ventas.filter(venta => venta.sucursal === sucursal);

    return ventasPorSucursal.reduce((totalVentas, venta) => {
        return totalVentas += precioMaquina(venta.componentes);
    }, 0)
}



//ej9
const ventasBusqueda = (busquedas) => {
    const { vendedoras, ventas, sucursales } = local

    let ventasBusqueda = ventas.filter(venta => {
        if(sucursales.includes(busquedas)){
           return venta.sucursal === busquedas
        }
        if(vendedoras.includes(busquedas)){
            return venta.nombreVendedora === busquedas
        }
        
    });

    return ventasBusqueda.reduce((totalVentas, venta) => {
        return totalVentas += precioMaquina(venta.componentes);
    }, 0)
}


//ej10
const obtenerVentasPorFecha = (mes, anio) => {

    const { ventas } = local

    return ventas.filter(venta => venta.fecha.getMonth() === (mes - 1) && venta.fecha.getFullYear() === anio);

}


const sucursalDelMes = (mes, anio) => {

    const ventasPorFecha = obtenerVentasPorFecha(mes, anio);

    const ventasSucursal = ventasPorFecha.reduce((accum, venta) => {
        accum[venta.sucursal]
            ? accum[venta.sucursal] += precioMaquina(venta.componentes)
            : accum[venta.sucursal] = precioMaquina(venta.componentes)
        return accum
    }, {})

    return mayorDeUnObjeto(ventasSucursal);

}


//Vendeora estrella
const vendedoraConMasVentas = () => {
    const {vendedoras,  precios} = local;

    const mejorVendedora = vendedoras.reduce( (acc, vendedora, indice) => {
       
        return {...acc, [vendedoras[indice]] : ventasVendedora(vendedora)}
    },{})
    //console.log(mejorVendedora)

    return mayorDeUnObjeto(mejorVendedora)

}



