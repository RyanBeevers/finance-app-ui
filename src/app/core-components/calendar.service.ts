import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  
  calendar: number[][] = [];

  constructor() {}


  generateMonthArray(year: number, month: number, startDayOfWeek: string): number[][] {
    let response: number[][] = [];
    const firstDay = new Date(year, month - 1, 1).getDate();
    const lastDay = new Date(year, month, 0).getDate();
    const firstDateOfMonth = new Date(year, month - 1, 1);
    const firstDayOfMonth = firstDateOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const offset = this.getOffset(this.getDayNumber(startDayOfWeek), firstDayOfMonth);
    console.log(startDayOfWeek);
    console.log(offset);
    const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
    let tempOffset = offset;
    let day = 1;
    //set current month
    while(day<lastDay){
      let week = [];
      
      for(let i=0; i<7; i++){
        if(tempOffset > 0){
          week.push(null);
          tempOffset--;
        }else{
          if(day <= lastDay){
            week.push(day);
            day++;
          } else {
            week.push(null);
          }
        }
      }
      //@ts-ignore
      response.push(week);
    }
    //set next month
    let nextMonthDay = 1;
    for(let i=0; i<response[response.length-1].length; i++){
      if(!response[response.length-1][i]){
        response[response.length-1][i] = nextMonthDay;
        nextMonthDay++;
      }
    }

    //set previous month
    let lastDayOfLastMonthVar = lastDayOfLastMonth;
    for(let i=6; i>-1; i--){
      if(!response[0][i]){
        response[0][i]=lastDayOfLastMonthVar;
        lastDayOfLastMonthVar--;
      }
    }
    console.log(response);
    return response;
  }

  private getOffset(startDayOfWeek: number, firstDayOfTheWeek: number): number {
    switch(startDayOfWeek){
      //SUNDAY
      case 0: {
        switch(firstDayOfTheWeek){
          //sun
          case 0:
            return 0;
          //mon
          case 1:
            return 1;
          //tues
          case 2:
            return 2;
          //weds
          case 3:
            return 3;
          //thur
          case 4: 
            return 4;
          //fri
          case 5: 
            return 5;
          case 6:
            return 6;
        }
        break;
      }
      //MONDAY
      case 1: {
        switch(firstDayOfTheWeek){
          //sun
          case 0:
            return 6;
          //mon
          case 1:
            return 0;
          //tues
          case 2:
            return 1;
          //weds
          case 3:
            return 2;
          //thur
          case 4: 
            return 3;
          //fri
          case 5: 
            return 4;
          case 6:
            return 5;
        }
        break;
      }
      //TUESDAY
      case 2: {
        switch(firstDayOfTheWeek){
          //sun
          case 0:
            return 5;
          //mon
          case 1:
            return 6;
          //tues
          case 2:
            return 0;
          //weds
          case 3:
            return 1;
          //thur
          case 4: 
            return 2;
          //fri
          case 5: 
            return 3;
          case 6:
            return 4;
        }
        break;
      }
      //WEDNESDAY
      case 3: {
        switch(firstDayOfTheWeek){
          //sun
          case 0:
            return 4;
          //mon
          case 1:
            return 5;
          //tues
          case 2:
            return 6;
          //weds
          case 3:
            return 0;
          //thur
          case 4: 
            return 1;
          //fri
          case 5: 
            return 2;
          case 6:
            return 3;
        }
        break;
      }
      //THURSDAY
      case 4: {
        switch(firstDayOfTheWeek){
          //sun
          case 0:
            return 3;
          //mon
          case 1:
            return 4;
          //tues
          case 2:
            return 5;
          //weds
          case 3:
            return 6;
          //thur
          case 4: 
            return 0;
          //fri
          case 5: 
            return 1;
          case 6:
            return 2;
        }
        break;
      }
      //FRIDAY
      case 5: {
        switch(firstDayOfTheWeek){
          //sun
          case 0:
            return 2;
          //mon
          case 1:
            return 3;
          //tues
          case 2:
            return 4;
          //weds
          case 3:
            return 5;
          //thur
          case 4: 
            return 6;
          //fri
          case 5: 
            return 0;
          case 6:
            return 1;
        }
        break;
      }
      //SATURDAY
      case 6: {
        switch(firstDayOfTheWeek){
          //sun
          case 0:
            return 1;
          //mon
          case 1:
            return 2;
          //tues
          case 2:
            return 3;
          //weds
          case 3:
            return 4;
          //thur
          case 4: 
            return 5;
          //fri
          case 5: 
            return 6;
          case 6:
            return 0;
        }
        break;
      }
    }
    return 0;
  }
  
  private getDayName(dayIndex: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  }

  private getDayNumber(dayString: string): number {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days.indexOf(dayString);
  }

}
