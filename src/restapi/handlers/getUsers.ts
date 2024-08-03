import { RequestHandler } from "express";
import { useListUser } from "@injection";

// ユーザーデータを一覧取得し、JSON で返却する関数
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const listUser = useListUser()
    const users = await listUser();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
