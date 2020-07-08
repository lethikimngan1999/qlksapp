import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as CONFIG from '../app.config';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient, private message: NzMessageService, private modal: NzModalService) { }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.modal.error({
        nzTitle: 'This is an error message',
        nzContent: error.error.message
      });

      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


  public get<T>(url: string, params?: any): any {
    return this.http.get(CONFIG.API_ENDPOINT + url, { params, headers: this.getHeader() })
      .pipe(
        map(result => result as T),
        catchError(this.handleError)
      );

  }
  /** POST: add a new object to the database */
  public post<T>(url: string, data: any): Observable<T> {
    return this.http.post(CONFIG.API_ENDPOINT + url, data, { headers: this.getHeader() })
      .pipe(
        map(result => result as T),
        catchError(this.handleError));

  }

  public put<T>(url: string, data: any): Observable<T> {
    return this.http.put(CONFIG.API_ENDPOINT + url, data, { headers: this.getHeader() })
      .pipe(
        map(result => result as T),
        catchError(this.handleError));

  }

  public delete<T>(url: string, data: any): Observable<T> {
    return this.http.delete(CONFIG.API_ENDPOINT + url, { headers: this.getHeader(), params: data })
      .pipe(
        map(result => result as T),
        catchError(this.handleError));

  }

  public getDetail<T>(url: string, id: string, nameParam: string): Observable<T> {
    const httpParams = new HttpParams().set(nameParam, id);

    return this.http.get(CONFIG.API_ENDPOINT + url, { headers: this.getHeader(), params: httpParams })
      .pipe(
        map(result => result as T),
        catchError(this.handleError));

  }

  // login
  private getTokenFromLocalStorage() {
    return localStorage.getItem(CONFIG.localStorageKey);
  }

  public setTokenLocalStorageWhenLogout() {
    localStorage.removeItem(CONFIG.localStorageKey);
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  private getHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + this.getTokenFromLocalStorage()
    });
    return headers;

  }
}
