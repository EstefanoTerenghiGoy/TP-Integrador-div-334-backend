//Rutas de vistas

import { Router } from "express";
import { indexView, getView, postView, putView, deleteView } from "../controllers/views.controller.js";
const router = Router()

//Vista principal
router.get("/index", indexView)

//Vista consultar producto
router.get("/get", getView)

//Vista crear producto
router.get("/post", postView)

//Vista modificar producto
router.get("/put", putView)

//Vista eliminar producto   
router.get("/delete", deleteView)

export default router