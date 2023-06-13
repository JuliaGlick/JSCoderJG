const productos = [{
          id: 1,
          nombre: "Veggie Ramen",
          precio: 2500
      },
      {
          id: 2,
          nombre: "Black Garlic Ramen",
          precio: 3000
      },
      {
          id: 3,
          nombre: "Miso Ramen",
          precio: 3500
      },
      {
          id: 4,
          nombre: "Tonkotsu Ramen",
          precio: 4000
      },
     
  ];
console.table(productos);


function filtrar (nombre) {
          const filtrados = productos.filter((prod) => productos.nombre <= nombre);
          return filtrados;
      }
      
      
let busqueda = prompt("Ingresa el nombre del producto que busca");
      
      while(busqueda != " "){
          if(busqueda === filtrar){
              const prodsFiltrados = filtrar(busqueda);
              console.log(`El producto seleccionado es: ${prodsFiltrados}`)
          } else{
                    alert("Ingrese un producto valido");      
          }
          busqueda = prompt("Ingresa el nombre del producto que busca");
      }