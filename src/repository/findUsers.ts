import fs from "fs/promises";
import env from "@constants/env";
import path from "path";
import { User } from "@domain/user";

export const findUsers = async () => {
  const dirPath = env.PERSISTENT_DATA_BASEDIR;

  // ディレクトリ内のファイル名一覧を取得
  const files = await fs.readdir(dirPath);

  // 各ファイルの内容を読み取り
  return Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(dirPath, filename);
      const content = await fs.readFile(filePath, "utf-8");
      const user: User = JSON.parse(content);
      return user;
    })
  );
};
