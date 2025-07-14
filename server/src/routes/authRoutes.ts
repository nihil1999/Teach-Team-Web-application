import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { updateUser } from "../controllers/updateUserController";

const router = Router();

// Define authentication and user update routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.put("/user/update/:userId", updateUser);

export default router;
