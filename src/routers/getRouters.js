import { Router } from "express";
import { getExemplo } from "../controllers/userControllers.js";
import { getProducts } from "../controllers/productController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const router = Router();

router.get("/exemplo", getExemplo);
router.get("/home", tokenValidation, getProducts)

export default router;
