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
exports.logoutHandler = exports.createSessionHandler = void 0;
const user_service_1 = require("../services/user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        // check user exists
        const existingUser = yield (0, user_service_1.findUser)({
            email,
        });
        if (!existingUser) {
            return res.status(404).send({
                msg: "No account is registered to this user, please try another email.",
            });
        }
        const passwordMatches = bcrypt_1.default.compareSync(password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
        if (!passwordMatches) {
            return res.status(401).send({
                msg: "Password incorrect, please try again.",
            });
        }
        else {
            jsonwebtoken_1.default.sign({
                email: existingUser.email,
                id: existingUser._id,
                name: existingUser.name,
                avatar: existingUser.avatar,
            }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err)
                    throw err;
                return res.status(200).cookie("token", token).send(existingUser);
            });
        }
    });
}
exports.createSessionHandler = createSessionHandler;
// end session
function logoutHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res
            .cookie("token", "")
            .status(200)
            .send({ msg: "Logged out successfully...!" });
    });
}
exports.logoutHandler = logoutHandler;
