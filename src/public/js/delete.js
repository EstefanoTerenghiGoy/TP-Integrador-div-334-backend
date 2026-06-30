const contenedorProductos = document.getElementById("contenedor-productos");
const deleteProductoForm = document.getElementById("deleteProducto-form");

const modal = document.getElementById("modal-eliminar");
const mensajeModal = document.getElementById("mensaje-modal");

const cancelarBtn = document.getElementById("btn-cancelar");
const confirmarBtn = document.getElementById("btn-confirmar");

const urlBase = "http://localhost:3000/api/products";
let productoActual = null;

deleteProductoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();

    if (!idProd) {
        mostrarError("Error al mostrar los productos. Ingresá un ID válido");
        return;
    }

    try {
        const response = await fetch(`${urlBase}/${idProd}`);
        const datos = await response.json();

        if (!response.ok) {
            mostrarError(datos.message);
            return;
        }

        productoActual = datos.payload;

        renderizarProducto(productoActual);
    } catch (error) {
        mostrarError(`Error al cargar el producto: ${error.message}`);
    }

});

function renderizarProducto(producto) {
    contenedorProductos.innerHTML = `
            <div class="card-producto">
                <img src="assets/logo.jpg" alt="">
                <h3>${producto.nombre}</h3>
                <p>ID: ${producto.id}</p>
                <p>$${producto.precio}</p>
                <button id="btnEliminar">Eliminar producto</button>
            </div>
            `;

    const btnEliminar = document.getElementById("btnEliminar");
    btnEliminar.addEventListener("click", abrirModal);
}

function abrirModal() {
    mensajeModal.innerHTML = `
            ¿Seguro que desea eliminar el siguiente producto?
            <br><br>
            <strong>${productoActual.nombre}</strong>
            <br>
            ID: ${productoActual.id}
            <br>
            Precio: $${productoActual.precio}
            `;

    modal.showModal();
}

//cancelar
cancelarBtn.addEventListener("click", () => { modal.close(); });

//confirmar
confirmarBtn.addEventListener("click", async () => {

    try {
        const response = await fetch(`${urlBase}/${productoActual.id}`, { method: "DELETE" });
        const datos = await response.json();

        if (!response.ok) {
            mostrarError(datos.message);
            return;
        }

        modal.close();

        contenedorProductos.innerHTML = `
                <p>Producto eliminado correctamente.</p>
                `;

        deleteProductoForm.reset();
        productoActual = null;
    } catch (error) {
        mostrarError(`Error al eliminar el producto: ${error.message}`);
    }

});

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
                <p class="error">${mensaje}</p>
            `
}