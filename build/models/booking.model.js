"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    place: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Place",
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const BookingModel = mongoose_1.default.model("Book", bookingSchema);
exports.default = BookingModel;
