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
exports.deletePlace = exports.getPlaces = exports.updatePlace = exports.getPlace = exports.getUserPlaces = exports.createPlace = void 0;
const place_model_1 = __importDefault(require("../models/place.model"));
function createPlace(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const place = yield place_model_1.default.create(input);
            return place;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createPlace = createPlace;
function getUserPlaces(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const places = yield place_model_1.default.find(query).lean();
            return places;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getUserPlaces = getUserPlaces;
function getPlace(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const place = yield place_model_1.default.findOne(query).lean();
            return place;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getPlace = getPlace;
function updatePlace(filter, input, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPlace = yield place_model_1.default.findOneAndUpdate(filter, input, options);
            return updatedPlace;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.updatePlace = updatePlace;
function getPlaces() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const places = yield place_model_1.default.find();
            return places;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getPlaces = getPlaces;
function deletePlace(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedPlace = yield place_model_1.default.findOneAndDelete(filter);
            return deletedPlace;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.deletePlace = deletePlace;
