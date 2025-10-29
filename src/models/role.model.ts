import { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import type { RoleAttributes } from "@interfaces/role.interface";
import sequelize from "@config/database";

export interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id"> {}

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number;
  public name!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

Role.init(
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
  },
  {
    tableName: "roles",
    sequelize,
    timestamps: false,
  },
);

export default Role;
