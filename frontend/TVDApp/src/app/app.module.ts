import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US, vi_VN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, DatePipe } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { PagesModule } from './pages/pages.module';

import { EmployeePositionService } from './shared/services/employee-position.service';
import { EmployeeService } from './shared/services/employee.service';
import { UITableComponent } from './shared/ui-table/ui-table.component';
import { TemplateExceptionComponent } from './shared/template-exception/template-exception.component';
import { DefaultInterceptor } from './common_base/default.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { ExceptionModule } from './exception/exception.module';
import { UsersService } from './shared/services/users.service';
import { RoleService } from './shared/services/role.service';
import { PermissionService } from './shared/services/permission.service';
import { MenuService } from './shared/services/menu.service';

const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }

];

registerLocaleData(vi);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IconsProviderModule,
    NgZorroAntdModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    PagesModule,
    ExceptionModule

  ],
  providers: [
    ...INTERCEPTOR_PROVIDES,
    { provide: NZ_I18N, useValue: vi_VN },
    EmployeeService,
    EmployeePositionService,
    UsersService,
    RoleService,
    PermissionService,
    MenuService,
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
