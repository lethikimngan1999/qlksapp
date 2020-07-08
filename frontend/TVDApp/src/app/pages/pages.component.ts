import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import * as CONFIG from './../app.config';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { BaseComponent } from 'src/app/common_base/base.component';
import { NzModalService } from 'ng-zorro-antd';
import { UserResetPasswordComponent } from './account-management/users/user-reset-password/user-reset-password.component';
import { AuthenticationService } from '../common_base/authentication/authentication.service';
import * as CONSTANT from '../app.constant';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent extends BaseComponent implements OnInit {

  mode = false;
  dark = false;
  menus = [];

  isCollapsed = false;
  pageTitle = CONFIG.SITENAME;
  year: number = new Date().getFullYear();
  pageFooter = CONFIG.SITENAME + ' ©' + this.year;
  // tslint:disable-next-line: new-parens
  public user: UserDTO = new UserDTO;
  currentUser: UserDTO;
  constructor(
    public router: Router,
    public loginService: LoginService,
    public modalService: NzModalService,
    private authenticationService: AuthenticationService) {
    super(router, loginService);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(' this.currentUser ' + this.currentUser.RoleIds);
  }


ngOnInit(): void {
    if (this.currentUser.ListRoles[0].Name === CONSTANT.Role.Admin) {
      this.menus = CONFIG.MENUS_SIDEBAR;
      console.log("isAdmin" + this.authenticationService.isAdmin);
    } else
    if (this.currentUser.ListRoles[0].Name === CONSTANT.Role.Receptionists) {
      this.menus = CONFIG.MENUS_RECEPTION_SIDEBAR;
      console.log("isReceptionists");
    } else
    if (this.currentUser.ListRoles[0].Name === CONSTANT.Role.HRManager) {
      this.menus = CONFIG.MENUS_HRMANAGER_SIDEBAR;
      console.log("isHRManager");
    } else
    if (this.currentUser.ListRoles[0].Name === CONSTANT.Role.BusinessManager) {
      this.menus = CONFIG.MENUS_BUSSINESSMANAGER_SIDEBAR;
      console.log("isBusinessManager");
    }
    else
    if (this.currentUser.ListRoles[0].Name === CONSTANT.Role.Accountants) {
      this.menus = CONFIG.MENUS_ACCOUNTANTS_SIDEBAR;
      // console.log("isBusinessManager");
    }
    // this.getUser();
  }

  // private getUser() {
  //   this.loginService.getUser().subscribe(response => {
  //     if (response.Status === false) {
  //       return;
  //     }
  //     if (response && response.Data) {
  //       this.user = response.Data;
  //     }
  //   }
  //   );
  // }

  logout() {
    this.setTokenFromLocalStorage('');
    const token = this.getTokenFromLocalStorage();
    if (token === '' || token) {
      this.router.navigateByUrl('/login');
    }
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  showModalChangePassword(data: any) {
    const modalChangePassword = this.modalService.create({
      nzTitle: 'Đổi mật khẩu cho tài khoản ' + data.UserName,
      nzContent: UserResetPasswordComponent,
      nzComponentParams: {
        userDto: JSON.parse(JSON.stringify(data))
      },
      nzWidth: '480',
    });
    modalChangePassword.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }

}
