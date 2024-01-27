import { Component } from '@angular/core';
import { CalendarEntry, DropdownValue, GeneratedBillsResponse, ProcessMonthResponse, StartDay, StoreResponse } from '../view-calendar/view-calednar.component';
import { GeneratedMonths } from 'src/app/models/generatedMonths';
import { AllBillsResponse } from '../manage-bills/manage-bills.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CalendarService } from '../calendar.service';
import { ReusableService } from 'src/app/reusable/reusable.service';
import { Bill } from 'src/app/models/bill';
import { Paycheck, PaycheckResponse } from '../manage-income/manage-income.component';

@Component({
  selector: 'app-view-calendar-large-screen',
  templateUrl: './view-calendar-large-screen.component.html',
  styleUrl: './view-calendar-large-screen.component.scss'
})
export class ViewCalendarLargeScreenComponent {

  
  loading = true;
  items = [1, 2, 3, 4, 5, 6, 7, 8];
  months: DropdownValue[];
  years: DropdownValue[];
  selectedMonth: any;
  selectedYear: any;
  startingDayOfTheWeek: any;
  locked: boolean = false;
  storeResponse: StoreResponse[] = [];
  generatedMonths: GeneratedMonths[] = [];
  selectedMonthData: GeneratedMonths = {};
  month: number[][] = [];
  bills: CalendarEntry[] = [];
  listOfBills: AllBillsResponse[] = [];
  dataSource: any;
  generatedBills: GeneratedBillsResponse[] = [];
  billsByDate: any[] = [];
  billsArrayForMonth: any;
  regenerating = false;
  regeneratingMessage: any;
  showConfirmRegenerate = false;
  billsArrayMonth: ProcessMonthResponse[][] = [];

  //adding an exception
  addException = false;
  addingException = false;
  exceptionDate: Date = new Date();
  exceptionHours: number = 0;
  exceptionReason: string = '';
  exceptionRequest: any;
  exceptionError: any;
  
  constructor(
    private store: AngularFirestore, 
    private calendarService: CalendarService,
    private reusableService: ReusableService) {
    this.months = [
      { label: 'January', value: 1 },
      { label: 'February', value: 2 },
      { label: 'March', value: 3 },
      { label: 'April', value: 4 },
      { label: 'May', value: 5 },
      { label: 'June', value: 6 },
      { label: 'July', value: 7 },
      { label: 'Auguest', value: 8 },
      { label: 'September', value: 9 },
      { label: 'October', value: 10 },
      { label: 'November', value: 11 },
      { label: 'December', value: 12 }
    ];
    this.years = [
      { label: '2021', value: 2021 },
      { label: '2022', value: 2022 },
      { label: '2023', value: 2023 },
      { label: '2024', value: 2024 },
      { label: '2025', value: 2025 },
      { label: '2026', value: 2026 },
      { label: '2027', value: 2027 },
      { label: '2028', value: 2028 },
      { label: '2029', value: 2029 },
      { label: '2030', value: 2030 }
    ]
  }

  ngOnInit(): void {
    const date = new Date();
    this.selectedMonth = this.months.find(month => month.value === date.getMonth() + 1)?.value;
    this.selectedYear = this.years.find(year => year.value === date.getFullYear())?.value;
    this.doesCalendarAlreadyExist();
    // this.getStartDayOfWeek();
    // this.getMonthsBills();
  }

