import { RequestHandler } from "express";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import env from "@constants/env";
import { User } from "@domain/user";
import { findUsers } from "@repository/findUsers";
import { validationUser } from "@validations/user";

export const postUser: RequestHandler = async (req, res, next) => {
  try {
    // Extract event details from request body
    const { name: userName, role: role }: Partial<User> = req.body;

    // Validate required fields
    const err = validationUser({ name: userName, role: role });
    if (err.hasError) {
      res.status(400).send(err.message);
      return;
    }
    // Validate used name
    {
      const users = await findUsers();
      if (
        /* username already used */ users.some((user) => user.name === userName)
      ) {
        res.status(409).send("Username already used.");
        return;
      }
    }

    // Prepare JSON content
    const jsonData = JSON.stringify({ name: userName, role: role });

    // Determine the file path using environment variable or default
    const uuid = uuidv4();
    const fileName = `${uuid}.json`;
    const filePath = path.join(env.PERSISTENT_DATA_BASEDIR, fileName);

    // Write to file
    fs.appendFile(filePath, jsonData, (err) => {
      if (err) {
        throw err;
      }
      console.log(`Event data appended to ${filePath}`);
    });

    res.status(200).send("Event data saved successfully.");
  } catch (err) {
    next(err);
  }
};
