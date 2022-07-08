import { Router } from "express";
import { deleteCarrinho } from "../controllers/productController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const router = Router();

router.delete("/carrinho", tokenValidation, deleteCarrinho);

export default router;
