import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-manage-income',
  templateUrl: './manage-income.component.html',
  styleUrl: './manage-income.component.scss'
})
export class ManageIncomeComponent implements OnInit {

  payFrequencyOptions = ['weekly', 'bi-weekly'];
  PAYCHECKS_COLLECTION: string = 'paychecks';
  loading = false;
  paychecks: PaycheckResponse[] = []; 
  editPaycheck: PaycheckResponse | undefined;
  addingPaycheck = false;
  showDeleteConfirmModal = false;
  deletePaycheck: PaycheckResponse | undefined;
  deleting = false;
  editing = false;
  newPaycheck: Paycheck | undefined;
  showAddPaycheckModal = false;
  savingNewPaycheck = false;
  editDate: Date | undefined;

  constructor(private firestore: AngularFirestore){

  }

  ngOnInit() {
    this.exampleGetDate();
    this.getPaychecks();
  }

  getPaychecks(){
    this.loading = true;
    this.firestore.collection(this.PAYCHECKS_COLLECTION, ref =>
      ref.where('user', '==', 'RYAN2914')
    ).snapshotChanges().subscribe((response) => {
      const responseData = response.map(item => {
        let data = item.payload.doc.data() as Paycheck;
        console.log(typeof data.payStartDate)
        console.log(data.payStartDate)
        console.log(data.payStartDate instanceof Object)
        if(data.payStartDate instanceof Object){
          console.log('here?')
          //@ts-ignore
          const timestampSeconds = data.payStartDate['seconds'] * 1000; // Convert seconds to milliseconds
          // console.log(test)
          data.payStartDate = new Date(timestampSeconds);
        }
        return { id: item.payload.doc.id, data };
      });
      this.paychecks = responseData;
      console.log(this.paychecks);
      this.loading = false;
    });
  }

  onRowEditInit(paycheck: PaycheckResponse) {
    //@ts-ignore
    this.editDate = paycheck.data?.frequency instanceof timestamp ? paycheck.data.frequency.seconds : paycheck.data?.frequency;
    console.log(this.editDate);
    console.log(this.editDate);
      this.editPaycheck = paycheck;
  }

  onRowEditSave(paycheck: PaycheckResponse) {
      if (paycheck.data && paycheck.data && paycheck.data.amount) {

      } else {

      }
  }

  onRowEditCancel(paycheck: Paycheck, index: number) {
      this.editPaycheck = undefined;
      this.editing = false;
  }

  addRow(){
    this.newPaycheck = {name: 'New Paycheck', amount: 0, frequency: 'weekly', user: 'RYAN2914', payStartDate: new Date()};
    this.showAddPaycheckModal = true;
  }

  hideAddPaycheckModal(){
    this.showAddPaycheckModal = false;
    this.editPaycheck = undefined
  }

  addOrEditPaycheck(){
    this.addingPaycheck = true;
    if(this.editPaycheck){
      //update paycheck
      this.firestore.collection(this.PAYCHECKS_COLLECTION).doc(this.editPaycheck.id).update({
        name: this.editPaycheck?.data?.name,
        amount: this.editPaycheck?.data?.amount,
        frequency: this.editPaycheck?.data?.frequency,
        payStartDate: this.editPaycheck?.data?.payStartDate
      })
      .then(() => {
        this.addingPaycheck = false;
        this.hideAddPaycheckModal();
      })
      .catch((error) => {

      })
    } else {
      this.firestore.collection(this.PAYCHECKS_COLLECTION).add(this.newPaycheck)
      .then((docRef) => {
        //todo should probably set this var after creating? or then get it later...
        console.log('Document added with ID: ', docRef.id);
        this.addingPaycheck = false;
        this.hideAddPaycheckModal();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    }
  }

  deleteConfirmPaycheck(paycheck: PaycheckResponse){
    this.showDeleteConfirmModal = true;
    this.deletePaycheck = paycheck
  }

  deletePaycheckSubmit(){
    this.deleting = true;
    this.firestore.doc(`${this.PAYCHECKS_COLLECTION}/${this.deletePaycheck?.id}`).delete()
      .then(() =>{
        this.hideDeleteConfirmPaycheck();
      })
      .catch((error)=>{

      });

  }

  hideDeleteConfirmPaycheck(){
    this.deletePaycheck = undefined;
    this.showDeleteConfirmModal = false;
  }

  exampleGetDate(){
    // Example usage with the generated start date and specified parameters
    const startGenerated = '08/11/23';
    // Extract components
    const [month, day, year] = startGenerated.split('/').map(Number);
    // JavaScript Date uses 0-based months, so subtract 1 from the month
    const adjustedMonth = month - 1;
    // Create a new Date object with the specified components
    const startDateObject = new Date(2000 + year, adjustedMonth, day);
    const resultDates = this.generatePaymentDates(startDateObject, 3, 2024, 'bi-weekly');
    console.log(`Payment Dates: ${resultDates}`);
  }

  generatePaymentDates(startDate: Date, month: number, year: number, frequency: string): Date[] {
    const paymentDates: Date[] = [];
    const adjustedMonth = month - 1;
    let newDate = new Date(year, adjustedMonth);
    let nextMonth = new Date(year, adjustedMonth+1);
    const incrementDate = this.getOffset(frequency);
    while(startDate < newDate) {
      startDate.setDate(startDate.getDate() + incrementDate);
    }
    while(startDate < nextMonth) {
      const pushDate = new Date(startDate);
      paymentDates.push(pushDate);
      startDate.setDate(startDate.getDate() + incrementDate);
    }
    return paymentDates;
  }
  
  getOffset(frequency: string): number {
    switch (frequency ) {
      case 'weekly':
        return 7;
      case 'bi-weekly':
        return 14;
      default:
        return 7;        
    }
  }

}

// 
// i need this interface paycheck { user?: string, payStartDate?: Date, amount?: number, frequency?: string }
// to firebase collection : paychecks

// i need to have an editable primeng p-table that displays paychecks by user
// cols: name, frequency, amount, startDate, actions (with pi-pencil icon to edit row)
// when i edit a row, i need 
//    - input field with label Paycheck Name [(ngModel)]="paycheck.name"
//    - p-dropdown with label Frequency with [options]="payFrequencyOptions", 
//      - payFrequencyOptions=['weekly', 'bi-weekly'] [(ngModel)]="paycheck.frequency"
//    - calendar input field label Pay Start Date [(ngModel)]="paycheck.payStartDate"
//    - p-inputnumber field with $ filter label Amount [(ngModel)]="paycheck.amount"

// i need to be able to get paychecks collection by user

// i need a function to be able to edit rows
// i need a function to be able to delete rows
// i need a function to be able to add rows

export interface Paycheck {
  user?: string;
  payStartDate?: Date;
  amount?: number;
  frequency?: string;
  name?: string;
}

export interface PaycheckResponse {
  id?: string,
  data?: Paycheck
}
