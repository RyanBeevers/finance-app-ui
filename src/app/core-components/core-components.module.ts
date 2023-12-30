import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBillsComponent } from './manage-bills/manage-bills.component';
import { ViewCalednarComponent } from './view-calendar/view-calednar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ManageBillsComponent,
    NavbarComponent,
    ViewCalednarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreComponentsModule { }
