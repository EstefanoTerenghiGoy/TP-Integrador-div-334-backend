//Imports
import express from "express";
import environment from "./src/api/config/environment.js"; // ACORDARSE DE PONER .JS EN LA RUTA!!!!
import cors from "cors";
// Destructuramos los middlewares para poder usarlos directamente
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";

//Config
const app = express();
const PORT = environment.port;

//Configuramos EJS como motor de plantillas
app.set("view engine", "ejs")
app.set("views", join(__dirname, "src/views"))

// Middlewares Globales (SIEMPRE VAN ARRIBA de los endpoints)
app.use(cors()); 
app.use(express.json());

//Middleware logger
app.use(loggerURL)

//Middleware para servir archivos estáticos
app.use(express.static(join(__dirname, "src/public")))

//Rutas
app.use("/api/products", productRoutes)
//Renderizar EJS
app.use("/dashboard", viewRoutes)

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto", PORT);
});