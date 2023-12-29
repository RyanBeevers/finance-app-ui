import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageBillsComponent } from './core-components/manage-bills/manage-bills.component';
import { ViewCalednarComponent } from './core-components/view-calednar/view-calednar.component';

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
