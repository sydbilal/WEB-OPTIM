import { Request, Response, Router } from "express";
import {analyzeSEO} from "../controllers/seoController"
const router = Router();

router.post("/analyze", analyzeSEO); // Use the controller function

export default router;
