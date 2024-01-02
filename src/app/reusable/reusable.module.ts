import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEntryComponent } from './calendar-entry/calendar-entry.component';
import { CardModule } from 'primeng/card';
import { CalendarWeeklySummaryComponent } from './calendar-weekly-summary/calendar-weekly-summary.component';



@NgModule({
  declarations: [
    CalendarEntryComponent,
    CalendarWeeklySummaryComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [
    CalendarEntryComponent,
    CalendarWeeklySummaryComponent
  ]
})
export class ReusableModule { }
