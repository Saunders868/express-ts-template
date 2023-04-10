"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../controllers/booking.controller");
exports.bookingRoutes = express_1.default.Router();
exports.bookingRoutes.post("/", booking_controller_1.createBookingHandler);
exports.bookingRoutes.delete("/:id", booking_controller_1.cancelBookingHandler);
exports.bookingRoutes.get("/user-bookings", booking_controller_1.getUserBookingsHandler);
exports.bookingRoutes.get("/:id", booking_controller_1.getBookingHandler);
