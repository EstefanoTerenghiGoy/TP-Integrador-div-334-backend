//Rutas de vistas

import { Router } from "express";
import { indexView, getView, postView, putView, deleteView } from "../controllers/views.controller.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router()

//Vista principal
router.get("/index", requireLogin, indexView)

//Vista consultar producto
router.get("/get", requireLogin, getView)

//Vista crear producto
router.get("/post", requireLogin, postView)

//Vista modificar producto
router.get("/put", requireLogin, putView)

//Vista eliminar producto   
router.get("/delete", requireLogin, deleteView)

export default router