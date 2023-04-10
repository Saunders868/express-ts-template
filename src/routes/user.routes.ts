import express from "express";
import { handleMail } from "../controllers/mailer";
import {
  deleteUserHandler,
  profileHandler,
  registerUserHandler,
  updateUserHandler,
  userUploadHandler,
} from "../controllers/user.controller";
import { userPhotoMiddleware } from "../middleware/photos.middleware";
export const userRoutes = express.Router();

// get a user profile
userRoutes.get("/profile", profileHandler);

// upload user photos
userRoutes.post("/upload", userPhotoMiddleware.single("avatar"), userUploadHandler);

// register a user
userRoutes.post("/", registerUserHandler);

// send mail to a user
userRoutes.post("/sendMail", handleMail);

// update a user
userRoutes.patch("/:id", updateUserHandler);

// delete a user
userRoutes.delete(":id", deleteUserHandler);
