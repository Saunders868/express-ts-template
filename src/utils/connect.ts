// import mongoose from "mongoose";
import logger from "./logger";

// connect to mongoDB database using mongoose package
function connect() {
  const dbUri = process.env.DBURI!;

  // return mongoose
  //   .connect(dbUri)
  //   .then(() => {
  //     logger.info("Connected to DB");
  //   })
  //   .catch((error) => {
  //     logger.error("Could not connect to DB");
  //     process.exit(1);
  //   });
}

export default connect;
