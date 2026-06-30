//Imports
import express from "express";
import environment from "./src/api/config/environment.js"; // ACORDARSE DE PONER .JS EN LA RUTA!!!!
import cors from "cors";
// Destructuramos los middlewares para poder usarlos directamente
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes, authRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";
import session from "express-session";

//Config
const app = express();
const PORT = environment.port;
const session_key = environment.session_key

//Configuramos EJS como motor de plantillas
app.set("view engine", "ejs")
app.set("views", join(__dirname, "src/views"))

// Middlewares Globales (SIEMPRE VAN ARRIBA de los endpoints)
app.use(cors()); 
app.use(express.json());

//Middleware para parsear datos de Form de forma nativa
app.use(express.urlencoded({ extended: true })) //Los datos del form llegaran como objetos a nuestro endpoint

//Middleware logger
app.use(loggerURL)

//Middleware para servir archivos estáticos
app.use(express.static(join(__dirname, "src/public")))

app.use(session({
    secret: session_key, // Firma las cookies para evitar manipulación
    resave: false, // Evita guardar la sesión si no hubo cambios,
    saveUninitialized: true // No guarda sesiones vacías
}))

//Rutas
app.use("/api/products", productRoutes)
//Renderizar EJS
app.use("/dashboard", viewRoutes)
//Renderizar lgoin
app.use("/login", authRoutes)

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto", PORT);
});