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

//Crear la URL que proporciona X información

//GET ALL Products
app.get("/api/products", async (req, res)=>{ //Indico que el callback (La funcion que tiene como parametros req y res) es asíncrona
    try {
        const querySelectAll = "SELECT * FROM products"
        const [rows, metadatos] = await connection.query(querySelectAll) //connection.query trae las filas de resultado y los metadatos, rows nos permite solo recuperar los datos que queremos mostrar

        //Respuesta de la query devuelta por la pagina en JSON junto con su estado
        res.status(200).json({
            payload: rows
        })
    } catch (error) {
        console.log("Error obteniendo productos:", error.message)
    }
})

app.get("/api/products/:id", async (req, res)=>{
    try {
        const { id } = req.params //igual a: id = req.params.id, la solución actual es destructuring
        const querySelectById = "SELECT * FROM products where products.id = ?" //El interrogante es el placeholder (:id)
        const [rows] = await connection.query(querySelectById, [id]) //[id] rellena al placeholder, de ser varios, se usa de forma respectiva

        console.log(rows)
        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.log("Error obteniendo productos:", error.message)
    }
})

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto ", PORT)
})