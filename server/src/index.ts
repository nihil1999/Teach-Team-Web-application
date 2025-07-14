import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/authRoutes';
import requestRoutes from './routes/requestRoutes';
import applicationRoutes from './routes/applicationRoutes';
import rankingRoutes from "./routes/rankingRoutes";

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(express.json());

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.use("/api/auth", authRoutes);
    app.use("/api/request", requestRoutes);
    app.use("/api/application", applicationRoutes);
    app.use("/api/ranking", rankingRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );

  export default app;