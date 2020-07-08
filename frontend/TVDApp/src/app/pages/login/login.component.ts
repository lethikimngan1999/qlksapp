import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/models/LoginDTO';
import * as CONFIG from './../../app.config';
import { AuthenticationService } from 'src/app/common_base/authentication/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageTitle = CONFIG.SITENAME;
  year: number = new Date().getFullYear();
  pageFooter = CONFIG.SITENAME + ' ©' + this.year;
  validateForm: FormGroup;
   isShowMessage = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthenticationService
  ) {  document.body.className = 'login-body'; }

  ngOnInit(): void {
    this.initFormValidate();
    if (this.isLogin()) {
      this.router.navigateByUrl('/home');
    }
  }

  private initFormValidate(): void {
    this.validateForm = this.fb.group({
      _ipText_username: [null, [Validators.required]],
      _ipText_password: [null, [Validators.required]]
    });
  }

  public getTokenFromLocalStorage() {
    return localStorage.getItem(CONFIG.localStorageKey);
  }

  public setTokenFromLocalStorage(value: string) {
    localStorage.setItem(CONFIG.localStorageKey, value);
  }

  public isLogin(): boolean {
    const tokenData = this.getTokenFromLocalStorage();
    if (tokenData && tokenData !== 'null') {
      return true;
    }
    return false;
  }

  private login() {
    const loginDto: LoginDTO = {
      username: this.validateForm.controls._ipText_username.value,
      password: this.validateForm.controls._ipText_password.value
    };

    this.authService.login(loginDto)
    .pipe()
    .subscribe(
      data => {
        this.router.navigateByUrl('home');
      },
      error => {
        this.isShowMessage = true;
      });
    // this.loginService.getToken(loginDto).subscribe(response => {
    //   if (response.Status === true && response.Data == null) {
    //     this.isShowMessage = true;
    //   }
    //   if (response && response.Data && response.Data !== 'null') {
    //     this.setTokenFromLocalStorage(response.Data);
    //     this.router.navigateByUrl('/home');
    //   }
    // });

  }

  submitForm(): void {
    this.isShowMessage = false;
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls)  {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // check valid
    if (this.validateForm.status === 'INVALID') {
      return;
    }
    this.login();
  }
}
