import express, { Express } from "express";
import cors from "cors";
import routes from "../routes";

function createServer(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  routes(app);

  return app;
}

export default createServer;