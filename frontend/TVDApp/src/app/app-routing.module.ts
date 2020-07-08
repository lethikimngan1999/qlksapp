import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';


const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        // loadChildren: './dashboard/dashboard.module#DashboardModule',
        loadChildren: () => PagesModule,
        data: {
          breadcrumb: 'Home'
        },
      }
    ]
  },
{path: '', component: LoginComponent},
{path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
