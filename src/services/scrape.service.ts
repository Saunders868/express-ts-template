import puppeteer from "puppeteer";
import { ScrapeI } from "../utils/types";

export async function scrape({
  url,
  articleSelector,
  titleSelector,
  linkSelector,
  imgSelector,
}: ScrapeI) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // @ts-ignore
  const data = await page.evaluate(( articleSelector,titleSelector,linkSelector,imgSelector) => {
    const articles = document.querySelectorAll(articleSelector);

    return Array.from(articles).map((article) => {
      const title = article.querySelector(titleSelector)?.innerHTML?.trim();
      let link;
      let img
      const linkElement = article.querySelector(linkSelector as string);

      if (linkElement instanceof HTMLAnchorElement) {
        // Now you can safely access the href property
        link = linkElement.href;
      }
      const imgElement = article.querySelector(imgSelector as string);
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

  await browser.close();
  return data;
}
