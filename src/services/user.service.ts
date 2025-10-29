import User from "../models/user.model";
import Role from "../models/role.model";
import type { UserCreationAttributes } from "@interfaces/user.interface";

export class UserService {
  public async getAllUsers(): Promise<User[]> {
    return await User.findAll();
  }

  public async createUser(user: UserCreationAttributes): Promise<User> {
    const { name, email, password, id_role } = user;

    // La lógica de negocio (como validar el rol) va AQUÍ
    const roleExist = await Role.findByPk(id_role);
    if (!roleExist) {
      throw new Error("Role does not exist");
    }

    return await User.create({ name, email, password, id_role });
  }
}
