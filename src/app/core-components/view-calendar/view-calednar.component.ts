import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, map, mergeMap, take } from 'rxjs';
import { GeneratedMonths } from 'src/app/models/generatedMonths';
import { CalendarService } from '../calendar.service';

interface DropdownValue {
  label: string,
  value: any
}

interface StoreResponse {
  id?: string; 
  data?: any[];
}

interface StartDay {
  dayOfTheWeek: string;
  user: string;
}

@Component({
  selector: 'app-view-calednar',
  templateUrl: './view-calednar.component.html',
  styleUrl: './view-calednar.component.scss'
})
export class ViewCalednarComponent implements OnInit{

  items = [1,2,3,4,5,6,7,8];
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

  constructor(private store: AngularFirestore, private calendarService: CalendarService){
    this.months = [
      {label: 'January', value: 1},
      {label: 'February', value: 2},
      {label: 'March', value: 3},
      {label: 'April', value: 4},
      {label: 'May', value: 5},
      {label: 'June', value: 6},
      {label: 'July', value: 7},
      {label: 'Auguest', value: 8},
      {label: 'September', value: 9},
      {label: 'October', value: 10},
      {label: 'November', value: 11},
      {label: 'December', value: 12}
    ];
    this.years = [
      {label: '2021', value: 2021},
      {label: '2022', value: 2022},
      {label: '2023', value: 2023},
      {label: '2024', value: 2024},
      {label: '2025', value: 2025},
      {label: '2026', value: 2026},
      {label: '2027', value: 2027},
      {label: '2028', value: 2028},
      {label: '2029', value: 2029},
      {label: '2030', value: 2030}
    ]
  }

  ngOnInit(): void {
    const date = new Date();
    this.selectedMonth = this.months.find(month => month.value === date.getMonth() + 1)?.value;
    this.selectedYear = this.years.find(year => year.value === date.getFullYear())?.value;
    this.doesCalendarAlreadyExist();
  }

  doesCalendarAlreadyExist() {
    this.store.collection('generatedMonths', ref =>
      ref.where('user', '==', 'RYAN2914')
         .where('month', '==', this.selectedMonth)
         .where('year', '==', this.selectedYear)
         .limit(1) // Limit to 1 result, as you are using take(1) in your original code
    ).get().subscribe(querySnapshot => {
      if (!querySnapshot.empty) {
        // Document exists, process data
        const document = querySnapshot.docs[0];
        const data = document.data() as GeneratedMonths;
        this.selectedMonthData = { id: document.id, ...data };
        this.locked = this.selectedMonthData.locked ? this.selectedMonthData.locked : false;
        this.getStartDay();
      } else {
        // Document does not exist
        this.generateNewMonth({ month: this.selectedMonth, year: this.selectedYear, user: 'RYAN2914', locked: false });
      }
    }, (error) => {
      console.log('Error:', error);
    });
  }
  
  

  getStartDay() {
    this.store.collection('startDay', ref =>
      ref.where('user', '==', 'RYAN2914')
         .limit(1) // Limit to 1 result, as you are using take(1) in your original code
    ).get().subscribe(querySnapshot => {
      if (!querySnapshot.empty) {
        // Document exists, process data
        const document = querySnapshot.docs[0];
        const data = document.data() as StartDay;
        this.startingDayOfTheWeek = data.dayOfTheWeek;
        this.getMonthsBills(data);
      } else {
        // Document does not exist
        // this.generateNewMonth({ month: this.selectedMonth, year: this.selectedYear, user: 'RYAN2914', locked: false });
      }
    }, (error) => {
      console.log('Error:', error);
    });
  }
  

  getMonthsBills(generatedMonth: GeneratedMonths){
    this.month = this.calendarService.generateMonthArray(this.selectedYear, this.selectedMonth, this.startingDayOfTheWeek);
    // let month1: number[][][] = this.calendarService.generateMonthMatrix(this.selectedYear, this.selectedMonth, this.startingDayOfTheWeek);
    // console.log(month1);
    //if month does not start on starting day of the week
    console.log(this.month);
    if(this.month[0][0] > 1){
      console.log('month does not start on the first day');
    }
    
  } 

  generateNewMonth(newGeneratedMonths: GeneratedMonths) {
    // Add a new document to the 'generatedMonths' collection
    this.store.collection('generatedMonths').add(newGeneratedMonths)
      .then((docRef) => {
        console.log('Document added with ID: ', docRef.id);
        this.generateMonth();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  //Generate Months bills using the bill list
  generateMonth(){
    this.getStartDay();
  }

  updateLocked(){
    console.log(this.selectedMonthData);
    if(this.selectedMonthData){
      let updatingMonth: GeneratedMonths = this.selectedMonthData;
      updatingMonth.locked = this.locked;
      this.store.collection('generatedMonths').doc(updatingMonth.id).update({ 
        locked: this.locked
      });
    } else {
      console.log('no selected month')
    } 
  }

}
