"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const booking_routes_1 = require("./routes/booking.routes");
const place_routes_1 = require("./routes/place.routes");
const session_routes_1 = require("./routes/session.routes");
const user_routes_1 = require("./routes/user.routes");
function routes(app) {
    // check api to ensure working
    app.get("/healthcheck", (req, res) => {
        res.sendStatus(200);
    });
    app.use("/api/users", user_routes_1.userRoutes);
    app.use("/api/sessions", session_routes_1.sessionRoutes);
    app.use("/api/places", place_routes_1.placeRoutes);
    app.use("/api/bookings", booking_routes_1.bookingRoutes);
}
exports.default = routes;
