import User from "../models/user.model";
import type { UserAtributes } from "@interfaces/user.interface";

export class UserService {
  public async getAllUsers(): Promise<User[]> {
    return await User.findAll();
  }

  public async createUser(user: UserAtributes) {
    const { name, email, password, id_role } = user;

    return await User.create({ name, email, password, id_role });
  }
}
