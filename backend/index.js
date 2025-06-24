import express from "express";
import dotenv from "dotenv";
import DbConnect from "./config/dataBase.js";
import { globalErrorHandler } from "./middleware/globalError.js";
import shelfRouter from "./routes/shelf.route.js";

dotenv.config();

const app = express();

app.use(express.json());

// Middlewares
app.use("/shelves", shelfRouter);

// Global error middleware
app.use(globalErrorHandler);

await DbConnect(); // connect to database

export default app;
