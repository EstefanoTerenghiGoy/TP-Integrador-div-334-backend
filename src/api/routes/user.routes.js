import { Router } from "express"; 
import { createAdminUser } from "../controllers/user.controller.js";
const router = Router(); 


// POST user
router.post("/", createAdminUser);

export default router;