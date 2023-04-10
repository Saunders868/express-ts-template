import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { PlaceDocument } from "./place.model";

export interface BookingDocument extends mongoose.Document {
  place: PlaceDocument["id"];
  user: UserDocument["id"];
  checkIn: Date;
  checkOut: Date;
  name: string;
  mobile: string;
  maxGuests: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model<BookingDocument>("Book", bookingSchema);

export default BookingModel;
