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
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    ManageBillsComponent,
    NavbarComponent,
    ViewCalednarComponent,
    HomeComponent,
    BillDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
    TooltipModule
  ],
  exports: [
    NavbarComponent,
    BillDetailsComponent
  ]
})
export class CoreComponentsModule { }
