"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const mailer_1 = require("../controllers/mailer");
const user_controller_1 = require("../controllers/user.controller");
const photos_middleware_1 = require("../middleware/photos.middleware");
exports.userRoutes = express_1.default.Router();
// get a user profile
exports.userRoutes.get("/profile", user_controller_1.profileHandler);
// upload user photos
exports.userRoutes.post("/upload", photos_middleware_1.userPhotoMiddleware.single("avatar"), user_controller_1.userUploadHandler);
// register a user
exports.userRoutes.post("/", user_controller_1.registerUserHandler);
// send mail to a user
exports.userRoutes.post("/sendMail", mailer_1.handleMail);
// update a user
exports.userRoutes.patch("/:id", user_controller_1.updateUserHandler);
// delete a user
exports.userRoutes.delete(":id", user_controller_1.deleteUserHandler);
