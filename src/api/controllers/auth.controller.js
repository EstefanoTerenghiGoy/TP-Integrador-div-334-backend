import connection from "../database/db.js"

//Vista login
export const loginView = (req, res) => {
    res.render("login", {
        title: "Login"
    })
}

//Obtener usuarios admin
export const getAdminUser = async (req, res) => {
    //Falta crear modelo de usuario (Borrar mañana)
    try {
        //Recibir datos de body
        const { email, password } = req.body

        //Evitar consulta innecesaria
        if (!password, !email){
            return res.render("login", {
                error: "Todos los campos son obligatorios"
            })
            
        }
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?"
        const [rows] = await connection.query(sql, [email, password])
        //Hay que hacer users en db (id, name, email, password)
        if (rows.length === 0) {
            return res.render("login", {
                error: "Credenciales incorrectas"
            })
        }

        const user = rows[0]
        console.table(user)

        //Guardamos una sesion
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        //Con la sesion creada dirigimos al dashboard
        res.redirect("/dashboard/index")

    } catch (error) {
        console.log(error)
    }

}