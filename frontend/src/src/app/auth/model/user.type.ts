import {Privilage} from "./privilage.type";
import {Role} from "./role.type";

export type UserSession = {
  email: string;
  name: string;
  surname: string;
  accessToken?: string;
  refreshToken?: string;
  privilages: Privilage[];
  role: Role;
}