  // Has this month been generated before?
  doesCalendarAlreadyExist() {
    this.loading = true;
    this.storeResponse = [];
    this.generatedMonths = [];
    this.selectedMonthData = {};
    this.month = [];
    this.bills = [];
    this.listOfBills = [];
    this.dataSource = undefined;
    this.generatedBills = [];
    this.billsByDate = [];
    this.billsArrayForMonth = undefined;
    this.getStartDayOfWeek();
    this.getMonthsBills();
    this.store.collection('generatedMonths', ref =>
      ref.where('user', '==', 'RYAN2914')
        .where('month', '==', this.selectedMonth)
        .where('year', '==', this.selectedYear)
        .limit(1) // Limit to 1 result, as you are using take(1) in your original code
    ).get().subscribe(querySnapshot => {
      if (!querySnapshot.empty) {
        // Yes, document exists, process data
        const document = querySnapshot.docs[0];
        const data = document.data() as GeneratedMonths;
        this.selectedMonthData = { id: document.id, ...data };
        this.locked = this.selectedMonthData.locked ? this.selectedMonthData.locked : false;
        this.getExistingMonthsBills();
      } else {
        // No, document does not exist - create a new month
        this.generateNewMonth({ month: this.selectedMonth, year: this.selectedYear, user: 'RYAN2914', locked: false });
      }
    }, (error) => {
      console.log('Error:', error);
    });
  }

  //Get the starting day of the week set by the user
  getStartDayOfWeek() : any{
    this.store.collection('startDay', ref =>
      ref.where('user', '==', 'RYAN2914')
        .limit(1) // Limit to 1 result, as you are using take(1) in your original code
    ).get().subscribe(querySnapshot => {
      if (!querySnapshot.empty) {
        // Document exists, process data
        const document = querySnapshot.docs[0];
        const data = document.data() as StartDay;
        this.startingDayOfTheWeek = data.dayOfTheWeek;
      } else {
        // ToDo Document does not exist, create one
      }
    }, (error) => {
      console.log('Error:', error);
    });
  }

  // Get bills for a generatedMonth
  getExistingMonthsBills() {
    this.store.collection('generatedBills', ref =>
      ref.where('user', '==', 'RYAN2914')
        .where('month', '==', this.selectedMonth)
        .where('year', '==', this.selectedYear)
    ).snapshotChanges().subscribe((response) => {
      const responseData = response.map(item => {
        const data = item.payload.doc.data() as CalendarEntry;
        return { id: item.payload.doc.id, data };
      });
      this.generatedBills = responseData;
      this.processMonth();
    });
  }

