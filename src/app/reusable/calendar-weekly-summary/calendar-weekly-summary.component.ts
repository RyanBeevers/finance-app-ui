import { Component, Input, OnInit } from '@angular/core';
import { ReusableService } from '../reusable.service';
import { PaycheckResponse } from 'src/app/models/paycheckResponse';
import { ProcessMonthResponse } from 'src/app/models/processMonthResponse';
import { AuthService } from 'src/app/core-components/core-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-weekly-summary',
  templateUrl: './calendar-weekly-summary.component.html',
  styleUrl: './calendar-weekly-summary.component.scss'
})
export class CalendarWeeklySummaryComponent implements OnInit {
  
  @Input('weekOfBills') weekOfBills?: ProcessMonthResponse[] = [];
  @Input('mobile') mobile = false;
  weeklyIncome: number = 0;
  weeklyOutgoing: number = 0;
  weeklyRemainder: number = 0;
  user: any | null = null;

  constructor(private service: ReusableService, private authService: AuthService, private router: Router){
    
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user) {
        this.user = user;
        console.log(this.user.uid);
        if(this.weekOfBills && this.weekOfBills.length > 0)
        this.getDates();
      }else{
        this.router.navigate(['/login'])
      }
    });
  }

  getDates(){
    //dates is the week displayed
    let dates: Date[] = [];
    if(this.weekOfBills && this.weekOfBills.length > 0){
      for(let week of this.weekOfBills){
        const year = week.year;
        let month = week.month;
        if(month === 12){
          month=11;
        }else{
          month--;
        }
        const day = week.day;
        dates.push(new Date(year, month, day));
      }
    }
    // this is to calculate if there are any pay dates 
    // from the start day to one week after this one
    let oneWeekFromHighestDate: Date = new Date();
    if(dates.length === 7){
      oneWeekFromHighestDate = dates[6];
    }
    // Create a new date one week from the highest date date
    oneWeekFromHighestDate.setDate(oneWeekFromHighestDate.getDate() + 7);
    //get income
    // let user = this.user.uid;
    let paychecks: PaycheckResponse[] = [];
    this.service.getPaychecks(this.user.uid).subscribe((response: PaycheckResponse[]) => {
      if(response){
        paychecks = response;
        let paychecksWithPayDates: any[] = [];
        if(paychecks.length>0){
          for(let paycheck of paychecks) {
            const allDates: Date[] = this.getDatesFromPaycheck(paycheck, oneWeekFromHighestDate);
            if(allDates.length>0) {
              let paycheckWithPayDates = { paycheck: paycheck, dates: allDates };
              paychecksWithPayDates.push(paycheckWithPayDates);
            }
          }
          for (const date1 of dates) {
            for(let paycheckWithDate of paychecksWithPayDates){
              //@ts-ignore
              if (Array.isArray(paycheckWithDate.dates) && paycheckWithDate.dates.some(date2 => date2 instanceof Date && date2.getTime() === date1.getTime())) {
                this.weeklyIncome += paycheckWithDate.paycheck.data.amount;
              }
            }
          }
          this.calculateTotals();
        } 
      }
    })
  }

  getDatesFromPaycheck(paycheck: PaycheckResponse, highestDate: Date): Date[]{
    let dates: Date[] = [];
    let startDay: Date = paycheck.data?.payStartDate ? paycheck.data.payStartDate : new Date();
    const frequency = paycheck.data?.frequency==='weekly' ? 7 : 14; 
    if(startDay){
      while(startDay < highestDate){
        let day = new Date(startDay);
        dates.push(day);
        startDay.setDate(startDay.getDate() + frequency);
      }
    }
    return dates;
  }

  calculateTotals(){
    // Initialize a variable to store the total amount
    let totalAmount = 0;
    if(this.weekOfBills){
      // Iterate over each week
      for (const week of this.weekOfBills) {
        // Check if the week has a listOfBills property
        if (week.listOfBills) {
          // Iterate over each bill in the listOfBills
          for (const bill of week.listOfBills) {
            // Add the amount to the total
            //@ts-ignore
            if(bill.data && bill.data['data'] && bill.data['data'].amount) {
              //@ts-ignore
              totalAmount += Number(bill.data['data'].amount);
            }
          }
        }
      }
    }
    // Now totalAmount contains the sum of all amounts
    this.weeklyOutgoing = totalAmount;
    this.weeklyRemainder = (this.weeklyIncome - this.weeklyOutgoing);
    
  }

  getRemainderColor() {
    if (this.weeklyRemainder < 0) {
      return 'red';
    } else if (this.weeklyRemainder >= 0 && this.weeklyRemainder <= 100) {
      return 'orange';
    } else if (this.weeklyRemainder > 100 && this.weeklyRemainder <= 400) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

}
