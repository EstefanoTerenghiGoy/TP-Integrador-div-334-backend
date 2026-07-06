
import connection from "../database/db.js";
import bcrypt from "bcrypt";

export const createAdminUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Datos inválidos, faltan campos"
            });
        }

        // Definimos las rondas de sal para aleatorizar los valores del password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = "INSERT into users (name, email, password) values (?, ?, ?)";

        const [rows] = await connection.query(sql, [name, email, hashedPassword]);

        res.status(201).json({
            message: "Usuario admin creado con exito"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}