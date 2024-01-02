import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-entry',
  templateUrl: './calendar-entry.component.html',
  styleUrl: './calendar-entry.component.scss'
})
export class CalendarEntryComponent {
// @ts-ignore
  @Input('day') day: number;

}
