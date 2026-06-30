// Archivo que va a leer las variables de enotrno (.env) y enviarlas al proyecto (Seguridad)
// Importar el modulo dotenv
import dotenv from "dotenv"

dotenv.config() //Cargar variables de entorno desde .env


//Obtener y exportar las variables de entorno 
export default {
    port: process.env.PORT || 3000, //Si no existe, es el puerto 3000
    session_key: process.env.session_key,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}