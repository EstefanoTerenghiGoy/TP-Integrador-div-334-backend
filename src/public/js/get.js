const contenedorProductos = document.getElementById('contenedor-productos')
const getProductoForm = document.getElementById('getProducto-form')

getProductoForm.addEventListener('submit', async event => {
    event.preventDefault()

    const idProd = event.target.idProd.value.trim();

    if (!idProd) {
        mostrarError("Error al mostrar los productos. Ingresá un ID válido")
        return
    }

    //Es mejor no hardcodear el link del fetch
    const urlBase = `http://localhost:3000/api/products`

    try {
        const response = await fetch(`${urlBase}/${idProd}`)
        const datos = await response.json()

        //Comprobar si no es una response 200-299, como un 404
        if (!response.ok) {
            mostrarError(datos.message)
            return
        }

        const producto = datos.payload;

        renderizarProducto(producto)
    } catch (error) {
        mostrarError(`Error al cargar el producto: ${error.message}`)
    }

})


function renderizarProducto(producto) {
    let htmlProducto = `
            <ul class="card-producto">
                <li class="lista-producto">
                    <img src="assets/logo.jpg" alt="">
                    <h3>${producto.nombre}</h3>
                    <p>id: ${producto.id}</p>
                    <p>$${producto.precio}</p>
                </li>
            </ul>
            `;

    contenedorProductos.innerHTML = htmlProducto;
}

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
                    <p class="mensaje error">${mensaje}</p>
                `
}