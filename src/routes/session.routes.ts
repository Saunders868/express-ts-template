import express from "express";
import {
  createSessionHandler,
  logoutHandler,
} from "../controllers/session.controller";
export const sessionRoutes = express.Router();

// create session
sessionRoutes.post("/", createSessionHandler);

// end session
sessionRoutes.post("/logout", logoutHandler);
