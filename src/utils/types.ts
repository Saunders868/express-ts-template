export interface ScrapeI {
  url: string;
  articleSelector: string;
  titleSelector: string;
  linkSelector?: string;
  imgSelector?: string;
}