console.log("Funca");

const productos = [
    {
      cod: 1,
      Servicio:"Mantenimiento Edilicio",
      imagen: "img/mantenimientoedilicio.jpeg",
      cuotaMensual: 1350000.0,
    },
    {
       cod: 2,
       Servicio: "Mantenimiento Industrial",
       imagen: "img/mantenimientoindustrial.jpg",
       cuotaMensual: 2500000.0,
    },
    {
       cod: 3,
       Servicio: "Seguridad Electronica",
       imagen:"img/seguridadelectronica.jpeg",
       cuotaMensual: 2300000.0,
    },
    {
       cod: 4,
       Servicio: "Fabricacion de carrocerías",
       imagen:"img/fabricaciondecarrocerias.jpg",
       cuotaMensual: 4000000.0,
    },
    {
       cod:5,
       Servicio:"Servicios personalizados",
       imagen:"img/personalizados.jpeg",
       cuotaMensual: 2000000.0,
    }
];

let serviciosHTML = "";

for(let indice = 0; indice < productos.length; indice++) {
    serviciosHTML += `
        <div class="producto" data-producto="${productos[indice].cod}">
            <img src=${productos[indice].imagen}>
            <h2>${productos[indice].Servicio}</h2>
            <h3>Cuota por mes: $${productos[indice].cuotaMensual.toLocaleString('es-ES')}</h3>
            <input class="btnsadd" type="button" value="Agregar al carrito">
            <button value="${productos[indice].cuotaMensual}" class="comprar-btn">Comprar Ahora</button>
        </div>
    `;
}

console.log(serviciosHTML);

const contenedorServicios = document.getElementById("contenedorServicios");
contenedorServicios.innerHTML = serviciosHTML;

const btnsadd = document.querySelectorAll(".btnsadd");
console.log(btnsadd);

const listacarrito = document.querySelector("#listaCarrito ul");
console.log(listacarrito);

const totalCarrito = document.querySelector("#listaCarrito p");
console.log(totalCarrito);
const botonPagar = document.getElementById("boton-Pagar");

const mensajeCarrito = document.getElementById("mensaje");
const botonBorrar = document.getElementById("boton-Borrar");

let totalAPagar = 0;
let seleccionados = {};

for(let indice = 0; indice < btnsadd.length; indice++) {
    function sumadorProductos() {
        console.log("clic" + indice);
        
        const productoCod = productos[indice].cod;
        
        if (seleccionados[productoCod]) {
            mensajeCarrito.innerText = "Solo se puede comprar/contratar un mismo servicio por empresa.";
        } else {
            seleccionados[productoCod] = true;
            const elementoLi = document.createElement("li");
            elementoLi.innerText = `Servicio de ${productos[indice].Servicio}  $${productos[indice].cuotaMensual}`;
            console.log(elementoLi);
            listacarrito.appendChild(elementoLi);
            console.log(elementoLi);
            totalAPagar += productos[indice].cuotaMensual;
            totalCarrito.innerText = `Total a pagar: $${totalAPagar.toLocaleString('es-ES')}`; //le agrego el detallito ese para que aparescan los puntos de mil
            mensajeCarrito.innerText = "";
        }
    }

    btnsadd[indice].addEventListener("click", sumadorProductos);
}

function Borrador() {
    totalAPagar = 0;
    listacarrito.innerHTML = "";
    totalCarrito.innerText = "Total a pagar: $0";
    mensajeCarrito.innerText = "";
    seleccionados = {}; // Reiniciar el objeto de seleccionados
}

botonBorrar.addEventListener("click", Borrador);

function Pagos() {
    if (listacarrito.innerText === "") {
        mensajeCarrito.innerText = "No hay productos en el carrito";
    } else {
        localStorage.setItem("totalAPagar", totalAPagar)
        window.location.href = "Pagos.html";
    }
}

botonPagar.addEventListener("click", Pagos);

function comprar() {
    let valor = this.value;
    console.log(valor);
    localStorage.setItem("totalAPagar", valor)
    window.location.href = "Pagos.html";
}

const botonesComprar = document.querySelectorAll(".comprar-btn");

botonesComprar.forEach(function(boton) {
    boton.addEventListener('click', comprar);
});



/********* Codigo de Formulario ***** */

    
function validarFormulario() {
    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let errorNombre = document.getElementById('errorNombre');
    let errorEdad = document.getElementById('errorEdad');
    let esValido = true;

    // Validar nombre
    if (!isNaN(nombre)) {
        errorNombre.innerText = 'Por favor, introduce un nombre válido.';
        esValido = false;
    } else {
        errorNombre.innerText = '';
    }

    // Validar edad
    if (isNaN(edad)) {
        errorEdad.innerText = 'Por favor, introduce la edad en números.';
        esValido = false;
    } else if (parseInt(edad) < 18) {
        errorEdad.innerText = 'Sos menor de edad y no podes comprar estos servicios.';
        esValido = false;
    } else {
        errorEdad.innerText = '';
    }

    // Prevenir el envío del formulario si hay errores
    return esValido;
}



