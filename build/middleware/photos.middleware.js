"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPhotoMiddleware = exports.photoMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
exports.photoMiddleware = (0, multer_1.default)({ dest: "src/uploads" });
exports.userPhotoMiddleware = (0, multer_1.default)({ dest: "src/uploads/user" });
