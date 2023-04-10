"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const session_controller_1 = require("../controllers/session.controller");
exports.sessionRoutes = express_1.default.Router();
// create session
exports.sessionRoutes.post("/", session_controller_1.createSessionHandler);
// end session
exports.sessionRoutes.post("/logout", session_controller_1.logoutHandler);
