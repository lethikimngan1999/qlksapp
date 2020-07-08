import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/common_base/base.service';
import { BaseResponse } from 'src/app/models';
import { RoomDTO } from 'src/app/models/roomDTO';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private baseSevice: BaseService) { }

  public getAll(): Observable<BaseResponse<RoomDTO>> {
      return this.baseSevice.get<BaseResponse<RoomDTO[]>>('api/Room/GetAll');
  }

}
