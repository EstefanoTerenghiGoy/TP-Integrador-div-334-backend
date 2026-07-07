const urlBase = "http://localhost:3000/api/products";

const modalExito = document.getElementById("modal-exito");
const mensajeExitoModal = document.getElementById("mensaje-exito-modal");
const btnAceptarExito = document.getElementById("btn-aceptar-exito");

btnAceptarExito.addEventListener("click", () => {
    modalExito.close();
});

const postProductoForm = document.getElementById("post-producto-form");
const mensaje = document.getElementById("mensaje");

postProductoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const categoriaSeleccionada = event.target.categoria.value; // "teclado" o "mouse"
    const carpetaCategoria = `${categoriaSeleccionada}s`; // Se transforma en "teclados" o "mouses"

    const entradaImagen = event.target.img.value.trim();

    const nombreImagenLimpio = entradaImagen
        .replace(/[^a-zA-Z0-9- ]/g, '') // mantiene letras, números, guiones y espacios
        .trim()
        .replace(/\s+/g, '-');          // convierte espacios en guiones (ej: "Razer-DeathAdder-Essential")

    const urlCompletaImagen = `/assets/products/${carpetaCategoria}/${nombreImagenLimpio}.png`;

    const body = {
        nombre: event.target.nombre.value.trim(),
        precio: Number(event.target.precio.value),
        disponibilidad: Number(event.target.disponibilidad.value),
        img: urlCompletaImagen,
        categoria: event.target.categoria.value
    };

    try {
        const response = await fetch(urlBase, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        const datos = await response.json();

        if (!response.ok) {
            mostrarError(datos.message);
            return;
        }

        mensaje.innerHTML = "";

        mensajeExitoModal.innerHTML = `
            ${datos.message}<br>
            <strong>ID del nuevo producto:</strong> ${datos.productId}
        `;
        modalExito.showModal();

        postProductoForm.reset();
    } catch (error) {
        mostrarError(error.message);
    }
});

const crearUsuarioForm = document.getElementById("crear-usuario-form");

crearUsuarioForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {
        name: event.target.nombre.value.trim(),
        email: event.target.email.value.trim(),
        password: event.target.password.value
    };

    try {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const datos = await response.json();

        if (!response.ok) {
            mostrarError(datos.message);
            return;
        }

        mensaje.innerHTML = "";

        mensajeExitoModal.innerHTML = `${datos.message}`;
        modalExito.showModal();

        crearUsuarioForm.reset();
    } catch (error) {
        mostrarError(error.message);
    }
});

function mostrarError(texto) {
    mensaje.innerHTML = `
        <p class="mensaje error">${texto}</p>
    `;
}