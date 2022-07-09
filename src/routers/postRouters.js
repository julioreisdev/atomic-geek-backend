import { Router } from "express";
import { register, login } from "../controllers/userControllers.js";
import {
  deleteCarrinho,
  selectProduct,
} from "../controllers/productController.js";
import checkUserExist from "../middlewares/checkUserExist.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { saleMiddleware } from "../middlewares/saleMiddleware.js";
import { postSale } from "../controllers/saleController.js";

const router = Router();

router.post("/register", checkUserExist, register);
router.post("/login", login);
router.post("/home", tokenValidation, selectProduct);
router.post("/deleteCarts", tokenValidation, deleteCarrinho);
router.post("/purchase", tokenValidation, saleMiddleware, postSale)

export default router;
