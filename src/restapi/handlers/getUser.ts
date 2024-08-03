import { RequestHandler } from "express";
import { } from "@adapter/repository/users";
import { useFindUser } from "@injection";

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const userName = req.params.userName;

    if (!userName) {
      res.status(400).send("User name is required.");
      return;
    }

    const findUser = useFindUser()

    const user = findUser(userName)

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
