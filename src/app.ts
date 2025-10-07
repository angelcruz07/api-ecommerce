import userRoutes from "@routes/userRoutes";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

export default app;
