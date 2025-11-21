import Role from "../models/role.model";

export class RoleService {
    public async getAllRoles(): Promise<Role[]> {
        return await Role.findAll();
    }

}