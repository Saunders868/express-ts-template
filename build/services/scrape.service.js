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
exports.scrape = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function scrape({ url, articleSelector, titleSelector, linkSelector, imgSelector, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto(url);
        // @ts-ignore
        const data = yield page.evaluate((articleSelector, titleSelector, linkSelector, imgSelector) => {
            const articles = document.querySelectorAll(articleSelector);
            return Array.from(articles).map((article) => {
                var _a, _b;
                const title = (_b = (_a = article.querySelector(titleSelector)) === null || _a === void 0 ? void 0 : _a.innerHTML) === null || _b === void 0 ? void 0 : _b.trim();
                let link;
                let img;
                const linkElement = article.querySelector(linkSelector);
                if (linkElement instanceof HTMLAnchorElement) {
                    // Now you can safely access the href property
                    link = linkElement.href;
                }
                const imgElement = article.querySelector(imgSelector);
                if (imgElement instanceof HTMLImageElement) {
                    // Now you can safely access the href property
                    img = imgElement.src;
                }
                // const link = article.querySelector("a")?.href;
                // const img = article.querySelector("img")?.src;
                return {
                    title,
                    link,
                    img,
                };
            });
        }, articleSelector, titleSelector, linkSelector, imgSelector);
        yield browser.close();
        return data;
    });
}
exports.scrape = scrape;
