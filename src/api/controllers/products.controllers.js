//Controladores de prodcutos
import connection from "../database/db.js";


// Index (GET ALL Products)
export const getAllProducts = async (req, res) => {
    try {
        const querySelectAll = "SELECT id, nombre, precio, disponibilidad, img, categoria FROM products";
        const [rows] = await connection.query(querySelectAll); 

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
        const querySelectById = "SELECT id, nombre, precio, disponibilidad, img, categoria FROM products WHERE id = ?";
        const [rows] = await connection.query(querySelectById, [req.id]); // req.id inyectado por tu middleware
        
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
        const { nombre, precio, img, categoria } = req.body; // Cambiado 'imagen' por 'img' para consistencia

        if (!nombre || !img || !categoria || !precio) {
            return res.status(400).json({ message: "Datos inválidos. Asegúrese de incluir todos los datos" });
        }

        // Sanitizar (Ojo: estabas usando 'clearNombre' pero abajo insertabas 'nombre' sin limpiar)
        const clearNombre = nombre.trim();

        const sqlCrearProducto = "INSERT INTO products (nombre, img, categoria, precio) VALUES (?, ?, ?, ?)";
        const [result] = await connection.query(sqlCrearProducto, [clearNombre, img, categoria, precio]);

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

        const sqlModificarProducto = "UPDATE products SET nombre = ?, precio = ?, disponibilidad = ?, img = ?, categoria = ? WHERE id = ?";
        await connection.query(sqlModificarProducto, [nombre, precio, disponibilidad, img, categoria, id]);

        res.status(200).json({ message: "Producto modificado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteProduct = async (req, res) => { 
    try {
        const sqlDeleteById = "DELETE FROM products WHERE id = ?";
        await connection.query(sqlDeleteById, [req.id]);

        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error interno con el servidor" });
    }
}