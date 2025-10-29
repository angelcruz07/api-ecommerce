import type { Optional } from "sequelize";

export interface UserAtributes {
  id: number;
  name: string;
  email: string;
  password?: string;
  id_role: number;
}

export interface UserCreationAttributes extends Optional<UserAtributes, "id"> {
  password: string;
}
