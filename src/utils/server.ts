import express, { Express } from "express";
import cors from "cors";
import routes from "../routes";
import cookieParser from "cookie-parser";

function createServer(): Express {
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );

  const rootDirName = process.cwd() + '/src/uploads';
  
  app.use('/uploads', express.static(rootDirName))
  app.use(express.json());
  app.use(cookieParser());
  routes(app);

  return app;
}

export default createServer;
