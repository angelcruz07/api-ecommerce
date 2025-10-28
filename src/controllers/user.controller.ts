import type { Request, Response } from "express";
const userService = new UserService();
import { UserService } from "../services/user.service";
import User from "../models/user.model";

// GET
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

// POST
export const createUser = async (req: any, res: any) => {
  try {
    const { name, email, password, id_role } = req.body;

    if (!name || !email || !password || !id_role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      id_role,
    });

    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ message: "Error creating user " });
  }
};

// PUT
export const updateUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, email, password, id_role } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing user id" });
    }

    if (!id_role) {
      return res.status(400).json({ message: "Missing role id" });
    }

    const roleExist = await User.findOne({ where: { id: id_role } });

    if (!roleExist) {
      return res.status(400).json({ message: "Role does not exist" });
    }

    const user = await User.update(
      {
        name,
        email,
        password,
        id_role,
      },
      {
        where: { id },
      },
    );
    return res.status(200).json({ message: "User updated successfully" });
  } catch (e) {
    console.log(e);
  }
};
