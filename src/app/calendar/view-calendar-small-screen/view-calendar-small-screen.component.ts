import { Component } from '@angular/core';
import { GeneratedMonths } from 'src/app/models/generatedMonths';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReusableService } from 'src/app/reusable/reusable.service';
import { Bill } from 'src/app/models/bill';
import { Carousel } from 'primeng/carousel';
import { CalendarService } from 'src/app/calendar/calendar.service';
import { PaycheckResponse } from 'src/app/models/paycheckResponse';
import { Paycheck } from 'src/app/models/paycheck';
import { AllBillsResponse } from 'src/app/models/allBillsResponse';
import { CalendarEntry } from 'src/app/models/calendarEntry';
import { DropdownValue } from 'src/app/models/dropdownValue';
import { GeneratedBillsResponse } from 'src/app/models/generatedBillsResponse';
import { ProcessMonthResponse } from 'src/app/models/processMonthResponse';
import { StartDay } from 'src/app/models/startDay';
import { StoreResponse } from 'src/app/models/storeResponse';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core-components/core-services/auth.service';

@Component({
  selector: 'app-view-calendar-small-screen',
  templateUrl: './view-calendar-small-screen.component.html',
  styleUrl: './view-calendar-small-screen.component.scss'
})
export class ViewCalendarSmallScreenComponent {

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
  billsArrayForMonth: ProcessMonthResponse[][] = [];
  regenerating = false;
  regeneratingMessage: any;
  showConfirmRegenerate = false;
  paydays: any;
  newObjectTest: any;
  billsArrayMonth: ProcessMonthResponse[][] = [];
  billsArrayForMonthFromCalendarEntry: any;

  moving = false;
  movingErrorMessage = '';
  movingBill: any;
  showMoveBillConfirmationModal = false;
  editing = false;
  editErrorMessage = '';
  editingBill: any;
  showEditBillConfirmationModal = false;
  newDay: number = 1;
  availableDates: number[] = [];

  //adding an exception
  addException = false;
  addingException = false;
  exceptionDate: Date = new Date();
  exceptionHours: number = 0;
  exceptionReason: string = '';
  exceptionRequest: any;
  exceptionError: any;
  user: any | null = null;

