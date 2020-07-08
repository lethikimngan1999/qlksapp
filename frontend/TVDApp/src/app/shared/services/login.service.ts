import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common_base/base.service';
import { BaseResponse } from 'src/app/models';
import { UserDTO } from 'src/app/models/UserDTO';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/app/models/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private baseService: BaseService) { }

  public getUser(): Observable<BaseResponse<UserDTO>> {
    return this.baseService.get<BaseResponse<UserDTO>>('api/Account/GetUser');
  }

  public getToken(data: LoginDTO): Observable<BaseResponse<string>> {
    return this.baseService.post<BaseResponse<string>>('api/Login', data);
  }
  public validateToken(): Observable<BaseResponse<boolean>> {
    return this.baseService.get<BaseResponse<boolean>>('api/Account/ValidateToken');
  }
}
