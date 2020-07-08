import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from 'src/app/common_base/base.service';
import { Observable } from 'rxjs';
import { BaseResponse, EmployeePositionDTO } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class EmployeePositionService {

  constructor(private http: HttpClient, private baseSevice: BaseService) { }
    public getAll(): Observable<BaseResponse<EmployeePositionDTO>> {
      return this.baseSevice.get<BaseResponse<EmployeePositionDTO[]>>('api/EmployeePosition/GetAll');
  }
  public create(data: EmployeePositionDTO): Observable<BaseResponse<string>> {
    return this.baseSevice.post<BaseResponse<string>>('api/EmployeePosition', data);
  }
  public update(data: EmployeePositionDTO): Observable<BaseResponse<string>> {
    return this.baseSevice.put<BaseResponse<string>>('api/EmployeePosition', data);
  }
  public delete(data: any): Observable<BaseResponse<any>> {
    return this.baseSevice.delete<BaseResponse<any>>('api/EmployeePosition', data);
  }
}
