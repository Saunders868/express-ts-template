"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSchema = exports.updateUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Please enter a Name...!",
        }),
        email: (0, zod_1.string)({
            required_error: "Please enter an Email...!",
        }),
        password: (0, zod_1.string)({
            required_error: "Please enter a Password...!",
        }),
        avatar: (0, zod_1.string)().default(""),
    }),
});
exports.updateUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "user Id required",
        }),
    }),
    body: (0, zod_1.object)({
        name: (0, zod_1.string)(),
        email: (0, zod_1.string)(),
        password: (0, zod_1.string)(),
        avatar: (0, zod_1.string)(),
    }),
});
exports.deleteUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "user Id required",
        }),
    }),
});
