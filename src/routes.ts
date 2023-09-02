import { Express, Request, Response } from "express";
import { scrapeRoutes } from "./routes/scrape.route";

function routes(app: Express) {
  // check api to ensure working
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use("/api/scrape", scrapeRoutes);
}

export default routes;