import mysql2 from "mysql2/promise"
import environments from "../config/environment.js" //En modo promesa, para usar await connection.query() para una sentencia SQL

//Creo un objeto que contiene todas las variables de .env
const { database } = environments

//Crear conexión a la BD
const connection = mysql2.createPool({ //createPool crea un grupo (pool) de conexiones a la BD (Hasta 10 conexiones simultaneas)
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
})

//Exportar la conexión para usarla
export default connection;