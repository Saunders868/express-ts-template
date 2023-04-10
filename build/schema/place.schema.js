"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlaceSchema = exports.getPlaceSchema = exports.createPlaceSchema = exports.imageLinkSchema = void 0;
const zod_1 = require("zod");
exports.imageLinkSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        link: (0, zod_1.string)({
            required_error: "image url needed...!",
        }),
    }),
});
exports.createPlaceSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required.",
        }),
        address: (0, zod_1.string)({
            required_error: "Address is required.",
        }),
        description: (0, zod_1.string)({
            required_error: "Description is required.",
        }),
        maxGuests: (0, zod_1.number)({
            required_error: "Maximum number of guests is required.",
        }),
        price: (0, zod_1.number)({
            required_error: "Price for the listing is required.",
        }),
        photos: (0, zod_1.array)((0, zod_1.string)()),
        extraInfo: (0, zod_1.string)(),
        checkIn: (0, zod_1.string)(),
        checkOut: (0, zod_1.string)(),
        perks: (0, zod_1.array)((0, zod_1.string)()),
    }),
});
exports.getPlaceSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "the place id is required",
        }),
    }),
});
exports.updatePlaceSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "the place id is required",
        }),
    }),
    body: (0, zod_1.object)({
        title: (0, zod_1.string)(),
        address: (0, zod_1.string)(),
        description: (0, zod_1.string)(),
        maxGuests: (0, zod_1.number)(),
        photos: (0, zod_1.array)((0, zod_1.string)()),
        extraInfo: (0, zod_1.string)(),
        checkIn: (0, zod_1.string)(),
        checkOut: (0, zod_1.string)(),
        perks: (0, zod_1.array)((0, zod_1.string)()),
        price: (0, zod_1.number)(),
    }),
});
