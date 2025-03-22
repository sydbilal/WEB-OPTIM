import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import seoRoutes from "./routes/seoRoutes";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/api/seo", seoRoutes);

const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
