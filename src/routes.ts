import { Express, Request, Response } from "express";
import { bookingRoutes } from "./routes/booking.routes";
import { placeRoutes } from "./routes/place.routes";
import { sessionRoutes } from "./routes/session.routes";
import { userRoutes } from "./routes/user.routes";

function routes(app: Express) {
  // check api to ensure working
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use("/api/users", userRoutes);
  app.use("/api/sessions", sessionRoutes);
  app.use("/api/places", placeRoutes);
  app.use("/api/bookings", bookingRoutes);
}

export default routes;
