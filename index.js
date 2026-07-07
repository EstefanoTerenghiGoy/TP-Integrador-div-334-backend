//Imports
import express from "express";
import environment from "./src/api/config/environment.js"; // ACORDARSE DE PONER .JS EN LA RUTA!!!!
import cors from "cors";
import session from "express-session";
// Destructuramos los middlewares para poder usarlos directamente
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { salesRoutes, userRoutes, authRoutes, productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";

//Config
const app = express();
const { port, session_key } = environment;
const PORT = port;

//Configuramos EJS como motor de plantillas
app.set("view engine", "ejs")
app.set("views", join(__dirname, "src/views"))

// Middlewares Globales (SIEMPRE VAN ARRIBA de los endpoints)
app.use(cors()); 
app.use(express.json());

//Middleware logger
app.use(loggerURL)

// Middleware para parsear los datos enviados de forma nativa con el <form> HTML
app.use(express.urlencoded({ extended: true }));

//Middleware para servir archivos estáticos
app.use(express.static(join(__dirname, "src/public")))

// Middleware de sesion
app.use(session({
    secret: session_key, // Firma las cookies para evitar manipulacion
    resave: false, // Evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarda sesiones vacias
}));

//Rutas
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes);
app.use("/api/sales", salesRoutes);
//Renderizar EJS
app.use("/dashboard", viewRoutes)
app.use("/login", authRoutes);

app.listen(PORT, () => {
    console.log(__dirname)
    console.log("Servidor corriendo en el puerto", PORT);
});