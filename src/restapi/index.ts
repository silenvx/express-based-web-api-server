import express, { Router } from "express";
import { helloWorld } from "./handlers/helloWorld";
import { postUser } from "./handlers/postUser";

export const router = (): Router => {
  const router = express.Router();

  router.get("/", helloWorld);
  router.post("/users", postUser);

  return router;
};
