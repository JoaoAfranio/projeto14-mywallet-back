import { Router } from "express";
import { login, insertUser, deleteSession } from "../controllers/userController.js";
import { validateInsertUser, validateLogin } from "../middlewares/userMiddleware.js";

import { authenticationToken } from "../middlewares/authenticationMiddleware.js";

const router = Router();

router.post("/login", validateLogin, login);
router.post("/register", validateInsertUser, insertUser);
router.post("/logout", authenticationToken, deleteSession);

export default router;
