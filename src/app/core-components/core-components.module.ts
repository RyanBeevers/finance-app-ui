import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ManageBillsComponent } from './manage-bills/manage-bills.component';
import { ViewCalednarComponent } from './view-calendar/view-calednar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ManageIncomeComponent } from './manage-income/manage-income.component';
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
import { ExcelGeneratorComponent } from './excel-generator/excel-generator.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { ReusableModule } from '../reusable/reusable.module';
import { ViewCalendarSmallScreenComponent } from './view-calendar-small-screen/view-calendar-small-screen.component';
import { ViewCalendarLargeScreenComponent } from './view-calendar-large-screen/view-calendar-large-screen.component';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { CarouselModule } from 'primeng/carousel'
@NgModule({
  declarations: [
    ManageBillsComponent,
    NavbarComponent,
    ViewCalednarComponent,
    HomeComponent,
    BillDetailsComponent,
    ExcelGeneratorComponent,
    ManageIncomeComponent,
    ViewCalendarSmallScreenComponent,
    ViewCalendarLargeScreenComponent
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
    TooltipModule,
    InputSwitchModule,
    CardModule,
    ReusableModule,
    LayoutModule,
    CalendarModule,
    CarouselModule
  ],
  exports: [
    NavbarComponent,
    BillDetailsComponent
  ],
  providers: [
    BreakpointObserver,
    DatePipe
  ]
})
export class CoreComponentsModule { }
