import { Router } from "express";
import { postCarrinho } from "../controllers/productController.js";
import { register, login } from "../controllers/userControllers.js";
import { selectProduct } from "../controllers/productController.js";
import checkUserExist from "../middlewares/checkUserExist.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const router = Router();

router.post("/register", checkUserExist, register);
router.post("/login", login);
router.post("/home", tokenValidation, selectProduct);
router.post("/carrinho", tokenValidation, postCarrinho);

export default router;