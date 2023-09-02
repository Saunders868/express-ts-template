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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeWebsiteHandler = void 0;
const scrape_service_1 = require("../services/scrape.service");
// GET /endpoint?url=example.com&article=123
function scrapeWebsiteHandler(
// req: Request, 
req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const articleSelector = req.query.articleSelector;
            const url = req.query.url;
            const titleSelector = req.query.titleSelector;
            // const linkSelector = req.query.linkSelector;
            // const imgSelector = req.query.imgSelector;
            const movieTowneData = yield (0, scrape_service_1.scrape)({ url, articleSelector, titleSelector });
            res.json({ message: "great work", articles: movieTowneData });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ err: error });
        }
    });
}
exports.scrapeWebsiteHandler = scrapeWebsiteHandler;
