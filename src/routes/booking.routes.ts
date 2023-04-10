import express from "express";
import {
  cancelBookingHandler,
  createBookingHandler,
  getBookingHandler,
  getUserBookingsHandler,
} from "../controllers/booking.controller";
export const bookingRoutes = express.Router();

bookingRoutes.post("/", createBookingHandler);
bookingRoutes.delete("/:id", cancelBookingHandler);
bookingRoutes.get("/user-bookings", getUserBookingsHandler);
bookingRoutes.get("/:id", getBookingHandler);
