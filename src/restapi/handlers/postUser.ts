import { RequestHandler } from "express";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import env from "@constants/env";
import { User } from "@domain/user";

export const postUser: RequestHandler = async (req, res, next) => {
  try {
    // Extract event details from request body
    const { name: userName, role: role }: Partial<User> = req.body;

    // Validate required fields
    if (!userName || !role) {
      res.status(400).send("User name and role are required.");
      return;
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
