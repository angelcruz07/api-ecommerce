import allRoutes from "@routes/index.routes";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", allRoutes);

export default app;
