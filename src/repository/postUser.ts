import { User } from "@domain/user";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import env from "@constants/env";

import fs from "fs";

export const postUserRepo = async (id: string, user: User) => {
    // Prepare JSON content
    const jsonData = JSON.stringify({ name: user.name, role: user.role });

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
}
