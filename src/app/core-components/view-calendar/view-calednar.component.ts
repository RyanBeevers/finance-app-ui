import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GeneratedMonths } from 'src/app/models/generatedMonths';
import { CalendarService } from '../calendar.service';
import { Bill } from 'src/app/models/bill';
import { AllBillsResponse } from '../manage-bills/manage-bills.component';
import { ReusableService } from 'src/app/reusable/reusable.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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