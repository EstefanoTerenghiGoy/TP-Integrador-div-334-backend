import { Router } from "express";
import { validateId, validateProducto } from "../middlewares/middlewares.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, modifyProduct } from "../controllers/product.controller.js";

const router = Router() //Inicializamos


// --- Endpoints de Productos ---

// Index (GET ALL Products)
router.get("/", getAllProducts);

// Consultar (GET By ID)
router.get("/:id", validateId, getProductById);

// Crear un producto (POST)
router.post("/", validateProducto, createProduct);

// Modificar un producto (PUT)
router.put("/", validateProducto, modifyProduct);

// Eliminar un producto (DELETE)
router.delete("/:id", validateId, deleteProduct);


export default router;