  processMonth() {
    // this.paydays = [];
    console.log(this.months);
    if(this.month.length>0){
      let billsArrayMonth: ProcessMonthResponse[][] = [];
      let foundOne = false;
      let foundOneAgain = false;
      // console.log(this.month);
      this.month.forEach((week) => {
        let billsArray: ProcessMonthResponse[] = [];
        week.forEach((day) => {
          //if first day was already found, watch for last
          if (day === 1 && foundOne) {
            foundOneAgain = true;
          }
          //do not set days before 1
          if (day === 1 && !foundOne) {
            foundOne = true;
          }
          //one was found, and second one was not
          if (foundOne && !foundOneAgain) {
            const generatedBills = this.findGeneratedBillsByDay(day);
            const paychecks = this.isDateAPayDay('RYAN2914', new Date(this.selectedYear, this.selectedMonth-1, day));
            // console.log(paychecks);
            let processMonthResponse: ProcessMonthResponse = { day: day, month:this.selectedMonth, year: this.selectedYear, listOfBills: generatedBills, income: paychecks }
            billsArray = [...billsArray, processMonthResponse];
            // billsArray.push(processMonthResponse);
          } else if (!foundOne) {
            let month = 0;
            let year = 0;
            if(this.selectedMonth===1){
              month=12;
              year = this.selectedYear-1;
            } else {
              month = this.selectedMonth-1;
              year = this.selectedYear;
            }
            const paychecks = this.isDateAPayDay('RYAN2914', new Date(year, month-1, day));
            let processMonthResponse: ProcessMonthResponse = { day: day, month:month, year: year, listOfBills: undefined, income: paychecks }
            // billsArray.push(processMonthResponse);
            billsArray = [...billsArray, processMonthResponse];
          } else if (foundOne && foundOneAgain) {
            let month = 0;
            let year = 0;
            if(this.selectedMonth===12){
              month=1;
              year=this.selectedYear+1;
            } else {
              month = this.selectedMonth+1;
              year = this.selectedYear;
            }
            const paycheck = this.isDateAPayDay('RYAN2914', new Date(year, month-1, day));
            let processMonthResponse: ProcessMonthResponse = { day: day, month:month, year: year, listOfBills: undefined, income: paycheck }
            // billsArray.push(processMonthResponse);
            billsArray = [...billsArray, processMonthResponse];
          }
        });
        console.log(billsArray);
        // billsArrayMonth = {...billsArrayMonth, billsArray};
        billsArrayMonth.push(billsArray);
      });
      // this.billsArrayForMonth = billsArrayMonth;
      //@ts-ignore
      this.billsArrayForMonth = {...this.billsArrayForMonth, billsArrayMonth};
      //@ts-ignore
      this.billsArrayMonth = this.billsArrayForMonth['billsArrayMonth'];
      console.log(this.billsArrayForMonth);
      this.loading = false;
    } else {
      console.log('not loaded yet');
      setTimeout(()=>{
        this.processMonth();
      }, 1500 )
    }
  }
  
  
  isDateAPayDay(user: string, date: Date): PaycheckResponse[] {
    let responseObject: PaycheckResponse[] = [];
    let paychecksResponse: PaycheckResponse[] = [];
    this.store.collection('paychecks', ref =>
      ref.where('user', '==', user)
      //@ts-ignore
    ).snapshotChanges().subscribe((response) => {
      const responseData = response.map(item => {
        let data = item.payload.doc.data() as Paycheck;
        if(data.payStartDate instanceof Object){
          //@ts-ignore
          const timestampSeconds = data.payStartDate['seconds'] * 1000; // Convert seconds to milliseconds
          data.payStartDate = new Date(timestampSeconds);
        }
        return { id: item.payload.doc.id, data };
      });
      paychecksResponse = responseData;
      if(paychecksResponse.length > 0){
        const today = new Date();
        // Add 3 years to today's date
        // const threeYearsLater = new Date();
        let threeYearsLater = new Date(date);
        
        threeYearsLater.setMonth(threeYearsLater.getMonth()+2);
        // threeYearsLater.setFullYear(today.getFullYear() + 1);
        for(let check of paychecksResponse){
          let checkStartDate = check.data?.payStartDate;
          let frequency: number = check.data?.frequency === 'weekly' ? 7 : 14;
          if(checkStartDate) {
            while(checkStartDate < threeYearsLater){
              // console.log(date);
              if(checkStartDate.toDateString() === date.toDateString()) {
                responseObject.push(check);
                // this.paydays.push(check);
                checkStartDate = threeYearsLater;
              }
              checkStartDate.setDate(checkStartDate.getDate() + frequency);
            }
          }
        }
        // console.log(responseObject);
        return responseObject;
      }
    });
    return responseObject;
  }

  findGeneratedBillsByDay(day: number): StoreResponse[] {
    let storeResponse: StoreResponse[] = [];
    for (let bill of this.generatedBills) {
      if (bill.data?.date === day) {
        storeResponse.push({ id: bill.id, data: bill as any })
      }
    }
    return storeResponse;
  }

  mapBills() {
    const billsByDate1: any = {};
    this.billsByDate.forEach((bill) => {
      const date = bill.date;
      if (!billsByDate1[date]) {
        billsByDate1[date] = [];
      }
      billsByDate1[date].push(bill);
    });
    // Create a new array with bills mapped to the weeks
    const billsByWeek = this.month.map((week) => {
      return week.map((day) => {
        return {
          date: day,
          bills: billsByDate1[day] || [],
        };
      });
    });
    this.billsByDate = billsByWeek;
  }


  //Get months bills for generating a new month, or comparing to existing
  getMonthsBills() {
    if(this.startingDayOfTheWeek){
      this.month = this.calendarService.generateMonthArray(this.selectedYear, this.selectedMonth, this.startingDayOfTheWeek);
      this.store.collection('bill', ref =>
        ref.where('user', '==', 'RYAN2914')).snapshotChanges().subscribe((response) => {
          this.dataSource = response.map(item => {
            const data = item.payload.doc.data() as Bill[];
            return { id: item.payload.doc.id, data };
          });
          this.listOfBills = this.dataSource;
          this.listOfBills.sort((a, b) => a.data.dueDay - b.data.dueDay);
          for (let bill of this.listOfBills) {
            bill.data.id = bill.id;
          }
      });
    } else {
      console.log('Starting date not loaded yet');
      setTimeout(()=>{
        this.getMonthsBills();
      }, 1000 )
    }
  }

