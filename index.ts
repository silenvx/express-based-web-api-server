import env from "@constants/env";
import { router } from "@restapi";
import express from "express";

const main = () => {
  expressjs();
};

const expressjs = () => {
  const app = express();
  app.use(router());
  app.listen(env.PORT);
};

main();
