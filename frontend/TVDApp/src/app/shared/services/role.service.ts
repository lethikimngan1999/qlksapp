import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common_base/base.service';
import { BaseResponse } from 'src/app/models';
import { Observable } from 'rxjs';
import { RoleDTO } from 'src/app/models/RoleDTO';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private baseService: BaseService) {
   }

  // GET
   public getAll(): Observable<BaseResponse<RoleDTO[]>> {
     // tslint:disable-next-line: no-unused-expression
     return this.baseService.get<BaseResponse<RoleDTO[]>>('api/Role/GetAll');
   }

   public getById(data: RoleDTO): Observable<BaseResponse<RoleDTO>> {
     return this.baseService.get<BaseResponse<RoleDTO>>('api/Role/GetByRoleId', data);
   }

   // POST
   public create(data: any): Observable<BaseResponse<any>> {
    return this.baseService.post<BaseResponse<any>>('api/Role', data);
   }

   public update(data: RoleDTO): Observable<BaseResponse<any>> {
     return this.baseService.put<BaseResponse<any>>('api/Role', data);
   }

   public delete(data: any): Observable<BaseResponse<any>> {
     return this.baseService.delete<BaseResponse<any>>('api/Role', data);
   }

   public getRolesOfUser(data: any): Observable<BaseResponse<any>> {
     return this.baseService.get<BaseResponse<any>>('api/UserRole/GetRolesOfUser', data);
   }

   public createRoleUser(data: any): Observable<BaseResponse<any>> {
     return this.baseService.post<BaseResponse<any>>('api/UserRole', data);
   }

   public getByRoleName(roleName: any): Observable<BaseResponse<string>> {
    const httpParams = new HttpParams().set('rolename', roleName);
    return this.baseService.get<BaseResponse<string>>('api/Role/GetByRoleName', httpParams);
  }
}
