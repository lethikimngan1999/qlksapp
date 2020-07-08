import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from 'src/app/common_base/base.service';
import { EmployeeDTO, BaseResponse, EmployeePositionDTO } from 'src/app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private baseSevice: BaseService) { }

    public getAll(): Observable<BaseResponse<EmployeeDTO>> {
        return this.baseSevice.get<BaseResponse<EmployeeDTO[]>>('api/Employee/GetAll');
    }

    public getEmployeeNotAccount(): Observable<BaseResponse<EmployeeDTO>> {
        return this.baseSevice.get<BaseResponse<EmployeeDTO[]>>('api/Employee/GetEmployeeNotAccount');
    }

    public create(data: EmployeeDTO): Observable<BaseResponse<string>> {
        return this.baseSevice.post<BaseResponse<string>>('api/Employee', data);
    }

    public update(data: EmployeeDTO): Observable<BaseResponse<string>> {
        return this.baseSevice.put<BaseResponse<string>>('api/Employee', data);
    }

    public getDetail(employeeId: string): Observable<BaseResponse<string>> {

        const httpParams = new HttpParams().set('employeeId', employeeId);
        return this.baseSevice.get<BaseResponse<string>>('api/Employee/GetById', httpParams);
    }

    public delete(data: any): Observable<BaseResponse<any>> {
        return this.baseSevice.delete<BaseResponse<any>>('api/Employee', data);
    }

}
