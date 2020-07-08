import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UITableComponent } from './ui-table/ui-table.component';
import { TemplateExceptionComponent } from './template-exception/template-exception.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [];
@NgModule({
 
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ UITableComponent,
    TemplateExceptionComponent],
  exports: [
    UITableComponent,
    TemplateExceptionComponent
  ],
  providers: []
})
export class SharedModule { }
