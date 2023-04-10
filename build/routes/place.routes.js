"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeRoutes = void 0;
const express_1 = __importDefault(require("express"));
exports.placeRoutes = express_1.default.Router();
const places_controllers_1 = require("../controllers/places.controllers");
const photos_middleware_1 = require("../middleware/photos.middleware");
exports.placeRoutes.post("/upload-by-link", places_controllers_1.linkHandler);
exports.placeRoutes.post("/upload", photos_middleware_1.photoMiddleware.array("photos", 10), places_controllers_1.uploadHandler);
exports.placeRoutes.post("/create-place", places_controllers_1.createPlaceHandler);
exports.placeRoutes.get("/", places_controllers_1.getPlacesHandler);
// get places that belong to a user;
exports.placeRoutes.get("/user", places_controllers_1.getUserPlacesHandler);
// get a specific place
exports.placeRoutes.get("/:id", places_controllers_1.getPlaceHandler);
// update a place
exports.placeRoutes.patch("/:id", places_controllers_1.updatePlaceHandler);
// delete a place
exports.placeRoutes.delete("/:id", places_controllers_1.deletePlaceHandler);
