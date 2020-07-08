import { EmployeeDTO } from './EmployeeDTO';
import { RoleDTO } from './RoleDTO';

export class UserDTO {
    Id: string;
    UserName: string;
    Password: string;
    CreatedBy: string;
    CreatedDate: Date;
    PasswordHash: string;
    UpdatedBy: string;
    UpdatedDate?: Date;
    EmployeeId: string;
    CustomerId: string;
    Status: string;
    Employee: EmployeeDTO;
    RoleIds: string[];
    ListRoles: RoleDTO[];
 }
export class UserChangePasswordDTO {
   UserId: string;
   oldPassword: string;
   newPassword: string;
 }
