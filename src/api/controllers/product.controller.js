//Controladores de prodcutos
import productsModel from "../models/products.model.js";

// Index (GET ALL Products)
export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await productsModel.selectAllProducts();

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }

        res.status(200).json({
            payload: rows,
            total: rows.length
        });
    } catch (error) {
        res.status(500).json({ message: "Error interno al obtener productos" });
    }
}

export const getProductById = async (req, res) => {
    try {
        const [rows] = await productsModel.selectProductById(req.id)

        if (rows.length === 0) {
            return res.status(404).json({ message: `No se encontró un producto con el id ${req.id}` });
        }

        res.status(200).json({ payload: rows[0] }); // Retornamos el objeto directo, no un array con un único elemento

    } catch (error) {
        res.status(500).json({ message: "Error interno al obtener el producto" });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, disponibilidad, img, categoria } = req.body; // Cambiado 'imagen' por 'img' para consistencia

        if (!nombre || !img || !categoria || precio === undefined || disponibilidad === undefined) {
            return res.status(400).json({ message: "Datos inválidos. Asegúrese de incluir todos los datos" });
        }

        const clearNombre = nombre.trim();

        const [result] = await productsModel.insertProduct(clearNombre, precio, disponibilidad, img, categoria)

        res.status(201).json({
            message: "Producto creado con éxito",
            productId: result.insertId
        });

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const modifyProduct = async (req, res) => {
    try {
        const { id, nombre, precio, disponibilidad, img, categoria } = req.body;

        await productsModel.updateProduct(nombre, precio, disponibilidad, img, categoria, id)

        res.status(200).json({ message: "Producto modificado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await productsModel.deleteProduct(req.id);

        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error interno con el servidor" });
    }
}