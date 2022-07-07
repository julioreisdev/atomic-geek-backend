import { Router } from "express";
import { postCarrinho } from "../controllers/productController.js";
import { register, login } from "../controllers/userControllers.js";
import checkUserExist from "../middlewares/checkUserExist.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const router = Router();

router.post("/register", checkUserExist, register);
router.post("/login", login);
router.post("/carrinho", tokenValidation, postCarrinho);

export default router;
