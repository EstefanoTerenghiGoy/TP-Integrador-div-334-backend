//Middleware para mostrar por consola todas las solicitudes
const loggerURL = ((req, res, next)=>{ 
    console.log(`El ${new Date().toLocaleString()} hubo una peticion ${req.method} de la URL ${req.url}`)
    next() //next indica que pase al siguiente middleware o a la response
})
//Middleware para filtrar id's no válidas
const validateId = (req, res, next) => {
    const { id } = req.params
    
    //REGEX que acepta solo digitos enteros positivos (No deja pasar por ej "-1", "hola", "0")
    if (!/^\d+$/.test(id)) {
            return res.status(400).json({
            message: "El ID debe ser un número entero positivo"
        })
    }

    //Convertir el string a numero entero int (base 10 decimal)
    const parsedId = parseInt(id, 10)

    if (parsedId === 0) {
        return res.status(400).json({
            message: "El ID debe ser mayor a 0"
        })
    }

    req.id = parsedId

    next()
}

//Middleware de ruta para comprobar los productos
const categoriasValidas = ["mouse", "teclado"]
const validateProducto = (req, res, next)=>{
    //Cosas a comprobar
    const { nombre, precio, categoria } = req.body 

    const errores = []

    if (typeof nombre !== "string" || nombre.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres")
    }
    if (typeof precio !== "number" || precio <= 0) {
        errores.push("El precio debe ser mayor a 0")
    }
    if (!categoriasValidas.includes(categoria)) {
        errores.push("Categoría inválida")
    }
    //No se validan imagenes porque luego vamos a usar una herramienta para hacerlo

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos inválidos", errores
        })
    }
    next()
}

//Middleware de ruta basico para protección de rutas
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }

    next()
}

export {
    loggerURL,
    validateId,
    validateProducto,
    requireLogin
}