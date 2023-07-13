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
//funcion para eliminar elementos del carro
//Para eliminar prods del carro
function eliminar(ev){
          console.log(ev);
          let fila = ev.target.parentElement.parentElement;
          console.log(fila);
          let id = fila.children[0].innerText;
          console.log(id);
          let indice = carrito.findIndex(producto => producto.id == id);
          console.log(indice)
          //remueve el producto del carro
          carrito.splice(indice,1);
          console.table(carrito);
          //remueve la fila de la tabla
          fila.remove();
          //recalcular el total
          let preciosAcumulados = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
          total.innerText="Total a pagar $: "+preciosAcumulados;
          //agregar el calculo en pesos 💪
      
      
          //storage
          localStorage.setItem("carrito",JSON.stringify(carrito));
      }
function eliminarProductos(producto) {

}

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
          const URLJSON = "productos.json";
          const respuesta = await fetch(URLJSON);
          const data = await respuesta.json();
          console.log(data);
          productos = data;
          renderizarProductos(productos);
      }

let subscription = document.querySelector("#subscription");
let form = document.createElement("form")
form.className = "form align-items-right";
form.innerHTML = ` <form action="/action_page.php">
      <br>
      <input type="text" id="fname" name="fname" value="" placeholder="Nombre">
      <input type="text" id="lname" name="lname" value="" placeholder="Apellido">
      <input type="email" id="mail" name="mail" value="" placeholder="Email">
      <input type="checkbox" id="newsletter" name="newsletter" value="newsletter">
      <label for="newsletter">Recibi nuestro newsletter!</label><br><br>
      <input type="submit" value="Enviar" id="enviar" class="btn btn-info text-white" />
      <input type="button" value="Borrar" class="btn btn-danger">
      </form>`;
subscription.appendChild(form)

let email = document.querySelector("#mail");
email.addEventListener("input", () => {
          if (email.value.includes("@") || !email.value.includes(".")) {
                    document.querySelector(".formato").innerText = "Ingrese un formato valido"
          }
})

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



let inputBusqueda = document.querySelector("#form1")
let botonBusqueda = document.querySelector("#botonBusqueda")


const productosFiltrados = filtrarProds(inputBusqueda);

function filtrarProds (nombre){
          nombre = nombre.toLowerCase();
          const productosFiltrados = productos.filter(producto =>
                    producto.nombre.toLowerCase().includes(nombre)
                  );
          sessionStorage.setItem('filtrados',JSON.stringify(productosFiltrados));
          return productosFiltrados;
}

botonBusqueda.onclick = () => {
              
              let listaFiltrados = filtrarProds(nombre.value);
              console.log(listaFiltrados);
              renderizarProductos(listaFiltrados);
      }
  

    /*  const searchInput = document.getElementById("searchInput");
      const searchButton = document.getElementById("searchButton");
      const searchResults = document.getElementById("searchResults");

      searchInput.addEventListener("input", performSearch);


// Attach event listener to search button
searchButton.addEventListener("click", performSearch);      
// Search function
function performSearch() {
  // Clear previous search results
  searchResults.innerHTML = "";

  // Get the search query
  const query = searchInput.value.toLowerCase();

  // Call the JSON file
  fetch('path/to/your/file.json')
    .then(response => response.json())
    .then(data => {
      // Perform the search logic
      const results = searchLogic(data, query);

      // Display the search results
      displayResults(results);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Search logic - Replace with your own implementation
function searchLogic(data, query) {
  // This is a placeholder logic, replace it with your own implementation
  const results = data.filter(item => item.toLowerCase().includes(query));
  return results;
}*/
