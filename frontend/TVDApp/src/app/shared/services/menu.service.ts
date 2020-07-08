import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common_base/base.service';
import { BaseResponse } from 'src/app/models';
import { MenuDTO } from 'src/app/models/MenuDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private baseService: BaseService) { }

public getAll(): Observable<BaseResponse<MenuDTO[]>> {
  return this.baseService.get<BaseResponse<MenuDTO[]>>('api/Menus/GetAll');
}

public getById(data: MenuDTO): Observable<BaseResponse<MenuDTO>> {
  return this.baseService.get<BaseResponse<MenuDTO>>('api/Menus/GetById', data);
}

public create(data: MenuDTO): Observable<BaseResponse<any>> {
  return this.baseService.post<BaseResponse<any>>('api/Menus/Create', data);
}
public update(data: MenuDTO): Observable<BaseResponse<any>> {
  return this.baseService.put<BaseResponse<any>>('api/Menus/Update', data);
}
public delete(data: any): Observable<BaseResponse<any>> {
  return this.baseService.delete<BaseResponse<any>>('api/Menus/Delete', data);
}
}
