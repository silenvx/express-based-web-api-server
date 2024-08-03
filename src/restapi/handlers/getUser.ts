import { findUserByUserName } from "@repository/findUsers";
import { RequestHandler } from "express";

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const userName = req.params.userName;

    if (!userName) {
      res.status(400).send("User name is required.");
      return;
    }

    const user = await findUserByUserName(userName);

    if (!user) {
      res.status(404).send("User not found.");
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
