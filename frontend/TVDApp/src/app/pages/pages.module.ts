import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { EmployeeDetailComponent } from './employee-management/employee-detail/employee-detail.component';
import { EmployeeDialogComponent } from './employee-management/employee-dialog/employee-dialog.component';
import { EmployeeListComponent } from './employee-management/employee-list/employee-list.component';
// tslint:disable-next-line: max-line-length
import { EmployeepositionListComponent } from './category-management/employee-position/employeeposition-list/employeeposition-list.component';
// tslint:disable-next-line: max-line-length
import { EmployeepositionDialogComponent } from './category-management/employee-position/employeeposition-dialog/employeeposition-dialog.component';
import { UserListComponent } from './account-management/users/user-list/user-list.component';
import { UserDialogComponent } from './account-management/users/user-dialog/user-dialog.component';
import { UserRoleDialogComponent } from './account-management/users/user-role-dialog/user-role-dialog.component';
import { UserResetPasswordComponent } from './account-management/users/user-reset-password/user-reset-password.component';
import { RolesListComponent } from './account-management/roles/roles-list/roles-list.component';
import { RolesDialogComponent } from './account-management/roles/roles-dialog/roles-dialog.component';
import { CustomerListComponent } from './booking-management/customer-management/customer-list/customer-list.component';
import { CustomerDialogComponent } from './booking-management/customer-management/customer-dialog/customer-dialog.component';
import { CustomerDetailComponent } from './booking-management/customer-management/customer-detail/customer-detail.component';
import { MenuListComponent } from './account-management/menus/menu-list/menu-list.component';
import { MenuDialogComponent } from './account-management/menus/menu-dialog/menu-dialog.component';
import { PermissionsListComponent } from './account-management/permissions/permissions-list/permissions-list.component';
import { PermissionsDialogComponent } from './account-management/permissions/permissions-dialog/permissions-dialog.component';
import { ApiListComponent } from './account-management/api-management/api-list/api-list.component';
import { ApiDialogComponent } from './account-management/api-management/api-dialog/api-dialog.component';

import { HotelServiceListComponent } from './category-management/hotel-services/hotel-service-list/hotel-service-list.component';
import { HotelServiceDialogComponent } from './category-management/hotel-services/hotel-service-dialog/hotel-service-dialog.component';
import { RoomTypeListComponent } from './category-management/room-type/room-type-list/room-type-list.component';
import { RoomListComponent } from './booking-management/room-management/room-list/room-list.component';
import { RoomStatusComponent } from './booking-management/room-management/room-status/room-status.component';






@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    PagesComponent,
    RoomStatusComponent,
   EmployeepositionDialogComponent,
    EmployeeDetailComponent,
    EmployeeDialogComponent,
    EmployeeListComponent,
    EmployeepositionListComponent,
    UserListComponent,
    UserDialogComponent,
    UserRoleDialogComponent,
    UserResetPasswordComponent,
    RolesListComponent,
    RolesDialogComponent,
    CustomerListComponent,
    CustomerDialogComponent,
    CustomerDetailComponent,
    MenuListComponent,
    MenuDialogComponent,
    PermissionsListComponent,
    PermissionsDialogComponent,
    ApiListComponent,
    ApiDialogComponent,
    HotelServiceListComponent,
    HotelServiceDialogComponent,
    RoomTypeListComponent,
    RoomListComponent,
    RoomStatusComponent,
    ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NzPageHeaderModule,
    NzDatePickerModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
