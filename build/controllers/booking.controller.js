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
exports.cancelBookingHandler = exports.getBookingHandler = exports.getUserBookingsHandler = exports.createBookingHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const booking_service_1 = require("../services/booking.service");
const mongoose_1 = __importDefault(require("mongoose"));
function createBookingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = req.cookies;
            const input = req.body;
            const placeObjectId = new mongoose_1.default.Types.ObjectId(input.place);
            let tokenValid;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {}, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    tokenValid = true;
                    // @ts-ignore
                    const { id } = user;
                    const booking = yield (0, booking_service_1.createBooking)(Object.assign(Object.assign({}, input), { place: placeObjectId, user: id }));
                    return res.status(200).send(booking);
                }));
            }
            else {
                tokenValid = false;
                return res.status(401).send({ err: "User not verified." });
            }
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.createBookingHandler = createBookingHandler;
function getUserBookingsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = req.cookies;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {}, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    // @ts-ignore
                    const { id } = user;
                    const bookings = yield (0, booking_service_1.getUserBookings)({ user: id });
                    return res.status(200).send(bookings);
                }));
            }
            else {
                return res.status(401).send({ error: "User not verified." });
            }
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.getUserBookingsHandler = getUserBookingsHandler;
function getBookingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const booking = yield (0, booking_service_1.findBooking)({ _id: id });
            if (!booking) {
                return res.status(404).send({ err: "Booking not found." });
            }
            return res.status(200).send(booking);
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.getBookingHandler = getBookingHandler;
function cancelBookingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const booking = yield (0, booking_service_1.findBooking)({ _id: id });
            if (!booking) {
                return res.status(404).send({ err: "Booking not found." });
            }
            const deletedBooking = yield (0, booking_service_1.deleteBooking)({ _id: id });
            return res.status(200).send(deletedBooking);
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.cancelBookingHandler = cancelBookingHandler;
