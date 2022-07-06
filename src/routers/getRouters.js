import { Router } from "express";
import { getExemplo } from "../controllers/userControllers.js";

const router = Router();

router.get("/exemplo", getExemplo);

export default router;
