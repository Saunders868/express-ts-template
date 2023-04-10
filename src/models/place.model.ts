import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface PlaceDocument extends mongoose.Document {
  owner: UserDocument["_id"];
  title: string;
  address: string;
  photos: string[];
  description: string;
  perks: string[];
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const placeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photos: [{ type: String, default: "" }],
    description: {
      type: String,
      required: true,
    },
    perks: [
      {
        type: String,
        default: "",
      },
    ],
    extraInfo: {
      type: String,
      default: "",
    },
    checkIn: {
      type: String,
      default: "00:00",
    },
    checkOut: {
      type: String,
      default: "00:00",
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PlaceModel = mongoose.model<PlaceDocument>("Place", placeSchema);

export default PlaceModel;
