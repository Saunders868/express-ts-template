import { Express, Request, Response } from "express";

function routes(app: Express) {
  // check api to ensure working
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // app.use("/api/users", userRoutes);
}

export default routes;
