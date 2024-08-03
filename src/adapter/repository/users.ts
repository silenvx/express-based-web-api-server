import fs from "fs/promises";
import path from "path";
import env from "../../constants/env";
import { v4 as uuidv4 } from "uuid";
import { User } from "@domain/user";
import { UserAPI } from "@port/user";
import { readLocalDatabase } from "@adapter/database";

export const useInMemoryUserAPI: UserAPI = {
  list: async () => {
    const { dirPath, fileNames } = await readLocalDatabase()

    // 各ファイルの内容を読み取り
    return Promise.all(
      fileNames.map(async (fileName) => {
        const user = await getUserFromFile(dirPath, fileName)
        return user;
      })
    );
  },
  find: async (name: string) => {
    const { dirPath, fileNames } = await readLocalDatabase()

    // 各ファイルの内容を読み取り
    for await (const fileName of fileNames) {
      const user = await getUserFromFile(dirPath, fileName)
      if (user.name === name) {
        return user
      }
    }

    throw new Error("user not found");
  },
  create: async (createUser: User) => {
    const { dirPath, fileNames } = await readLocalDatabase()

    // 各ファイルの内容を読み取り
    for await (const fileName of fileNames) {
      const user = await getUserFromFile(dirPath, fileName)
      if (createUser.name === user.name) {
        throw new Error("Conflict Error");
      }
    }

    // Determine the file path using environment variable or default
    const uuid = uuidv4();
    const fileName = `${uuid}.json`;
    const filePath = path.join(env.PERSISTENT_DATA_BASEDIR, fileName);

    const jsonData = JSON.stringify({ name: createUser.name, role: createUser.role });
    // Write to file
    fs.appendFile(filePath, jsonData);
    console.log(`Event data appended to ${filePath}`);
  }
}

const getUserFromFile = async (dirPath: string, fileName: string): Promise<User> => {
  try {
    const filePath = path.join(dirPath, fileName);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      throw new Error(`failed to get user from local file: ${e.message}`);
    }
    throw new Error("unexpected error in get user from local file")
  }
}
