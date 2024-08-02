import { RequestHandler } from "express";
import { findUsers } from "@repository/findUsers";

// ユーザーデータを一覧取得し、JSON で返却する関数
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await findUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
