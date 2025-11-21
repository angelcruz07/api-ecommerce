import User from "@models/user.model";
import Role from "@models/role.model";
import type { UserCreationAttributes } from "@interfaces/user.interface";
import bcrypt from "bcryptjs";

export class UserService {

  public async getAllUsers(): Promise<User[]> {
    return await User.findAll();
  }

  public async createUser(user: UserCreationAttributes): Promise<User> {
    const { name, email, password, id_role } = user;

    const roleExist = await Role.findByPk(id_role);

    const passwordHash = await bcrypt.hash(password, 8);

    if (!roleExist) throw new Error("Role doesn't exist");

    return await User.create({ name, email, password: passwordHash, id_role });
  }

  public async updateUser(userId: number, changes: Partial<UserCreationAttributes>): Promise<User> {

      if (changes.id_role) {
          const roleExist = await Role.findByPk(changes.id_role);

          if (!roleExist) throw new Error("Role doesn't exist");
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
