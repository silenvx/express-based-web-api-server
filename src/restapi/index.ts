import express, { Router } from "express";
import { helloWorld } from "./handlers/helloWorld";

export const router = (): Router => {
  const router = express.Router();

  router.get("/", helloWorld);

  return router;
};
