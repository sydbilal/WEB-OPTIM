import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import seoRoutes from "./src/routes/seoRoutes"; // Adjust the path if necessary
import { VercelRequest, VercelResponse } from "@vercel/node";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use("/api/seo", seoRoutes);

// Export API handler for Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}
