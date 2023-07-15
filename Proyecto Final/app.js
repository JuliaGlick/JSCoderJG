let productos;
obtenerJsonProds();
//En caso de que haya algo en el carrito: obtenerlo del Storage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let tablaBody = document.querySelector("#tablabody");
let contenedorProds = document.querySelector('#misprods');
//Si el length del carrito no es igual a 0, entonces llamar a la funcion 
(carrito.length != 0) && dibujarTabla();

//Armado de cartas para los productos
function renderizarProductos(listaProds) {
          contenedorProds.innerHTML = '';
          for (let prod of listaProds) {
                    contenedorProds.innerHTML += `
                        <div class="card col-sm-3">
                            <img class="card-img-top img-fluid" style="width: 300px; height: 350px"src=${prod.foto} alt="Card image cap">
                            <div class="card-body text-center">
                                <h5 class="card-title">${prod.nombre}</h5>
                                <p class="card-text">$ ${prod.precio}</p>
                                <br>
                                <button id=${prod.id} class="btn btn-primary align-bottom compra">Comprar</button>
                            </div>
                        </div>`;
          } //Para cada boton de las cartas, poner un evento Click para agregar el producto al carrito
          let botones = document.querySelectorAll(".compra");
          for (let boton of botones) {
                    boton.addEventListener("click", () => {
                              const prodAlCarrito = productos.find((producto) => producto.id == boton.id);
                              agregarCarrito(prodAlCarrito);
                    })
          }
}

//Armado de las cartas con los productos del archivo JSON
function dibujarTabla(){
    for(const producto of carrito){
        document.querySelector("#tablabody").innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td><i class="btn btn-light btn-outline-secondary bi bi-trash" onclick="eliminar(event)"></i></td>
        </tr>
    `;
    }
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let infoTotal = document.querySelector("#total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;
    
}

//Funcion para el armado del carrito con los productos
function agregarCarrito(producto) {
          carrito.push(producto);
          console.table(carrito);
          tablaBody.innerHTML += `
          <tr>
              <td>${producto.id}</td>
              <td>${producto.nombre}</td>
              <td>${producto.precio}</td>
              <td><i class="btn btn-light btn-outline-secondary bi bi-trash" onclick="eliminar(event)"></i></td>
          </tr>
          `;
          let total = carrito.reduce((ac, prod) => ac + prod.precio, 0);
          document.querySelector("#total").innerText = `Total: $ ${total}`;
          localStorage.setItem("carrito", JSON.stringify(carrito));
}
//Funcion para eliminar elementos del carrito
function eliminar(ev){
          console.log(ev);
          let fila = ev.target.parentElement.parentElement;
          console.log(fila);
          let id = fila.children[0].innerText;
          console.log(id);
          let indice = carrito.findIndex(producto => producto.id == id);
          console.log(indice)
          carrito.splice(indice,1);
          console.table(carrito);
          fila.remove();
          //recalcular el total
          let preciosAcumulados = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
          total.innerText="Total a pagar $: "+preciosAcumulados;
          //storage
          localStorage.setItem("carrito",JSON.stringify(carrito));
      }

//Evento para el boton de finalizar compra con Sweet Alert 
let finalizarCompra = document.querySelector("#finalizar");
finalizarCompra.onclick = () => {
          carrito=[];
          document.querySelector('#tablabody').innerHTML='';
          document.querySelector('#total').innerText = 'Total a pagar $:';
          localStorage.removeItem("carrito");
          Swal.fire(
                    'Muchas Gracias!',
                    'Tu compra fue realizada con exito!',
                    'success'
          )
}

//JSON Productos
async function obtenerJsonProds(){
          const URLJSON = "./productos.json";
          const respuesta = await fetch(URLJSON);
          const data = await respuesta.json();
          console.log(data);
          productos = data;
          renderizarProductos(productos);
      }

//Armado de formulario de contacto
let subscription = document.querySelector("#subscription");
let form = document.createElement("form")
form.className = "form align-items-right";
form.innerHTML = ` <form action="/action_page.php">
      <br>
      <input type="text" id="fname" name="fname" value="" placeholder="Nombre">
      <input type="text" id="lname" name="lname" value="" placeholder="Apellido">
      <input type="email" id="mail" name="mail" value="" placeholder="Email">
      <label class="formato"></label>
      <input type="checkbox" id="newsletter" name="newsletter" value="newsletter">
      <label for="newsletter">Recibi nuestro newsletter!</label><br><br>
      <input type="submit" value="Enviar" id="enviar" class="btn btn-info text-white" />
      </form>`;
subscription.appendChild(form)
//Comprobacion del formato de mail
let email = document.querySelector("#mail");
email.addEventListener("input", () => {
          if (!email.value.includes("@") || !email.value.includes(".")) {
                    document.querySelector(".formato").innerText = "Ingrese un formato valido"
          } else {
            document.querySelector(".formato").innerText = ""
          }
})
//Sweet Alert para el boton de submit del formulario
let nombre = document.querySelector("#fname")
let apellido = document.querySelector("#lname")
let enviar = document.querySelector("#enviar")
enviar.addEventListener("click", () =>{
  email.value= "";
  nombre.value="";
  apellido.value="";
  Swal.fire(
    'Muchas Gracias!',
    'Tus datos de contacto se guardaron!',
    'success'
)
})

//Aca se intento armar un search input para filtrar los productos que se visualizan
let botonBusqueda = document.querySelector("#searchButton")

botonBusqueda.addEventListener("click", () =>{
  filtrarProds
})

function filtrarProds(){
  fetch("./productos.json")
  .then(resp => resp.json())
  .then(data => {
    const nombre = document.document.querySelector("#searchInput").value;
    const productosFiltrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));   
    sessionStorage.setItem("filtrados", JSON.stringify(productosFiltrados));
    renderizarProductos(productosFiltrados)
  })
}

