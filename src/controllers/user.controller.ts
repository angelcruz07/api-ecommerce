import type { Request, Response } from "express";
import type { UserService } from "@services/user.service";

export class  UserController {

    constructor(private userService: UserService) {}

    // GET
    public getUsers = async (_req: Request, res: Response) => {
        try {
            const users = await this.userService.getAllUsers();

            return res.status(200).json(users);
        } catch (e: any) {
            return res
                .status(500)
                .json({message: "Error getting users", error: e.message});
        }
    };

    // POST
    public createUser = async (req: any, res: any) => {
        try {

            // We get from request
            const { name, email, password, id_role } = req.body;

            if (!name || !email || !password || !id_role) {
                return res.status(400).json({message: "Missing required fields"});
            }

            const newUser = await this.userService.createUser({ name, email, password, id_role });

            return res.status(200).json({
                message: "User created successfully",
                data: newUser
            });
        } catch (e: any) {
            console.log(e);
            return res.status(500).json({message: "Error creating user ", error: e});
        }
    };

    // PUT
    public updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, email, password, id_role } = req.body;

            const userId = Number(id);

            if (!userId) return res.status(400).json({ message: "Invalid user id" });

            const user = await this.userService.updateUser(userId, {
                    name, email, password, id_role,
                });

            const userPlain = user.toJSON();

            const { password: _, ...userWithoutPassword } = userPlain;

            return res.status(200).json({
                message: "User updated successfully",
                data: userWithoutPassword
            });

        } catch (e) {
            console.log(e);
            return res.status(500).json({message: "Error updating user", error: e});
        }
    }
}