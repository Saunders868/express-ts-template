"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
// connect to mongoDB database using mongoose package
function connect() {
    const dbUri = process.env.DB_CONNECTION;
    return mongoose_1.default
        .connect(dbUri)
        .then(() => {
        logger_1.default.info("Connected to DB");
    })
        .catch((error) => {
        logger_1.default.error("Could not connect to DB");
        process.exit(1);
    });
}
exports.default = connect;
