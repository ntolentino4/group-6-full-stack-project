import { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};

export default corsOptions;
