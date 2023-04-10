"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createBookingSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        checkIn: (0, zod_1.date)({
            required_error: "Check in date is needed!",
        }),
        checkOut: (0, zod_1.date)({
            required_error: "Check out date is needed!",
        }),
        name: (0, zod_1.string)({
            required_error: "Name is needed!",
        }),
        mobile: (0, zod_1.string)({
            required_error: "Mobile is needed!",
        }),
        place: (0, zod_1.string)({
            required_error: "Mobile is needed!",
        }),
        maxGuests: (0, zod_1.number)({
            required_error: "Max guests is needed!",
        }),
    }),
});
const cancelBookingSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "booking id is needed.",
        }),
    }),
});
