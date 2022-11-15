let carrito = JSON.parse(localStorage.getItem("carrito"));
let tabla = document.getElementById("tablabody");

function cargarCarro() {
  console.log(carrito);
  tabla.innerText =""
  carrito.forEach((element) => {
    tabla.innerHTML += `
            <tr>
            <td>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.precio}</td>
            </tr>
            `;
  });
  totalCarrito = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio,
    0
  );
  let infoTotal = document.getElementById("total");
  infoTotal.innerText = "Total a pagar $:" + totalCarrito;
}

cargarCarro();

function eliminarCarrito() {
  localStorage.clear();
  carrito = [];
  localStorage.setItem("totalCarrito", null);
  localStorage.setItem("total", "0");
  cargarCarro();
}

$(document).ready(() => {
  $(".btnLimpiar").on("click", () => {
    eliminarCarrito();
  });
});
