import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEntryComponent } from './calendar-entry/calendar-entry.component';
import { CardModule } from 'primeng/card';
import { CalendarWeeklySummaryComponent } from './calendar-weekly-summary/calendar-weekly-summary.component';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    TooltipModule,
    ToastModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CalendarEntryComponent,
    CalendarWeeklySummaryComponent
  ],
  providers: [
    MessageService
  ]
})
export class ReusableModule { }
