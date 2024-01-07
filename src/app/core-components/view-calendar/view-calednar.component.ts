import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/bill';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PaycheckResponse } from '../manage-income/manage-income.component';

@Component({
  selector: 'app-view-calednar',
  templateUrl: './view-calednar.component.html',
  styleUrl: './view-calednar.component.scss'
})
export class ViewCalednarComponent implements OnInit {

  isLargeScreen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      this.isLargeScreen = result.matches;
    });
    setTimeout(()=>{
      window.scrollTo(0,0);
    })
  }

}


export interface CalendarEntry {
  month?: number;
  year?: number;
  date?: number;
  locked?: boolean;
  bill?: Bill;
  user?: string;
  paid?: boolean;
  amount?: number;
}

export interface GeneratedBillsResponse {
  id?: string;
  data?: CalendarEntry;
}

export interface DayWithBills {
  date: number;
  bills: Bill[];
}

export interface MonthWithDaysWithBills {
  data: DayWithBills[][]
}

export interface ProcessMonthResponse {
  day: number,
  month: number,
  year: number,
  income?: PaycheckResponse[] | undefined;
  listOfBills?: StoreResponse[];
}


export interface DropdownValue {
  label: string,
  value: any
}

export interface StoreResponse {
  id?: string;
  data?: any[];
}

export interface StartDay {
  dayOfTheWeek: string;
  user: string;
}