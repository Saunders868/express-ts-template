import * as dotenv from "dotenv";
dotenv.config();
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";

const port = process.env.PORT || 3000;
const app = createServer();

app.listen(port, async () => {
logger.info(`app listening at port ${port}`);

await connect();
});