import { Router } from "express";
import { register, login } from "../controllers/userControllers.js";
import checkUserExist from "../middlewares/checkUserExist.js";

const router = Router();

router.post("/register", checkUserExist, register);
router.post("/login", login);

export default router;
