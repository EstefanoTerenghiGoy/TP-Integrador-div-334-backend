const urlBase = "http://localhost:3000/api/products";

const crearForm = document.getElementById("crear-form");
const mensaje = document.getElementById("mensaje");

crearForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {
        nombre: event.target.nombre.value.trim(),
        precio: Number(event.target.precio.value),
        disponibilidad: Number(event.target.disponibilidad.value),
        img: event.target.img.value.trim(),
        categoria: event.target.categoria.value
    };

    try {
        const response = await fetch(urlBase, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        const datos = await response.json();

        if (!response.ok) {
            mostrarError(datos.message);
            return;
        }

        mensaje.innerHTML = `
                    <p class="mensaje exito">
                        ${datos.message}<br>
                        ID del nuevo producto: ${datos.productId}
                    </p>
                `;

        crearForm.reset();
    } catch (error) {
        mostrarError(error.message);
    }

});

function mostrarError(texto) {
    mensaje.innerHTML = `
                <p class="mensaje error">${texto}</p>
            `;
}