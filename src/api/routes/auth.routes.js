import { Router } from "express";
import { loginView, getAdminUser } from "../controllers/auth.controller.js";

const router = Router() 

router.get("/", loginView)

router.post("/", getAdminUser)

export default router