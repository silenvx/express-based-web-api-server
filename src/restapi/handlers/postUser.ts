import { RequestHandler } from "express";
import path from "path";
import fs from "fs";
import env from "@constants/env";
import { User } from "@domain/user";
import { useCreateUser } from "@injection";

export const postUser: RequestHandler = async (req, res, next) => {
  try {
    // Extract event details from request body
    const { name: userName, role: role }: Partial<User> = req.body;

    // Validate required fields
    if (!userName || !role) {
      res.status(400).send("User name and role are required.");
      return;
    }

    const createUser = useCreateUser()

    await createUser({
      name: userName,
      role
    })

    res.status(200).send("Event data saved successfully.");
  } catch (err) {
    next(err);
  }
};
