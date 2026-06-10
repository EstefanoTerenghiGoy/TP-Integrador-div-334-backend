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

//Crear la URL que proporciona X información

//Index (GET ALL Productos)
app.get("/api/productos", async (req, res)=>{ //Indico que el callback (La funcion que tiene como parametros req y res) es asíncrona
    try {
        const querySelectAll = "SELECT id, nombre, precio, disponibilidad, img FROM productos"
        
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
        const { id } = req.params //igual a: id = req.params.id, la solución actual es destructuring
        const querySelectById = "SELECT id, nombre, precio, disponibilidad, img FROM productos where productos.id = ?" //El interrogante es el placeholder (:id)
        const [rows] = await connection.query(querySelectById, [id]) //[id] rellena al placeholder, de ser varios, se usa de forma respectiva

        if(rows.length === 0){
            return res.status(404).json({
                message: `No se encontró un producto con el id ${id}`
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

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto ", PORT)
})