import { Model, DataTypes } from "sequelize";
import type {
  UserAtributes,
  UserCreationAttributes,
} from "@interfaces/user.interface";
import sequelize from "@config/database";
import bcrypt from "bcryptjs";

class User
  extends Model<UserAtributes, UserCreationAttributes>
  implements UserAtributes
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare id_role: number;

  declare readonly createAt: Date;
  declare readonly updateAt: Date;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toJSON(): any {
        const values = { ...this.get() };
        delete values.password;
        return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    id_role: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: false,
  },
);

export default User;
