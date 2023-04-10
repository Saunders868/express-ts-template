"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const placeSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const PlaceModel = mongoose_1.default.model("Place", placeSchema);
exports.default = PlaceModel;
