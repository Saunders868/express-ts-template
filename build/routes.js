"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrape_route_1 = require("./routes/scrape.route");
function routes(app) {
    // check api to ensure working
    app.get("/healthcheck", (req, res) => {
        res.sendStatus(200);
    });
    app.use("/api/scrape", scrape_route_1.scrapeRoutes);
}
exports.default = routes;
