import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrl: './bill-details.component.scss'
})
export class BillDetailsComponent implements OnInit{

  bill: Bill | undefined;
  daysOfTheWeek = [
    {value: 'Sunday', label: 'Sunday'},
    {value: 'Monday', label: 'Monday'},
    {value: 'Tuesday', label: 'Tuesday'},
    {value: 'Wednesday', label: 'Wednesday'},
    {value: 'Thursday', label: 'Thursday'},
    {value: 'Friday', label: 'Friday'},
    {value: 'Saturday', label: 'Saturday'},
  ]
  editObj: any;
  saving = false;
  @Output() closeModal = new EventEmitter<boolean>();
  @Input() id: any;

  constructor(private store: AngularFirestore){
    
  }

  ngOnInit(): void {
    if(!this.id)
      this.setDefaultBill();
    else 
      this.getBill();
  }

  setDefaultBill(){
    this.bill = {
      name: 'Test Bill',
      amount: 123.45,
      dueDay: 15,
      billVariableFlag: false,
      dueDateModifiableFlag: true,
      recurringFlag: false,
      lateFeeFlag: false,
      autopayFlag: true,
      weeklyFlag: false,
      category: 'Subscription',
      trackSpendingFlag: false,
      endDateFlag: false
    }
  }

  getBill(){
    this.store.collection('bill').doc(this.id).get().subscribe((doc) =>{
      if (doc.exists) {
        const billData = doc.data();
        this.bill = Object.assign({id: this.id}, billData) as Bill;
      } else {
        this.closeModal.emit(true);
      }
    }, (error)=> {
      this.closeModal.emit(true);
    })
  }

  add() {
    this.saving = true;
    if (this.id) {
      this.store.collection('bill').doc(this.id).update({ 
        name: this.bill?.name, 
        dueDay: this.bill?.dueDay, 
        amount: this.bill?.amount,
        billVariableFlag: this.bill?.billVariableFlag,
        billAverage: (this.bill?.billAverage ? this.bill?.billAverage : 0),
        dueDateModifiableFlag: this.bill?.dueDateModifiableFlag,
        recurringFlag: this.bill?.recurringFlag,
        lateFeeFlag: this.bill?.lateFeeFlag,
        daysUntilLateFee: this.bill?.daysUntilLateFee ? this.bill?.daysUntilLateFee : 0,
        lateFeeAmount: this.bill?.lateFeeAmount ? this.bill?.lateFeeAmount : 0,
        continuousFlag: this.bill?.continuousFlag ? this.bill?.continuousFlag : false,
        endDateFlag: this.bill?.endDateFlag,
        endDate: this.bill?.endDate ? this.bill?.endDate : new Date,
        autopayFlag: this.bill?.autopayFlag,
        weeklyFlag: this.bill?.weeklyFlag,
        dayOfTheWeek: this.bill?.dayOfTheWeek ? this.bill?.dayOfTheWeek : 'N/A',
        category: this.bill?.category,
        subCategory: this.bill?.subCategory ? this.bill?.subCategory : 'N/A',
        trackSpendingFlag: this.bill?.trackSpendingFlag,
        spent: this.bill?.spent ? this.bill?.spent : 0,
        frequency: this.bill?.frequency ? this.bill?.frequency : 0
      });
      setTimeout(()=>{
        this.saving = false;
        this.closeModal.emit(true);
       }, 500)
    } else {
      this.store.collection('bill').add({ 
        name: this.bill?.name, 
        dueDay: this.bill?.dueDay, 
        amount: this.bill?.amount,
        billVariableFlag: this.bill?.billVariableFlag,
        billAverage: (this.bill?.billAverage ? this.bill?.billAverage : 0),
        dueDateModifiableFlag: this.bill?.dueDateModifiableFlag,
        recurringFlag: this.bill?.recurringFlag,
        lateFeeFlag: this.bill?.lateFeeFlag,
        daysUntilLateFee: this.bill?.daysUntilLateFee ? this.bill?.daysUntilLateFee : 0,
        lateFeeAmount: this.bill?.lateFeeAmount ? this.bill?.lateFeeAmount : 0,
        continuousFlag: this.bill?.continuousFlag ? this.bill?.continuousFlag : false,
        endDateFlag: this.bill?.endDateFlag,
        endDate: this.bill?.endDate ? this.bill?.endDate : new Date,
        autopayFlag: this.bill?.autopayFlag,
        weeklyFlag: this.bill?.weeklyFlag,
        dayOfTheWeek: this.bill?.dayOfTheWeek ? this.bill?.dayOfTheWeek : 'N/A',
        category: this.bill?.category,
        subCategory: this.bill?.subCategory ? this.bill?.subCategory : 'N/A',
        trackSpendingFlag: this.bill?.trackSpendingFlag,
        spent: this.bill?.spent ? this.bill?.spent : 0,
        frequency: this.bill?.frequency ? this.bill?.frequency : 0
       });
       
       setTimeout(()=>{
        this.saving = false;
        this.closeModal.emit(true);
       }, 500)
       
    }
  }

}
