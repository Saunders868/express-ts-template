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
exports.deletePlaceHandler = exports.getPlacesHandler = exports.updatePlaceHandler = exports.getPlaceHandler = exports.getUserPlacesHandler = exports.createPlaceHandler = exports.uploadHandler = exports.linkHandler = void 0;
const image_downloader_1 = __importDefault(require("image-downloader"));
const fs_1 = require("fs");
const place_service_1 = require("../services/place.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function linkHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { link } = req.body;
        try {
            const rootDirName = process.cwd();
            const newName = "photo" + Date.now() + ".jpg";
            yield image_downloader_1.default.image({
                url: link,
                dest: rootDirName + "/src/uploads/" + newName,
            });
            return res.status(200).send(newName);
        }
        catch (error) {
            return res.status(500).send({ error: error });
        }
    });
}
exports.linkHandler = linkHandler;
function uploadHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uploadedFiles = [];
            if (req.files) {
                for (let i = 0; i < req.files.length; i++) {
                    // @ts-ignore
                    const { path, originalname } = req.files[i];
                    const parts = originalname.split(".");
                    const ext = parts[parts.length - 1];
                    const newPath = path + "." + ext;
                    (0, fs_1.renameSync)(path, newPath);
                    uploadedFiles.push(newPath.replace("src/uploads/", ""));
                }
            }
            return res.status(200).send(uploadedFiles);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
        }
    });
}
exports.uploadHandler = uploadHandler;
function createPlaceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = req.cookies;
            const { title, description, address, maxGuests, photos, perks, extraInfo, checkIn, checkOut, price, } = req.body;
            let tokenValid;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {}, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    tokenValid = true;
                    const placeDocument = yield (0, place_service_1.createPlace)({
                        title,
                        description,
                        address,
                        maxGuests,
                        photos,
                        perks,
                        extraInfo,
                        checkIn,
                        checkOut,
                        price,
                        // @ts-ignore
                        owner: user === null || user === void 0 ? void 0 : user.id,
                    });
                    return res.status(204).send(placeDocument);
                }));
            }
            else {
                tokenValid = false;
                return res.status(401).send({ error: "User not verified." });
            }
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.createPlaceHandler = createPlaceHandler;
function getUserPlacesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = req.cookies;
            let tokenValid;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {}, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    tokenValid = true;
                    // @ts-ignore
                    const { id } = user;
                    const places = yield (0, place_service_1.getUserPlaces)({ owner: id });
                    return res.status(200).send(places);
                }));
            }
            else {
                tokenValid = false;
                return res.status(401).send({ error: "User not verified." });
            }
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.getUserPlacesHandler = getUserPlacesHandler;
function getPlaceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const existingPlace = yield (0, place_service_1.getPlace)({ _id: id });
            if (!existingPlace) {
                return res.status(404).send({ err: "Place not Found...!" });
            }
            return res.status(200).send(existingPlace);
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.getPlaceHandler = getPlaceHandler;
function updatePlaceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const update = req.body;
            const { token } = req.cookies;
            let tokenValid;
            let userDoc;
            // check if user verified, and set user document
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {}, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    tokenValid = true;
                    userDoc = user;
                    const existingPlace = yield (0, place_service_1.getPlace)({ _id: id });
                    if (!existingPlace) {
                        return res.status(404).send({ err: "Place not Found...!" });
                    }
                    // @ts-ignore
                    if ((existingPlace === null || existingPlace === void 0 ? void 0 : existingPlace.owner.toString()) !== (userDoc === null || userDoc === void 0 ? void 0 : userDoc.id)) {
                        return res
                            .status(401)
                            .send({ err: "User does not own this listing...!" });
                    }
                }));
            }
            const updatedPlace = yield (0, place_service_1.updatePlace)({ _id: id }, update, { new: true });
            return res.status(200).send(updatedPlace);
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.updatePlaceHandler = updatePlaceHandler;
function getPlacesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const places = yield (0, place_service_1.getPlaces)();
            return res.status(200).send(places);
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.getPlacesHandler = getPlacesHandler;
function deletePlaceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const existingPlace = yield (0, place_service_1.getPlace)({ _id: id });
            if (!existingPlace) {
                return res.status(404).send({ err: "Place not Found...!" });
            }
            const deletedPlace = yield (0, place_service_1.deletePlace)({ _id: id });
            return res.status(200).send(deletedPlace);
        }
        catch (error) {
            return res.status(500).send({ err: error });
        }
    });
}
exports.deletePlaceHandler = deletePlaceHandler;
