import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exception403Component } from './403.component';
import { Exception404Component } from './404.component';
import { Exception500Component } from './500.component';
import { ExceptionRoutingModule } from './exception-routing.module';
import { SharedModule } from '../shared/shared-module';

const COMPONENT = [Exception403Component, Exception404Component, Exception500Component];


@NgModule({
  declarations: [...COMPONENT],
  imports: [SharedModule, ExceptionRoutingModule],
  entryComponents:[],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ExceptionModule { }
