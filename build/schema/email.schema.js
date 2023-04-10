"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailSchema = void 0;
const zod_1 = require("zod");
exports.sendEmailSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required...!",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required...!",
        }),
        text: (0, zod_1.string)({
            required_error: "Email body required...!",
        }),
        subject: (0, zod_1.string)({
            required_error: "Email subject is required...!",
        }),
    }),
});
