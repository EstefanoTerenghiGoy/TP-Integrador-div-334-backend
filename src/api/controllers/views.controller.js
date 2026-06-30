//Controlador de vistas

import productsModel from "../models/products.model.js"

//Vista index
export const indexView = async (req, res) => {
    try {
        const [rows] = await productsModel.selectAllProducts()
        res.render("index", {
            title: "Inicio",
            productsList: rows
        })
    } catch (error) {
        console.log(error)
    }
}

//Vista get
export const getView = (req, res) => {
    try {
        res.render("get", {
            title: "Consultar"
        })
    } catch (error) {
        console.log(error)
    }
}

//Vista post
export const postView = (req, res) => {
    try {
        res.render("post", {
            title: "Crear"
        })
    } catch (error) {
        console.log(error)
    }
}

//Vista put
export const putView = (req, res) => {
    try {
        res.render("put", {
            title: "Modificar"
        })
    } catch (error) {
        console.log(error)
    }
}

//Vista delete
export const deleteView = (req, res) => {
    try {
        res.render("delete", {
            title: "Eliminar"
        })
    } catch (error) {
        console.log(error)
    }
}