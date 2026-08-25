import cors from "cors";
import express from "express";
import { postsRouter } from "./routes/posts.routes";
import { errorHandler } from "./middleware/errorHandler";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:3000" }));
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api", postsRouter);

  app.use(errorHandler);

  return app;
}
