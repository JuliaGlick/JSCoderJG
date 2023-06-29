const productos = [{
          id: 1,
          nombre: "Veggie Ramen",
          foto: "https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/1:1/w_3482,h_3482,c_limit/HLY-Veggie-Ramen-16x9.jpg",
          precio: 2500
      },
      {
          id: 2,
          nombre: "Black Garlic Ramen",
          foto: "https://static.wixstatic.com/media/9f500c_3681aa342e9a4509824ed6ef72732c1d~mv2.jpeg/v1/fill/w_600,h_399,al_c,lg_1,q_80,enc_auto/9f500c_3681aa342e9a4509824ed6ef72732c1d~mv2.jpeg",
          precio: 3000
      },
      {
          id: 3,
          nombre: "Miso Ramen",
          foto: "https://inquiringchef.com/wp-content/uploads/2022/11/Easy-Miso-Ramen_square-0723.jpg",
          precio: 3500
      },
      {
          id: 4,
          nombre: "Tonkotsu Ramen",
          foto: "https://www.seriouseats.com/thmb/IBikLAGkkP2QVaF3vLIk_LeNqHM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rich-and-creamy-tonkotsu-ramen-broth-from-scratch-recipe-Diana-Chistruga-hero-6d318fadcca64cc9ac3e1c40fc7682fb.JPG",
          precio: 4000
      },
     
  ];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let tablaBody = document.querySelector("#tablabody");
let contenedorProds = document.querySelector('#misprods');
      
function renderizarProductos(listaProds){
          
contenedorProds.innerHTML='';
          
for(const prod of listaProds){
          contenedorProds.innerHTML+=`
                  <div class="card col-sm-3">
                      <img class="card-img-top img-fluid" src=${prod.foto} alt="Card image cap">
                      <div class="card-body">
                          <h5 class="card-title">${prod.nombre}</h5>
                          <p class="card-text">$ ${prod.precio}</p>
                          <button id=${prod.id} class="btn btn-primary compra">Comprar</button>
                      </div>
                  </div>`;
  } 
  let botones = document.querySelectorAll(".compra");
  for(let boton of botones){
      boton.addEventListener("click", () =>{
          const prodAlCarrito = productos.find((producto) => producto.id == boton.id);
          agregarCarrito(prodAlCarrito);
      })
  }
 }
      
renderizarProductos(productos);

function agregarCarrito(producto){
    carrito.push(producto);
    console.table(carrito);
    tablaBody.innerHTML += `
    <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
    </tr>
    `;
    let total = carrito.reduce((ac, prod) => ac + prod.precio, 0);
    document.querySelector("#total").innerText = `Total: $ ${total}`;
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

let finalizarCompra = document.querySelector("#finalizar");
finalizarCompra.onclick=()=>{
    Swal.fire(
        'Muchas Gracias!',
        'Tu compra fue realizada con exito!',
        'success'
      )
}



let subscription = document.querySelector("#subscription");
let form = document.createElement("form") 
form.className = "form align-items-right";
form.innerHTML= ` <form action="/action_page.php">
<br>
<input type="text" id="fname" name="fname" value="" placeholder="Nombre">
<input type="text" id="lname" name="lname" value="" placeholder="Apellido">
<input type="email" id="mail" name="mail" value="" placeholder="Email">
<input type="checkbox" id="newsletter" name="newsletter" value="newsletter">
<label for="newsletter">Recibi nuestro newsletter!</label><br><br>
<input type="submit" value="Enviar" class="btn btn-info text-white" />
<input type="button" value="Borrar" class="btn btn-danger">
</form>`;
subscription.appendChild(form)

let email = document.querySelector("mail");
email.addEventListener("input", ()=>{
    if (email.value.includes("@") || !email.value.includes(".")) {
        document.querySelector(".formato").innerText = "Ingrese un formato valido"
    }
})




