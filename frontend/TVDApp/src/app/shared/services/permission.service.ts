import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common_base/base.service';
import { Observable } from 'rxjs';
import { RolePermissionDTO } from 'src/app/models/RolePermissionDTO';
import { BaseResponse } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  constructor(private baseService: BaseService) { }

  public getAll(): Observable<BaseResponse<RolePermissionDTO[]>> {
    return this.baseService.get<BaseResponse<RolePermissionDTO[]>>('api/Permissions/GetAll');
}

public insertPermission(data: RolePermissionDTO[]): Observable<BaseResponse<any>> {
  return this.baseService.post<BaseResponse<boolean>>('api/Permissions/AddList', data);
}
public updatePermission(data: RolePermissionDTO): Observable<BaseResponse<any>> {
  return this.baseService.put<BaseResponse<boolean>>('api/Permissions', data);
}
public deletePermission(data: any): Observable<BaseResponse<any>> {
  return this.baseService.delete<BaseResponse<boolean>>('api/Permissions', data);
}
}
