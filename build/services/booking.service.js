"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.getBookings = exports.getUserBookings = exports.findBooking = exports.createBooking = void 0;
const booking_model_1 = __importDefault(require("../models/booking.model"));
function createBooking(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const booking = yield booking_model_1.default.create(input);
            return booking;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createBooking = createBooking;
function findBooking(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const booking = yield booking_model_1.default.findOne(query).populate('place').lean();
            return booking;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.findBooking = findBooking;
function getUserBookings(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookings = yield booking_model_1.default.find(query).populate('place').lean();
            return bookings;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getUserBookings = getUserBookings;
function getBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookings = yield booking_model_1.default.find().lean();
            return bookings;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getBookings = getBookings;
function deleteBooking(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedBooking = yield booking_model_1.default.findOneAndDelete(query);
            return deletedBooking;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.deleteBooking = deleteBooking;