  //After creating the month, generate all the bills for it
  generateMonthsBills() {
    //todo - check for weekly bills, and add them weekly when needed
    if(this.listOfBills.length > 0) {
      for (let bill of this.listOfBills) {
        const calendarEntry: CalendarEntry = {
          month: this.selectedMonth,
          year: this.selectedYear,
          date: bill.data.dueDay,
          locked: this.locked,
          bill: bill.data,
          user: 'RYAN2914',
          paid: false,
          amount: bill.data.amount
        }
        this.bills.push(calendarEntry)
      }
      this.bills.forEach((bill) => {
        this.store.collection('generatedBills').add(bill)
          .then((docRef) => {
            console.log('Document added with ID: ', docRef.id);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      });
      // get bills
      this.getExistingMonthsBills();
    } else {
      console.log('bills not loaded yet');
      setTimeout(()=>{
        this.generateMonthsBills();
      }, 1500)
    }
  }

  //Generate a new month entry so it will not be created again 
  generateNewMonth(newGeneratedMonths: GeneratedMonths) {
    // Add a new document to the 'generatedMonths' collection
    this.store.collection('generatedMonths').add(newGeneratedMonths)
      .then((docRef) => {
        //todo should probably set this var after creating? or then get it later...
        console.log('Document added with ID: ', docRef.id);
        this.generateMonthsBills();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  updateLocked() {
    if (this.selectedMonthData) {
      let updatingMonth: GeneratedMonths = this.selectedMonthData;
      updatingMonth.locked = this.locked;
      this.store.collection('generatedMonths').doc(updatingMonth.id).update({
        locked: this.locked
      });
    } else {
      console.log('no selected month')
    }
  }

  confirmRegenerate(){
    this.showConfirmRegenerate = true;
  }
  
  regenerateCalendar(){
    this.regenerating = true;
    this.reusableService.deleteGeneratedData('RYAN2914', this.selectedMonth, this.selectedYear)
    .subscribe((response)=>{
      this.regenerating = false;
      this.hideRegenerateConfirmModal();
    }, (error)=>{
      this.regenerating = false;
    })
  }

  hideRegenerateConfirmModal(){
    this.regenerating = false;
    this.regeneratingMessage = undefined;
    this.showConfirmRegenerate = false;
    // window.location.reload();
    this.doesCalendarAlreadyExist();
  }

  showAddExceptionModal(event: any){
    console.log('here?');
    this.exceptionRequest = event;
    // { date, bill id, user id }
    this.addException = true;
    console.log('here');
    console.log(event);
  }

  hideAddExceptionModal(){
    this.addException = false;
    this.addingException = false;
    this.exceptionDate = new Date();
    this.exceptionHours = 0;
    this.exceptionReason = '';
    this.exceptionRequest = undefined;
    this.exceptionError = undefined;
  }

  submitException(){
    this.addingException = true;
    let exceptionRequest = {
      exceptionDate: this.exceptionDate,
      exceptionHours: this.exceptionHours,
      exceptionReason: this.exceptionReason,
      exceptionBillId: this.exceptionRequest.bill.id,
      user: this.exceptionRequest.user
    }
    this.store.collection('incomeExceptions').add(this.exceptionRequest)
    .then((docRef) => {
      //todo should probably set this var after creating? or then get it later...
      console.log('Document added with ID: ', docRef.id);
      this.addingException = false;
      this.hideAddExceptionModal()
    })
    .catch((error) => {
      this.exceptionError = 'Something went wrong saving your exception. Please try again later.';
      this.addingException = false;
      console.error('Error adding document: ', error);
    });

  }

  
}
