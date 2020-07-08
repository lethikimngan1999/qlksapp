import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from 'src/app/common_base/base.service';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models';
import { UserDTO } from 'src/app/models/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  public getAllEmployeeAccount(): Observable<BaseResponse<UserDTO>> {
    return this.baseService.get<BaseResponse<UserDTO[]>>('api/User/GetAll');
  }

  public createEmployeeAccount(data: UserDTO): Observable<BaseResponse<string>> {
    return this.baseService.post<BaseResponse<string>>('api/User/CreateEmployeeAccount', data);
  }

  public updateEmployeeAccount(data: UserDTO): Observable<BaseResponse<string>>{
    return this.baseService.put<BaseResponse<string>>('api/User/UpdateEmployeeAccount', data);
  }
  public getDetailUser(userId: string): Observable<BaseResponse<string>> {
    const httpParams = new HttpParams().set('userId', userId);
    return this.baseService.post<BaseResponse<string>>('api/User/GetById', httpParams);
  }

  public deleteEmployeeAccount(data: any): Observable<BaseResponse<any>> {
    return this.baseService.delete<BaseResponse<any>>('api/User/DeleteEmployeeAccount', data);
  }

  public getByUsername(userName: any): Observable<BaseResponse<string>> {
    const httpParams = new HttpParams().set('username', userName);
    return this.baseService.get<BaseResponse<string>>('api/User/GetByUserName', httpParams);
  }

  public getAllUserAccountActive(): Observable<BaseResponse<UserDTO>> {
    return this.baseService.get<BaseResponse<UserDTO[]>>('api/User/GetAllUserAccountActive');
  }

  public getAllUserAccountLocked(): Observable<BaseResponse<UserDTO>> {
    return this.baseService.get<BaseResponse<UserDTO[]>>('api/User/GetAllUserAccountLocked');
  }

  public updateStatusAccount(data: any): Observable<BaseResponse<string>> {
    return this.baseService.put<BaseResponse<string>>('api/User/UpdateStatusAccount', data);
  }

  public updatePasswordAccount(data: any): Observable<BaseResponse<string>> {
    return this.baseService.put<BaseResponse<string>>('api/User/ChangePassword', data);
  }
  public resetPasswordAccount(data: any): Observable<BaseResponse<string>> {
    return this.baseService.put<BaseResponse<string>>('api/User/ResetPassword', data);
  }
}
