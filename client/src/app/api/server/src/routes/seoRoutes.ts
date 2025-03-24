import { Router } from "express";
import { analyzeSEO } from "../controllers/seoController"; // Adjusted the import path

const router = Router();

router.post("/analyze", analyzeSEO); // Use the controller function

export default router;
