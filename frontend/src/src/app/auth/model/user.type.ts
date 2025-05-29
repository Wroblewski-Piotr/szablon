import {PrivilageEnum} from "../../commons/enums/privilage.enum";
import {Role} from "../../commons/enums/role.enum";
import { OrganizationTypeEnum } from "../../commons/enums/organization-type-enum";

export type UserSession = {
  email: string;
  name: string;
  surname: string;
  accessToken?: string;
  refreshToken?: string;
  privilages: PrivilageEnum[];
  organizationName: string;
  organizationType: OrganizationTypeEnum;
  role: Role;
}
