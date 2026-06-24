import connection from "../database/db.js";


const selectAllProducts = () => {
    const querySelectAll = "SELECT id, nombre, precio, disponibilidad, img, categoria FROM products";
    return connection.query(querySelectAll); 
}


const selectProductById = (id) => {
    const querySelectById = "SELECT id, nombre, precio, disponibilidad, img, categoria FROM products WHERE id = ?";
    return connection.query(querySelectById, [id]);
}


const insertProduct = (nombre, img, categoria, precio) => {
    const sqlCrearProducto = "INSERT INTO products (nombre, img, categoria, precio) VALUES (?, ?, ?, ?)";
    return connection.query(sqlCrearProducto, [nombre, img, categoria, precio]);

}

const updateProduct = (nombre, precio, disponibilidad, img, categoria, id) => {
    const sqlModificarProducto = "UPDATE products SET nombre = ?, precio = ?, disponibilidad = ?, img = ?, categoria = ? WHERE id = ?";
    return connection.query(sqlModificarProducto, [nombre, precio, disponibilidad, img, categoria, id]);
}

const deleteProduct = (id) => {
    const sqlDeleteById = "DELETE FROM products WHERE id = ?";
    return connection.query(sqlDeleteById, [req.id]);
}

//Default = puedo ponerle otro nombre al importarlo
export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}

