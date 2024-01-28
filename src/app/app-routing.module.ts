import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core-components/home/home.component';
import { LoginComponent } from './core-components/login/login.component';
import { RegisterAccountComponent } from './core-components/register-account/register-account.component';
import { LogoutComponent } from './core-components/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core-components/core-components.module').then((m) => m.CoreComponentsModule),
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'view-calendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: 'manage-bills',
    loadChildren: () =>
      import('./bills/bills.module').then((m) => m.BillsModule),
  },
  {
    path: 'manage-income',
    loadChildren: () =>
      import('./income/income.module').then((m) => m.IncomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
