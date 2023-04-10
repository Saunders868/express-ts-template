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
exports.profileHandler = exports.deleteUserHandler = exports.updateUserHandler = exports.userUploadHandler = exports.registerUserHandler = void 0;
const lodash_1 = require("lodash");
const user_service_1 = require("../services/user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const place_model_1 = __importDefault(require("../models/place.model"));
const booking_model_1 = __importDefault(require("../models/booking.model"));
const fs_1 = require("fs");
function registerUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.body;
            // check if already exists
            const existingUser = yield (0, user_service_1.findUser)({
                email: userData.email,
            });
            if (!existingUser) {
                const user = yield (0, user_service_1.createUser)(userData);
                res.status(200).send((0, lodash_1.omit)(user, "password"));
            }
            else {
                res.status(409).send({ msg: "Email already exists...!" });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ err: error });
        }
    });
}
exports.registerUserHandler = registerUserHandler;
// upload user avatar
function userUploadHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let uploadedFile;
            if (req.file) {
                // @ts-ignore
                const { path, originalname } = req.file;
                const parts = originalname.split(".");
                const ext = parts[parts.length - 1];
                const newPath = path + "." + ext;
                (0, fs_1.renameSync)(path, newPath);
                uploadedFile = newPath.replace("src/uploads/user", "");
            }
            return res.status(200).send(uploadedFile);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
        }
    });
}
exports.userUploadHandler = userUploadHandler;
function updateUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const update = req.body;
            const existingUser = yield (0, user_service_1.findUser)({
                _id: id,
            });
            if (!existingUser) {
                res.status(404).send({ msg: "User does not exist...!" });
            }
            const updatedUser = yield (0, user_service_1.updateUser)({
                _id: id,
            }, update, { new: true });
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.updateUserHandler = updateUserHandler;
function deleteUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const existingUser = yield (0, user_service_1.findUser)({
                _id: id,
            });
            if (!existingUser) {
                res.status(404).send({ msg: "User does not exist...!" });
            }
            const deletedPlaces = yield place_model_1.default.deleteMany({ owner: id });
            const deletedBookings = yield booking_model_1.default.deleteMany({ user: id });
            const otherBookingsDeleted = yield booking_model_1.default.deleteMany({
                "place.owner": id,
            });
            return res.status(200).json({
                deletedBookings,
                deletedPlaces,
                otherBookingsDeleted,
            });
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.deleteUserHandler = deleteUserHandler;
function profileHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = req.cookies;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
                    if (err)
                        throw err;
                    return res.status(200).json(user);
                });
            }
            else {
                return res.status(404).json({ msg: "Token not found" });
            }
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.profileHandler = profileHandler;
