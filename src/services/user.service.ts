import User from "../models/user.model";

export class UserService {
  public async getAllUsers(): Promise<User[]> {
    return await User.findAll();
  }
}
