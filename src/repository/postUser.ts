import fs from "fs";
import path from "path";
import env from "@constants/env";

export const postUserRepo = async (uuid: string, jsonData: string)=> {

    const fileName = `${uuid}.json`;
    const filePath = path.join(env.PERSISTENT_DATA_BASEDIR, fileName);

    // Write to file
    fs.appendFile(filePath, jsonData, (err) => {
      if (err) {
        throw err;
      }
      console.log(`Event data appended to ${filePath}`);
    });
};
