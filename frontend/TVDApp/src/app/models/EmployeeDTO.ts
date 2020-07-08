import { EmployeePositionDTO } from './EmployeePositionDTO';
export class EmployeeDTO {
    EmployeeId: string;
    EmployeePositionId: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    Gender: string;
    IdentityCardNumber: string;
    PhoneNumber: string;
    Address: string;
    Email: string;
    BasicSalary: number;
    DateStartWork: Date;
    Image: string;
    EmployeePosition: EmployeePositionDTO[];
}


