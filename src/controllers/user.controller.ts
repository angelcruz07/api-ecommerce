import type { Request, Response } from "express";
const userService = new UserService();
import { UserService } from "../services/user.service";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: "Error getting users", error: e.message });
  }
};
