import * as dotenv from "dotenv";
dotenv.config();
import createServer from "./utils/server";
import logger from "./utils/logger";

const port = process.env.PORT || 3000;
const app = createServer();

app.listen(port, async () => {
  logger.info(`app listening at port ${port}`);
});
