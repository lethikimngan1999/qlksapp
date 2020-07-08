import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models';
import { CustomerDTO } from 'src/app/models/CustomerDTO';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from 'src/app/common_base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  public getAll(): Observable<BaseResponse<CustomerDTO>> {
    return this.baseService.get<BaseResponse<CustomerDTO[]>>('api/Customer/GetAll');
}

public getByIdentityCardNumber(identityCardNumber: any): Observable<BaseResponse<string>> {
    const httpParams = new HttpParams().set('identityCardNumber', identityCardNumber);
    return this.baseService.get<BaseResponse<string>>('api/Customer/GetByIdentityCardNumber', httpParams);
  }

public create(data: CustomerDTO): Observable<BaseResponse<string>> {
    return this.baseService.post<BaseResponse<string>>('api/Customer', data);
}

public update(data: CustomerDTO): Observable<BaseResponse<string>> {
    return this.baseService.put<BaseResponse<string>>('api/Customer', data);
}

public getDetail(customerId: string): Observable<BaseResponse<string>> {

    const httpParams = new HttpParams().set('customerId', customerId);
    return this.baseService.get<BaseResponse<string>>('api/Customer/GetById', httpParams);
}

public delete(data: any): Observable<BaseResponse<any>> {
    return this.baseService.delete<BaseResponse<any>>('api/Customer', data);
}

}
