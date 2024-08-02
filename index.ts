import env from "@constants/env";
import { router } from "@restapi";
import bodyParser from "body-parser";
import express from "express";

const main = () => {
  expressjs();
};

const expressjs = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(router());

  app.listen(env.PORT);
};

main();
