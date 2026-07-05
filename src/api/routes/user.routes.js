import { Router } from "express"; 
import { createAdminUser } from "../controllers/user.controllers.js";
const router = Router(); 


// POST user
router.post("/", createAdminUser);

export default router;