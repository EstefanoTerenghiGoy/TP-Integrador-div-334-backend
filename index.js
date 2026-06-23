//Imports
import express from "express";
import environment from "./src/api/config/environment.js"; // ACORDARSE DE PONER .JS EN LA RUTA!!!!
import cors from "cors";
// Destructuramos los middlewares para poder usarlos directamente
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

//Config
const app = express();
const PORT = environment.port;

// Middlewares Globales (SIEMPRE VAN ARRIBA de los endpoints)
app.use(cors()); 
app.use(express.json()); // 👈 ¡FALTA ESTO! Necesario para que Express entienda req.body en POST y PUT

//Middleware logger
app.use(loggerURL)

//Rutas
app.use("/api/products", productRoutes)
// app.use("/api/users")
// app.use("/api/dashboard")
// app.use("/login")

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto", PORT);
});