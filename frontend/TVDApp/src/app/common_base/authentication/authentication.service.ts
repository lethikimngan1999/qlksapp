import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/UserDTO';
import { HttpClient } from '@angular/common/http';
import * as CONFIG from '../../app.config';
import * as CONSTANT from '../../app.constant';
import { LoginService } from 'src/app/shared/services/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserDTO>;
  public currentUser: Observable<UserDTO>;

  constructor(private http: HttpClient, private loginService: LoginService, ) {
    this.currentUserSubject = new BehaviorSubject<UserDTO>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): UserDTO {
    return this.currentUserSubject.value;
  }

  public getTokenFromLocalStorage() {
    return localStorage.getItem(CONFIG.localStorageKey);
  }

  public setTokenFromLocalStorage(value: string) {
    localStorage.setItem(CONFIG.localStorageKey, value);
  }

  public login(loginDto) {
    this.loginService.getToken(loginDto).subscribe(response => {
      if (response && response.Data && response.Data !== 'null') {
        this.setTokenFromLocalStorage(response.Data);
        this.getUser();
      }
    });
    return this.currentUser;
  }

  private getUser() {
    this.loginService.getUser().subscribe(response => {
      if (response.Status === false) {
        return;
      }
      if (response && response.Data) {
        localStorage.setItem('currentUser', JSON.stringify(response.Data));
        this.currentUserSubject.next(response.Data);
      }
    });
  }

  public logout() {
    // remove user from local storage to log user out
    this.setTokenFromLocalStorage('');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAdmin() {
    let result = false;
  //  if (this.currentUserValue.Status === 'Active') {
    // tslint:disable-next-line: only-arrow-functions
    this.currentUserValue.ListRoles.forEach(function(value) {
      // tslint:disable-next-line: triple-equals
      if (value.Name == CONSTANT.Role.Admin) {
        result = true;
      }
    });

    return result;
  }

  isHRManager() {
    let result = false;
    // if (this.currentUserValue.Status === 'Active') {
    // tslint:disable-next-line: only-arrow-functions
    this.currentUserValue.ListRoles.forEach(function(value) {
      // tslint:disable-next-line: triple-equals
      if (value.Name == CONSTANT.Role.HRManager) {
        result = true;
      }
    });
    return result;
  }

  isReceptionists() {
    let result = false;
    // tslint:disable-next-line: only-arrow-functions
    this.currentUserValue.ListRoles.forEach(function(value) {
      // tslint:disable-next-line: triple-equals
      if (value.Name == CONSTANT.Role.Receptionists) {
        result = true;
      }
    });
    return result;
  }

  isBusinessManager() {
    let result = false;
    // tslint:disable-next-line: only-arrow-functions
    this.currentUserValue.ListRoles.forEach(function(value) {
      // tslint:disable-next-line: triple-equals
      if (value.Name == CONSTANT.Role.BusinessManager) {
        result = true;
      }
    });
    return result;
  }
}
