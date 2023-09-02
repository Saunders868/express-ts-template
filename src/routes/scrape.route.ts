import express from "express";
import { scrapeWebsiteHandler } from "../controllers/scrape.controller";
export const scrapeRoutes = express.Router();

// get a user profile
scrapeRoutes.get("/", scrapeWebsiteHandler);