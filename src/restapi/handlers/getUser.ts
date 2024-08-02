import { RequestHandler } from "express";
import { findUsers } from "@repository/findUsers";

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const userName = req.params.userName;

    if (!userName) {
      res.status(400).send("User name is required.");
      return;
    }

    const users = await findUsers();

    const user = users.find((user) => user.name === userName);

    if (!user) {
      res.status(404).send("User not found.");
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
