import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { TinhtrangListComponent } from './qldatphong/tinhtrang-list/tinhtrang-list.component';



import { EmployeeListComponent } from './employee-management/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-management/employee-detail/employee-detail.component';
// tslint:disable-next-line: max-line-length
import { EmployeepositionListComponent } from './category-management/employee-position/employeeposition-list/employeeposition-list.component';
import { UserListComponent } from './account-management/users/user-list/user-list.component';
import { RolesListComponent } from './account-management/roles/roles-list/roles-list.component';
import { CustomerListComponent } from './booking-management/customer-management/customer-list/customer-list.component';
import { MenuListComponent } from './account-management/menus/menu-list/menu-list.component';
import { PermissionsListComponent } from './account-management/permissions/permissions-list/permissions-list.component';
import { ApiListComponent } from './account-management/api-management/api-list/api-list.component';
import { ExceptionModule } from '../exception/exception.module';
import { SharedModule } from '../shared/shared-module';
import { HotelServiceListComponent } from './category-management/hotel-services/hotel-service-list/hotel-service-list.component';
import { RoomTypeListComponent } from './category-management/room-type/room-type-list/room-type-list.component';
import { RoomListComponent } from './booking-management/room-management/room-list/room-list.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'employee-management',
        component: EmployeeListComponent
      },
      {
        path: 'employee-management/detail',
        component: EmployeeDetailComponent
      },
      {
        path: 'employee-position-management',
        component: EmployeepositionListComponent
      },
      {
        path: 'users-management',
        component: UserListComponent
      },
      {
        path: 'roles-management',
        component: RolesListComponent
      },
      {
        path: 'menus-management',
        component: MenuListComponent
      },
      {
        path: 'permissions-management',
        component: PermissionsListComponent
      },
      {
        path: 'api-management',
        component: ApiListComponent
      },
      {
        path: 'customer-management',
        component: CustomerListComponent
      },
      {
        path: 'hotelServices-management',
        component: HotelServiceListComponent
      },
      {
        path: 'roomType-management',
        component: RoomTypeListComponent
      },
      {
        path: 'room-management',
        component: RoomListComponent
      },
      // {
      //   path: 'qlkhachhang',
      //   component: KhachhangListComponent
      // },
      // {
      //   path: 'qlkhachhang/chitiet',
      //   component: KhachhangChitietComponent
      // },
       {
        path: 'qldatphong',
        component: TinhtrangListComponent
      },
      {
        path: 'exception', loadChildren: () => ExceptionModule,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [RouterModule],
  declarations: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesRoutingModule { }
