import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, map, mergeMap, take } from 'rxjs';
import { GeneratedMonths } from 'src/app/models/generatedMonths';

interface DropdownValue {
  label: string,
  value: any
}

interface StoreResponse {
  id?: string; 
  data?: any[];
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
  locked: boolean = false;
  storeResponse: StoreResponse[] = [];
  generatedMonths: GeneratedMonths[] = [];
  selectedMonthData: GeneratedMonths = {};

  constructor(private store: AngularFirestore){
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
    this.doesCalandarAlreadyExist();
  }

  doesCalandarAlreadyExist() {
    this.store.collection('generatedMonths').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as GeneratedMonths;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
      mergeMap(documents => documents), // Flatten the array
      filter(generatedMonth => 
        generatedMonth.year === this.selectedYear &&
        generatedMonth.month === this.selectedMonth &&
        generatedMonth.user === 'RYAN2914'
      ),
      take(1) // Take only the first matching document
    ).subscribe(filteredResponse => {
      // Handle the filtered response here
      console.log(filteredResponse);
      if(filteredResponse) {
        this.selectedMonthData = filteredResponse;
        this.getMonthsBills(filteredResponse);
      } else {
        this.generateNewMonth({month: this.selectedMonth, year: this.selectedYear, user: 'RYAN2914', locked: false});
      }
    }, (error) => {
      console.log('Error:', error);
    });
  }

  getMonthsBills(generatedMonth: GeneratedMonths){
    if(generatedMonth){
      this.locked = generatedMonth.locked ? generatedMonth.locked : false;
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
