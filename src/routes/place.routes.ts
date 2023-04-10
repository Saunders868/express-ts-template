import express from "express";
export const placeRoutes = express.Router();
import {
  createPlaceHandler,
  deletePlaceHandler,
  getPlaceHandler,
  getPlacesHandler,
  getUserPlacesHandler,
  linkHandler,
  updatePlaceHandler,
  uploadHandler,
} from "../controllers/places.controllers";
import { photoMiddleware } from "../middleware/photos.middleware";

placeRoutes.post("/upload-by-link", linkHandler);
placeRoutes.post("/upload", photoMiddleware.array("photos", 10), uploadHandler);
placeRoutes.post("/create-place", createPlaceHandler);

placeRoutes.get("/", getPlacesHandler);
// get places that belong to a user;
placeRoutes.get("/user", getUserPlacesHandler);
// get a specific place
placeRoutes.get("/:id", getPlaceHandler);
// update a place
placeRoutes.patch("/:id", updatePlaceHandler);
// delete a place
placeRoutes.delete("/:id", deletePlaceHandler);
