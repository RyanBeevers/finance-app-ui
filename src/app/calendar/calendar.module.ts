import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { ViewCalendarSmallScreenComponent } from './view-calendar-small-screen/view-calendar-small-screen.component';
import { ViewCalendarLargeScreenComponent } from './view-calendar-large-screen/view-calendar-large-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { ReusableModule } from '../reusable/reusable.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WeekStartDateComponent } from './week-start-date/week-start-date.component';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';

const routes: Routes = [
  {
    path: '',
    component: ViewCalendarComponent
  },
  {
    path: 'week-start-date',
    component: WeekStartDateComponent
  }
]

@NgModule({
  declarations: [
    ViewCalendarComponent,
    ViewCalendarSmallScreenComponent,
    ViewCalendarLargeScreenComponent,
    WeekStartDateComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReusableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    CarouselModule,
    CardModule,
    InputSwitchModule
  ],
  providers: [
    BreakpointObserver,
    DatePipe
  ]
})
export class CalendarModule { }
