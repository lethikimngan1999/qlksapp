import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponseBase,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { mergeMap, catchError } from 'rxjs/operators';


const CODEMESSAGE = {
  200: 'Máy chủ trả về thành công dữ liệu được yêu cầu.',
  201: 'Dữ liệu mới hoặc sửa đổi là thành công.',
  202: 'Một yêu cầu đã vào hàng đợi nền (tác vụ không đồng bộ).',
  204: 'Xóa dữ liệu thành công.',
  400: 'Yêu cầu được gửi có lỗi và máy chủ không thực hiện các thao tác để  tạo hoặc sửa đổi dữ liệu.',
  401: 'Người dùng không có quyền (mã thông báo, tên người dùng, lỗi mật khẩu.',
  403: 'Người dùng được ủy quyền, nhưng truy cập bị cấm.',
  404: 'Yêu cầu được gửi là cho một bản ghi không tồn tại và máy chủ không hoạt động.',
  406: 'Định dạng của yêu cầu không có sẵn.',
  410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn nữa.',
  422: 'Xảy ra lỗi xác nhận khi tạo một đối tượng.',
  500: 'Máy chủ có lỗi. Vui lòng kiểm tra máy chủ.',
  502: 'Lỗi cổng.',
  503: 'Dịch vụ không khả dụng, máy chủ tạm thời bị quá tải hoặc bảo trì.',
  504: 'Cổng đã hết thời gian.',
}

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, public router: Router) { }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }
    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    if (ev.status === 403) {
      this.notification.error(`Không có quyền truy cập ${ev.status}: ${ev.url}`, errortext);
    } else {
      this.notification.error(`ERR_CONNECTION_REFUSED! Kiểm tra lại server API do lỗi yêu cầu ${ev.status}: ${ev.url}`, errortext);
    }
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    this.checkStatus(ev);
    switch (ev.status) {
      case 200:
        break;
      case 401:
        this.notification.error(`Chưa đăng nhập hoặc đăng nhập đã hết hạn, vui lòng đăng nhập lại.`, ``);
        localStorage.clear();
        this.goTo('/login');
        break;
      case 403:
      case 404:
      case 500:
        this.goTo(`home/exception/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;
    const newReq = request.clone({ url });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponseBase) { return this.handleData(event); }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }
}
