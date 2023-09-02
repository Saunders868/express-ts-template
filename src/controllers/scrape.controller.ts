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
    // const linkSelector = req.query.linkSelector;
    // const imgSelector = req.query.imgSelector;

    const movieTowneData = await scrape({ url, articleSelector, titleSelector });
    res.json({ message: "great work", articles: movieTowneData });
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ err: error });
  }
}
