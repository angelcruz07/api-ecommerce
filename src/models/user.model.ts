import { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "@config/database";
import bcrypt from "bcryptjs";

interface UserAtributes {
  id: number;
  name: string;
  email: string;
  password?: string;
  id_role: number;
}

interface UserCreationAttributes extends Optional<UserAtributes, "id"> {
  password: string;
}

class User
  extends Model<UserAtributes, UserCreationAttributes>
  implements UserAtributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public id_role!: number;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
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
