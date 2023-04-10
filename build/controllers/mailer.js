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
exports.handleMail = void 0;
const mailgen_1 = __importDefault(require("mailgen"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
let nodeConfig = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
    },
};
let transport = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)(nodeConfig));
let MailGenerator = new mailgen_1.default({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
    },
});
const handleMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email: userEmail, text, subject } = req.body;
    var email = {
        body: {
            name,
            intro: text || "Welcome to Airbnb Clone by Daniel Saunders!",
            outro: "Need help, or have problems? Just reply to this email, we'd love to help",
        },
    };
    var emailBody = MailGenerator.generate(email);
    let message = {
        from: process.env.USERNAME,
        to: userEmail,
        subject: subject || "Registration Completed. Glad to have you!",
        html: emailBody,
    };
    transport
        .sendMail(message)
        .then(() => {
        return res
            .status(200)
            .send({ msg: "You should recieve an email from us." });
    })
        .catch((error) => res.status(500).send({ error }));
});
exports.handleMail = handleMail;
