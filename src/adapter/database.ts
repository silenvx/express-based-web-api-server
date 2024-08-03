import fs from "fs/promises";
import env from "../constants/env";

export const readLocalDatabase = async (): Promise<{ dirPath: string, fileNames: string[] }> => {
    const dirPath = env.PERSISTENT_DATA_BASEDIR;

    // ディレクトリ内のファイル名一覧を取得
    const fileNames = await fs.readdir(dirPath);
    return {
        dirPath,
        fileNames
    }
}
