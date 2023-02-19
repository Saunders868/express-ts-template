import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.listen(port, async () => {
  console.log(`app listening at port ${port}`);
});