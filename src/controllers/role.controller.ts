import type { Request, Response } from "express";
import type { RoleService } from "@services/role.service";


export class RoleController {

    constructor(private readonly roleService: RoleService) {
    }

    // Get all roles
    public getRoles = async (_req: Request, res: Response) => {
        try {
            const roles = await this.roleService.getAllRoles();
            return res.status(200).json(roles);
        } catch (e: any) {
            return res.status(500).json({message: "Error getting roles", error: e});
        }
    }

}