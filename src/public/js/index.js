const contenedorProductos = document.getElementById('contenedor-productos')

async function mostrarProductos() {
    try {
        const response = await fetch("http://localhost:3000/api/products")

        //Verificar que la respuesta HTTP fue exitosa o crear un error si no lo fue
        if(!response.ok){
            throw new Error(`<br>Error ${response.statusText} ${response.status}`)
        }


        const datos = await response.json()
        let productos = datos.payload

        renderizarProductos(productos)

    } catch (error) {
        //Mostrar el error en el DOM (Visualmente)
        contenedorProductos.innerHTML = `
            <p class="error">Error al cargar los productos ${error.message}</p>
        `
    }
}

function renderizarProductos(productos){
    let htmlProductos = ""
    productos.forEach(producto => {
        htmlProductos += `
        <div class="card-producto">
            <img src="assets/logo.jpg" alt="">
            <h3>${producto.nombre}</h3>
            <p>id: ${producto.id}</p>
            <p>$${producto.precio}</p>
        </div>
        `
    });
    
    contenedorProductos.innerHTML = htmlProductos
}

mostrarProductos()