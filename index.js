//Imports
import express from "express";
import environment from "./src/api/config/environment.js"; //ACORDARSE DE PONER .JS EN LA RUTA!!!!
import connection from "./src/api/database/db.js";
import cors from "cors"

//Config
const app = express();
const PORT = environment.port;


//Endpoints
app.get("/", (req, res)=>{
    res.send("Hola we")
})

//Middlewares - Se ejecuta en medio de las llamadas de cliente y servidor
app.use(cors()) //Middleware cors para permitir todas las solicitudes

//Middleware para mostrar por consola todas las solicitudes
app.use((req, res, next)=>{ 
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

//Crear la URL que proporciona X información

//Index (GET ALL Productos)
app.get("/api/productos", async (req, res)=>{ //Indico que el callback (La funcion que tiene como parametros req y res) es asíncrona
    try {
        const querySelectAll = "SELECT id, nombre, precio, disponibilidad, img, categoria FROM productos"
        
        //connection.query trae las filas de resultado y los metadatos, rows nos permite solo recuperar los datos que queremos mostrar
        const [rows, metadatos] = await connection.query(querySelectAll) 

        //Si no hay productos en la tabla
        if(rows.length === 0){
            return res.status(404).json({
                message: "No se encontraron productos"
            })
        }

        //Respuesta de la query devuelta por la pagina en JSON junto con su estado
        res.status(200).json({
            payload: rows,
            total: rows.length
        })
    } catch (error) {
        //Devolver algo en caso de error en la conexión, mucha tardanza, tabla no existe, etc
        res.status(500).json({ // 505 : El servidor encontró un problema inesperado y no pudo completar la solicitud
            message: "Error interno al obtener productos"
        })
    }
})

//Consultar (GET By ID) - Llamo al middlware para validar el ID
app.get("/api/productos/:id", validateId, async (req, res)=>{
    try {
        //No hace falta traer el id así, ya que el middleware validateId lo trae directamente y limpio (usando req.id)
        // const { id } = req.params //igual a: id = req.params.id, la solución actual es destructuring
        const querySelectById = "SELECT id, nombre, precio, disponibilidad, img FROM productos where productos.id = ?" //El interrogante es el placeholder (:id)
        const [rows] = await connection.query(querySelectById, [req.id]) //[req.id] rellena al placeholder, de ser varios, se usa de forma respectiva
        
        if(rows.length === 0){
            return res.status(404).json({
                message: `No se encontró un producto con el id ${req.id}`
            })
        }
        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        res.status(500).json({
            message: "Error el interno al obtener el producto"
        })
    }
})

//Crear un producto (POST) - Llamo al middlware que valida los productos
app.post("/api/productos", validateProducto, async (req, res)=>{
    try {
        //req.body toma la información enviada en el "body" de la request (Especificados en el html de POST)
        const { nombre, precio, imagen, categoria } = req.body

        //Si falta algun dato
        if (!nombre || !imagen || !categoria || !precio) {
            return res.status(400).json({
                message: "Datos inválidos. Asegurese de incluir todos los datos"
            })
        }

        //Sanitizar los strings para normalizar los datos
        const clearNombre = nombre.trim()


        const sqlCrearProducto = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)"

        //Guardarlo en Rows para obtener el nuevo ID creado
        const [rows] = await connection.query(sqlCrearProducto, [nombre, imagen, categoria, precio])

        //Mas especifico que un 200, 201 (Created)
        res.status(201).json({
            message: "Producto creado con éxito",
            productId: rows.insertId //Devuelvo el ID creado
        })

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
})

//Modificar un producto (PUT) - Llamo al middleware para validar los productos
app.put("/api/products", validateProducto, async (req, res)=>{
    try {
        //Destructuring para obtener los datos necesarios del body del request
        const { id, nombre, precio,  disponibilidad, imagen, categoria, } = req.body

        const sqlModificarProducto = "UPDATE productos SET nombre = ?, precio = ?, disponibilidad = ?, imagen = ?, categoria = ? where id = ?"
    
        await connection.query(sqlModificarProducto, [nombre, precio, disponibilidad, imagen, categoria, id])

        res.status(200).json({
            message: "Producto modificado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
})

//Eliminar un producto (DELETE) - Llamo al middleware para verificar el ID
app.delete("/api/products/:id", validateId, async (req, res) =>{
    try {
        const sqlDeleteById = "DELETE FROM productos WHERE id = ?"
        //No hace falta guardar en variable porque no vamos a traer nada
        await connection.query(sqlDeleteById, [req.id])

        //Se puede enviar un status 200 para devolver un mensaje
        res.status(200).json({
            message: "Producto eliminado correctamente"
        })
        //O un 204 (No content) que es correcto pero no devuelve el message (Mas usado en la práctica)

    } catch (error) {
        res.status(500).json({
            message: "Error interno con el servidor"
        })
    }
})

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto ", PORT)
})