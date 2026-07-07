const urlBase = "http://localhost:3000/api/products";
const putProductoForm = document.getElementById("put-producto-form");
const contenedor = document.getElementById("contenedor");

// Capturamos los elementos del modal
const modalExito = document.getElementById("modal-exito");
const mensajeExitoModal = document.getElementById("mensaje-exito-modal");
const btnAceptarExito = document.getElementById("btn-aceptar-exito");

// Escuchador para cerrar el modal
btnAceptarExito.addEventListener("click", () => {
    modalExito.close();
});

putProductoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = event.target.idProd.value.trim();

    if (!id) {
        mostrarError("Error al mostrar los productos. Ingresá un ID válido");
        return;
    }

    try {
        const response = await fetch(`${urlBase}/${id}`);
        const datos = await response.json();

        if (!response.ok) {
            mostrarError(datos.message);
            return;
        }

        const producto = datos.payload;
        renderizarFormulario(producto);
    } catch (error) {
        mostrarError(`Error al cargar el producto: ${error.message}`);
    }
});

function renderizarFormulario(producto) {
    contenedor.innerHTML = `
        <section class="form-card">
            <h2>Modificar Producto</h2>
            <form id="editar-form">
                <div style="text-align: center; margin-bottom: 1rem;">
                    <img src="${producto.img}" width="150" style="object-fit: contain; max-height: 150px;">
                </div>

                <label>Nombre</label>
                <input type="text" name="nombre" value="${producto.nombre}" required>

                <label>Precio</label>
                <input type="number" name="precio" value="${producto.precio}" required>

                <label>Disponibilidad</label>
                <select name="disponibilidad">
                    <option value="1" ${producto.disponibilidad ? "selected" : ""}>Disponible</option>
                    <option value="0" ${!producto.disponibilidad ? "selected" : ""}>No disponible</option>
                </select>

                <label>Imagen</label>
                <input type="text" name="img" value="${producto.img}" required>

                <label>Categoría</label>
                <select name="categoria">
                    <option value="teclado" ${producto.categoria == "teclado" ? "selected" : ""}>Teclado</option>
                    <option value="mouse" ${producto.categoria == "mouse" ? "selected" : ""}>Mouse</option>
                </select>

                <input type="submit" value="Guardar cambios">
            </form>
        </section>
    `;

    const editarForm = document.getElementById("editar-form");

    editarForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const body = {
            id: producto.id,
            nombre: event.target.nombre.value,
            precio: Number(event.target.precio.value),
            disponibilidad: Number(event.target.disponibilidad.value),
            img: event.target.img.value,
            categoria: event.target.categoria.value
        };

        try {
            const response = await fetch(urlBase, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const datos = await response.json();

            if (!response.ok) {
                mostrarError(datos.message);
                return;
            }

            // Limpiamos errores de pantalla si los hubiera
            contenedor.innerHTML = "";

            // MODIFICADO: Inyectamos el mensaje del backend y abrimos el modal
            mensajeExitoModal.innerHTML = `${datos.message || "Producto modificado correctamente."}`;
            modalExito.showModal(); 

        } catch (error) {
            mostrarError(error.message);
        }
    });
}

function mostrarError(mensaje) {
    contenedor.innerHTML = `
        <p class="mensaje error">${mensaje}</p>
    `;
}