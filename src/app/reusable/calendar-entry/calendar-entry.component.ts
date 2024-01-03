import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-calendar-entry',
  templateUrl: './calendar-entry.component.html',
  styleUrl: './calendar-entry.component.scss'
})
export class CalendarEntryComponent implements OnInit {

  @Input('billsArrayForMonth') billsArrayForMonth?: any;

  constructor(private store: AngularFirestore){}

  ngOnInit(): void {
  }

  markAsPaid(generatedBill: any){
    this.store.collection('generatedBills').doc(generatedBill.data.id).update({ 
      paid: true
    });
  }

  markAsNotPaid(generatedBill: any){
    this.store.collection('generatedBills').doc(generatedBill.data.id).update({ 
      paid: false
    });
  }


}
