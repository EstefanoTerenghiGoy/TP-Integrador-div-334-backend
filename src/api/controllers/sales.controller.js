import connection from "../database/db.js";

export const createSale = async (req, res) => {
    try {
        const { total_price, user_name } = req.body;
        const sql = ` INSERT INTO sales (total_price, user_name) VALUES (?, ?) `; // No creo un sales.model.js porque solamente uso un modelo, nunca voy a elminar ni demás.
        await connection.query(sql, [total_price, user_name]);

        res.status(201).json({
            message: "Venta registrada correctamente"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};