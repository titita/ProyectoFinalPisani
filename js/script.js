let productos = new Array();
console.log(productos);
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalCarrito;
let contenedor = document.getElementById("product");

$.ajax({
  method: "GET",
  url: "productos.json",
  success: function (respuesta) {
    for (const producto of respuesta) {
      let prod = new Producto(
        producto.id,
        producto.nombre,
        producto.foto,
        producto.precio
      );
      productos.push(prod);
    }
    render();
  },
});

//funcion que fabrica card y agrega al contenedor
function render() {
  for (const producto of productos) {
    contenedor.innerHTML += `
            <div class="card col-sm-4 col-md-2">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                 <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id="btn${producto.nombre}" class="btn btn-primary">Comprar</button>
                </div>
            </div>
        `;
  }

  //EVENTOS RECORRE EL ARRAY DEL PRODUCTO Y TOMA EL NOMBRE DINAMICO DEL BTN Y LLAMA A AGREGAR PRODUCTO, UNA FUNCION FUTURA
  productos.forEach((producto) => {
    //evento para cada boton
    document
      .getElementById(`btn${producto.nombre}`)
      .addEventListener("click", function () {
        add(producto);
      });
  });
}

function add(producNew) {
  carrito.push(producNew);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  sweet();
}

//libreria
const sweet = () => {
  Swal.fire({
    title: "Producto Agregado!",
    icon: "succes",
  });
};

