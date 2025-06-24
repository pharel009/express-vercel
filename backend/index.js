import express from "express";
import dotenv from "dotenv";
import DbConnect from "./config/dataBase.js";
import { globalErrorHandler } from "./middleware/globalError.js";
import shelfRouter from "./routes/shelf.route.js";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 2020;

// Middlewares
app.use('/shelves', shelfRouter)

// Global error middleware
app.use(globalErrorHandler)

const startServer = async () => {
  try {
    await DbConnect(); // connect to database
    if (process.env.NODE_ENV !== "production") {
      app.listen(port, () => {
        console.log(`App is running on http://localhost:${port}`);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
