//Lógica para trabajar con archivos y rutas del proyecto
//Improtar modulos para trabajar con rutas
import { fileURLToPath } from 'url' //Convierte una URL de archivo (file://) a Ruta de sistema 
import { dirname, join } from 'path' //dirname resuelve el directorio padre de una ruta, join une segmentos de forma segura

//Obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url) //URL del modulo actual y transformamos la URL de archivo a URL de sistema

//Obtenemos el directorio del archivo actual
const __dirname = join(dirname(__filename), "../../../")

export {
    __dirname,
    join
}