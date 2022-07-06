import { Router } from "express";
import { register } from "../controllers/userControllers.js";
import checkUserExist from "../middlewares/checkUserExist.js";

const router = Router();

router.post("/register", checkUserExist, register);

export default router;
