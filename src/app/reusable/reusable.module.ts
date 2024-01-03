import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEntryComponent } from './calendar-entry/calendar-entry.component';
import { CardModule } from 'primeng/card';
import { CalendarWeeklySummaryComponent } from './calendar-weekly-summary/calendar-weekly-summary.component';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    CalendarEntryComponent,
    CalendarWeeklySummaryComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    OverlayPanelModule,
    TooltipModule
  ],
  exports: [
    CalendarEntryComponent,
    CalendarWeeklySummaryComponent
  ]
})
export class ReusableModule { }
