import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBillsComponent } from './core-components/manage-bills/manage-bills.component';
import { ViewCalednarComponent } from './core-components/view-calendar/view-calednar.component';
import { HomeComponent } from './core-components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'manage-bills',
    component: ManageBillsComponent
  },
  {
    path: 'view-calendar',
    component: ViewCalednarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
