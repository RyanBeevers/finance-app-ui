import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-weekly-summary',
  templateUrl: './calendar-weekly-summary.component.html',
  styleUrl: './calendar-weekly-summary.component.scss'
})
export class CalendarWeeklySummaryComponent implements OnInit {
  
  @Input('weekOfBills') weekOfBills: any[] | undefined;
  @Input('mobile') mobile = false;
  weeklyIncome: number = 2000;
  weeklyOutgoing: number = 0;
  weeklyRemainder: number = 0;

  constructor(){

  }

  ngOnInit(): void {
    if(this.weekOfBills && this.weekOfBills.length > 0)
      this.calculateTotals();
  }

  calculateTotals(){
    // Initialize a variable to store the total amount
    let totalAmount = 0;
    if(this.weekOfBills){
      // Iterate over each week
      for (const week of this.weekOfBills) {
        // Check if the week has a listOfBills property
        if (week.listOfBills) {
          console.log(week);
          // Iterate over each bill in the listOfBills
          for (const bill of week.listOfBills) {
            // Add the amount to the total
            totalAmount += Number(bill.data.data.amount);
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
