import connection from "../database/db.js";


const selectAllProducts = () => {
    const querySelectAll = "SELECT id, nombre, precio, disponibilidad, img, categoria FROM products";
    return connection.query(querySelectAll); 
}


const selectProductById = (id) => {
    const querySelectById = "SELECT id, nombre, precio, disponibilidad, img, categoria FROM products WHERE id = ?";
    return connection.query(querySelectById, [id]);
}


const insertProduct = (nombre, precio, disponibilidad, img, categoria) => {
    const sqlCrearProducto = "INSERT INTO products (nombre, precio, disponibilidad, img, categoria) VALUES (?, ?, ?, ?, ?)";
    return connection.query(sqlCrearProducto, [nombre, precio, disponibilidad, img, categoria]);

}

const updateProduct = (nombre, precio, disponibilidad, img, categoria, id) => {
    const sqlModificarProducto = "UPDATE products SET nombre = ?, precio = ?, disponibilidad = ?, img = ?, categoria = ? WHERE id = ?";
    return connection.query(sqlModificarProducto, [nombre, precio, disponibilidad, img, categoria, id]);
}

const deleteProduct = (id) => {
    const sqlDeleteById = "DELETE FROM products WHERE id = ?";
    return connection.query(sqlDeleteById, [id]);
}

//Default = puedo ponerle otro nombre al importarlo
export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}

