"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const scrape_controller_1 = require("../controllers/scrape.controller");
exports.scrapeRoutes = express_1.default.Router();
// get a user profile
exports.scrapeRoutes.get("/", scrape_controller_1.scrapeWebsiteHandler);
