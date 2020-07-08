import { Injectable } from '@angular/core';
import { RoomTypeDTO } from 'src/app/models/RoomTypeDTO';
import { BaseResponse } from 'src/app/models';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/common_base/base.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  constructor(private http: HttpClient, private baseSevice: BaseService) { }
    public getAll(): Observable<BaseResponse<RoomTypeDTO>> {
      return this.baseSevice.get<BaseResponse<RoomTypeDTO[]>>('api/RoomType/GetAll');
  }
}
