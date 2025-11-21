import User from "@models/user.model";
import Role from "@models/role.model";
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
      throw new Error("Role doesn't exist");
    }

    return await User.create({ name, email, password, id_role });
  }

  public async updateUser(userId: number, changes: Partial<UserCreationAttributes>): Promise<User> {

      if (changes.id_role) {
          const roleExist = await Role.findByPk(changes.id_role);
          if (!roleExist) {
              throw new Error("Role doesn't exist");
          }
      }

      const userExists = await User.findByPk(userId);
      if (!userExists) {
          throw new Error("User not found");
      }

      await User.update(changes, {
          where: { id: userId },
      });

      const updatedUser = await User.findByPk(userId);

      if (!updatedUser) {
          throw new Error("Unexpected error: User not found after update");
      }

      return updatedUser;
  }

}
