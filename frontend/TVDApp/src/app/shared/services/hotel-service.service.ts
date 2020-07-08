import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models';
import { HotelServiceDTO } from 'src/app/models/HotelServiceDTO';
import { BaseService } from 'src/app/common_base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  public getAll(): Observable<BaseResponse<HotelServiceDTO>> {
    return this.baseService.get<BaseResponse<HotelServiceDTO[]>>('api/HotelServices/GetAll');
  }
  public create(data: HotelServiceDTO): Observable<BaseResponse<string>> {
    return this.baseService.post<BaseResponse<string>>('api/HotelServices', data);
  }
  public update(data: HotelServiceDTO): Observable<BaseResponse<string>> {
    return this.baseService.put<BaseResponse<string>>('api/HotelServices', data);
  }
  public delete(data: any): Observable<BaseResponse<any>> {
    return this.baseService.delete<BaseResponse<any>>('api/HotelServices', data);
  }
}