  constructor(
    private store: AngularFirestore,
    private calendarService: CalendarService,
    private reusableService: ReusableService,
    private router: Router,
    private authService: AuthService) {
    Carousel.prototype.onTouchMove = () => { };
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
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(this.user.uid);
        const date = new Date();
        this.selectedMonth = this.months.find(month => month.value === date.getMonth() + 1)?.value;
        this.selectedYear = this.years.find(year => year.value === date.getFullYear())?.value;
        this.doesCalendarAlreadyExist();
      } else {
        this.router.navigate(['/login'])
      }
    });
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
    this.billsArrayForMonth = [];
    this.getStartDayOfWeek();
    this.getMonthsBills();
    this.store.collection('generatedMonths', ref =>
      ref.where('user', '==', this.user.uid)
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
        this.generateNewMonth({ month: this.selectedMonth, year: this.selectedYear, user: this.user.uid, locked: false });
      }
    }, (error) => {
      console.log('Error:', error);
    });
  }

  //Get the starting day of the week set by the user
  getStartDayOfWeek(): any {
    this.store.collection('startDay', ref =>
      ref.where('user', '==', this.user.uid)
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
      ref.where('user', '==', this.user.uid)
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
    if (this.month.length > 0) {
      let billsArrayMonth: ProcessMonthResponse[][] = [];
      let foundOne = false;
      let foundOneAgain = false;
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
            const paychecks = this.isDateAPayDay(this.user.uid, new Date(this.selectedYear, this.selectedMonth - 1, day));
            let processMonthResponse: ProcessMonthResponse = { day: day, month: this.selectedMonth, year: this.selectedYear, listOfBills: generatedBills, income: paychecks }
            billsArray = [...billsArray, processMonthResponse];
            // billsArray.push(processMonthResponse);
          } else if (!foundOne) {
            let month = 0;
            let year = 0;
            if (this.selectedMonth === 1) {
              month = 12;
              year = this.selectedYear - 1;
            } else {
              month = this.selectedMonth - 1;
              year = this.selectedYear;
            }
            const paychecks = this.isDateAPayDay(this.user.uid, new Date(year, month - 1, day));
            let processMonthResponse: ProcessMonthResponse = { day: day, month: month, year: year, listOfBills: undefined, income: paychecks }
            // billsArray.push(processMonthResponse);
            billsArray = [...billsArray, processMonthResponse];
          } else if (foundOne && foundOneAgain) {
            let month = 0;
            let year = 0;
            if (this.selectedMonth === 12) {
              month = 1;
              year = this.selectedYear + 1;
            } else {
              month = this.selectedMonth + 1;
              year = this.selectedYear;
            }
            const paycheck = this.isDateAPayDay(this.user.uid, new Date(year, month - 1, day));
            let processMonthResponse: ProcessMonthResponse = { day: day, month: month, year: year, listOfBills: undefined, income: paycheck }
            // billsArray.push(processMonthResponse);
            billsArray = [...billsArray, processMonthResponse];
          }
        });
        for (let bill of billsArray) {
          let payDate: Date = new Date(bill.year, bill.month, bill.day);
          if (bill.income && bill.income.length > 0) {
            for (let income of bill.income) {
              this.store.collection('incomeExceptions', ref =>
                ref.where('user', '==', this.user.uid)
                  .where('date', '==', payDate)
                  .where('bill.id', '==', income.id)
              ).snapshotChanges().subscribe((response) => {
                const responseData = response.map(item => {
                  let data = item.payload.doc.data() as IncomeExceptionResponse;
                  console.log(data);
                  return { id: item.payload.doc.id, data };
                });
                console.log(responseData);
              });
            }
          }
        }
        // billsArrayMonth = {...billsArrayMonth, billsArray};
        billsArrayMonth.push(billsArray);
      });
      // this.billsArrayForMonth = billsArrayMonth;
      //@ts-ignore
      this.billsArrayForMonth = { ...this.billsArrayForMonth, billsArrayMonth };
      //@ts-ignore
      this.billsArrayMonth = this.billsArrayForMonth['billsArrayMonth'];
      this.loading = false;
    } else {
      console.log('not loaded yet');
      setTimeout(() => {
        this.processMonth();
      }, 1500)
    }
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
    if (this.startingDayOfTheWeek) {
      this.month = this.calendarService.generateMonthArray(this.selectedYear, this.selectedMonth, this.startingDayOfTheWeek);
      this.store.collection('bill', ref =>
        ref.where('user', '==', this.user.uid)).snapshotChanges().subscribe((response) => {
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
      setTimeout(() => {
        this.getMonthsBills();
      }, 1000)
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
        if (data.payStartDate instanceof Object) {
          //@ts-ignore
          const timestampSeconds = data.payStartDate['seconds'] * 1000; // Convert seconds to milliseconds
          data.payStartDate = new Date(timestampSeconds);
        }
        return { id: item.payload.doc.id, data };
      });
      paychecksResponse = responseData;
      if (paychecksResponse.length > 0) {
        const today = new Date();
        // Add 3 years to today's date
        // const threeYearsLater = new Date();
        let threeYearsLater = new Date(date);

        threeYearsLater.setMonth(threeYearsLater.getMonth() + 2);
        // threeYearsLater.setFullYear(today.getFullYear() + 1);
        for (let check of paychecksResponse) {
          let checkStartDate = check.data?.payStartDate;
          let frequency: number = check.data?.frequency === 'weekly' ? 7 : 14;
          if (checkStartDate) {
            while (checkStartDate < threeYearsLater) {
              if (checkStartDate.toDateString() === date.toDateString()) {
                responseObject.push(check);
                // this.paydays.push(check);
                checkStartDate = threeYearsLater;
              }
              checkStartDate.setDate(checkStartDate.getDate() + frequency);
            }
          }
        }
        // console.log(responseObject);
        if (responseObject.length > 0) {
          return this.getExceptions(responseObject, date)
        } else {
          return responseObject;
        }
      }
    });
    return responseObject;
  }

  getExceptions(paydays: any, date: Date) {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0, 0);
    this.store.collection('incomeExceptions', ref =>
      ref.where('user', '==', this.user.uid)
        .where('date', '>=', startOfDay)
        .where('date', '<=', endOfDay)
    ).snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item => {
        const data = item.payload.doc.data() as IncomeExceptionResponse[];
        return { id: item.payload.doc.id, data };
      });
      if(this.dataSource.length > 0){
        for(let exception of this.dataSource){
          // console.log(new Date(exception.data.date.seconds*1000));
          for(let payday of paydays){
            console.log(payday);
            console.log(exception);
          }
        }
      }
    }, (error) => {
      console.log('Error:', error);
    });
  }

  //After creating the month, generate all the bills for it
  generateMonthsBills() {
    //todo - check for weekly bills, and add them weekly when needed
    if (this.listOfBills.length > 0) {
      for (let bill of this.listOfBills) {
        const calendarEntry: CalendarEntry = {
          month: this.selectedMonth,
          year: this.selectedYear,
          date: bill.data.dueDay,
          locked: this.locked,
          bill: bill.data,
          user: this.user.uid,
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
      setTimeout(() => {
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

  confirmRegenerate() {
    this.showConfirmRegenerate = true;
  }

  regenerateCalendar() {
    this.regenerating = true;
    this.reusableService.deleteGeneratedData(this.user.uid, this.selectedMonth, this.selectedYear)
      .subscribe((response) => {
        this.regenerating = false;
        this.hideRegenerateConfirmModal();
      }, (error) => {
        this.regenerating = false;
      })
  }

  hideRegenerateConfirmModal() {
    this.regenerating = false;
    this.regeneratingMessage = undefined;
    this.showConfirmRegenerate = false;
    this.doesCalendarAlreadyExist();
  }


  moveBillConfirm(event: any) {
    this.billsArrayForMonthFromCalendarEntry = event;
    this.movingBill = this.billsArrayForMonthFromCalendarEntry.generatedBill;
    this.setMonthDropdown();
    this.showMoveBillConfirmationModal = true;
  }

  moveBill() {
    this.moving = true;
    this.store.collection('generatedBills').doc(this.movingBill.data.id).update({
      //@ts-ignore
      date: this.newDay
    }).then(() => {
      this.moving = false;
      this.hideMoveModal();
      // this.messageService.add({summary: 'Success', severity: 'success', detail: 'Successfully updated the date!'})
    })
      .catch(() => {
        this.moving = false;
        this.movingErrorMessage = 'There was an error updating the date!';
      });
  }

  hideMoveModal() {
    this.moving = false;
    this.movingErrorMessage = '';
    this.showMoveBillConfirmationModal = false;
  }

  editBillConfirm(event: any) {
    this.billsArrayForMonthFromCalendarEntry = event;
    this.editingBill = this.billsArrayForMonthFromCalendarEntry.generatedBill;
    this.setMonthDropdown();
    this.showEditBillConfirmationModal = true;
  }

  editAmount() {
    //this.editingBill.data.data.bill.amount
    this.editing = true;
    this.store.collection('generatedBills').doc(this.editingBill.data.id).update({
      amount: this.editingBill.data.data.amount
    }).then(() => {
      this.editing = false;
      this.hideEditModal();
      // this.messageService.add({summary: 'Success', severity: 'success', detail: 'Successfully updated the amount!'})
    })
      .catch(() => {
        this.editing = false;
        this.editErrorMessage = 'There was an error updating the amount!';
      });
  }

  hideEditModal() {
    this.editing = false;
    this.editErrorMessage = '';
    this.showEditBillConfirmationModal = false;
  }

  setMonthDropdown() {
    if (this.billsArrayForMonthFromCalendarEntry.billsArrayForMonth && this.billsArrayForMonthFromCalendarEntry.billsArrayForMonth.listOfBills && this.billsArrayForMonthFromCalendarEntry.billsArrayForMonth.listOfBills.length > 0) {
      this.newDay = this.billsArrayForMonthFromCalendarEntry.billsArrayForMonth.listOfBills[0].data.data.date;
      const year = this.billsArrayForMonthFromCalendarEntry.billsArrayForMonth.listOfBills[0].data.data.year;
      const month = this.billsArrayForMonthFromCalendarEntry.billsArrayForMonth.listOfBills[0].data.data.month;
      function daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
      }
      const numberOfDays = daysInMonth(month, year);
      this.availableDates = Array.from({ length: numberOfDays }, (_, index) => index + 1);
    } else {
      setTimeout(() => {
        console.log('not found');
        this.setMonthDropdown();
      }, 1500)
    }
  }

  editBillSpent: BillSpent[] = [];
  billSpent: any;
  showEditBillSpentConfirmationModal = false;
  editingBillSpent = false;

  editBillSpentConfirm(event: any) {
    this.store.collection('billSpent', ref =>
      ref.where('billId', '==', event.id)
    ).snapshotChanges().subscribe((response) => {
      const responseData = response.map(item => {
        const data = item.payload.doc.data() as BillSpentResponse;
        return { id: item.payload.doc.id, data };
      });
      this.billSpent = responseData;
      this.billsArrayForMonthFromCalendarEntry = event;
      this.editBillSpent = this.billsArrayForMonthFromCalendarEntry.generatedBill;
      this.showEditBillSpentConfirmationModal = true;

    });
  }

  editBillSpentSubmit() {
    this.editingBillSpent = true;
    this.store.collection('billSpent').add(this.billSpent)
      .then((docRef) => {
        //todo should probably set this var after creating? or then get it later...
        console.log('Document added with ID: ', docRef.id);
        this.editingBillSpent = false;
        this.hideEditSpentModal()
      })
      .catch((error) => {
        this.editingBillSpent = false;
        this.hideEditSpentModal()
        console.error('Error adding document: ', error);
      });
  }

  hideEditSpentModal() {
    this.editingBillSpent = false;
    this.showEditBillSpentConfirmationModal = false;
  }

  showAddExceptionModal(event: any) {
    console.log(event);
    this.exceptionRequest = event;
    this.addException = true;
    this.exceptionDate = new Date();
  }

  hideAddExceptionModal() {
    this.addException = false;
    this.addingException = false;
    this.exceptionHours = 0;
    this.exceptionReason = '';
    this.exceptionRequest = undefined;
    this.exceptionError = undefined;
  }

  submitException() {
    this.addingException = true;
    this.exceptionRequest = {
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

export interface ProcessMonthArray {
  processMonthResponses: ProcessMonthResponse[];
}

export interface BillSpentResponse {
  id: string,
  data: BillSpent
}

export interface BillSpent {
  billId: string,
  name: string;
  amount: number;
}

export interface IncomeExceptionResponse {
  id: string,
  data: any;
}
