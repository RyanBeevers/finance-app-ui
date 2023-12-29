import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBillsComponent } from './manage-bills/manage-bills.component';
import { ViewCalednarComponent } from './view-calednar/view-calednar.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    ManageBillsComponent,
    NavbarComponent,
    ViewCalednarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreComponentsModule { }
