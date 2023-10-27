import { Request, Response } from "express";
import { scrape } from "../services/scrape.service";
import { ScrapeQueryParameters } from "../shemas/scrape.shema";

// GET /endpoint?url=example.com&article=123
export async function scrapeWebsiteHandler(
  // req: Request, 
  req: Request<{}, {}, {}, ScrapeQueryParameters>, 
  res: Response) {
  try {
    const articleSelector = req.query.articleSelector;
    const url = req.query.url;
    const titleSelector = req.query.titleSelector;
    const linkSelector = req.query.linkSelector;
    const imgSelector = req.query.imgSelector;

    const data = await scrape({ url, articleSelector, titleSelector, linkSelector, imgSelector });
    res.json({ message: "success", articles: data });
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ err: error });
  }
}
