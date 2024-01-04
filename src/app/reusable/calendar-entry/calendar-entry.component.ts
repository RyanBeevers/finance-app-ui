import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-calendar-entry',
  templateUrl: './calendar-entry.component.html',
  styleUrl: './calendar-entry.component.scss'
})
export class CalendarEntryComponent implements OnInit {

  @Input('billsArrayForMonth') billsArrayForMonth?: any;
  @Input('locked') locked = false;
  @Input('selectedMonth') selectedMonth: number = 0;
  
  showMoveBillConfirmationModal = false;
  movingBill: any;
  newDay: number = 1;
  availableDates: number[] = [];
  moving = false;
  movingErrorMessage = '';
  wrongMonthLocked = false;

  editing = false;
  editErrorMessage = '';
  editingBill: any;
  showEditBillConfirmationModal = false;

  constructor(private store: AngularFirestore, private messageService: MessageService){
        
  }

  ngOnInit(): void {
    this.setMonthDropdown();
    this.lockWrongMonths();
  }

  lockWrongMonths(){
    if(this.billsArrayForMonth){
      if(this.billsArrayForMonth.month !== this.selectedMonth){
        this.wrongMonthLocked = true;
      }
    }
  }

  setMonthDropdown(){
    if(this.billsArrayForMonth && this.billsArrayForMonth.listOfBills && this.billsArrayForMonth.listOfBills.length>0) {
      this.newDay = this.billsArrayForMonth.listOfBills[0].data.data.date;
      const year = this.billsArrayForMonth.listOfBills[0].data.data.year;
      const month = this.billsArrayForMonth.listOfBills[0].data.data.month;
      function daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
      }
      const numberOfDays = daysInMonth(month, year);
      this.availableDates = Array.from({ length: numberOfDays }, (_, index) => index + 1);
    } else {
      setTimeout(()=>{
        this.setMonthDropdown();
      }, 1500)
    }
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

  moveBillConfirm(generatedBill: any){
    this.movingBill = generatedBill;
    this.showMoveBillConfirmationModal = true;
  }

  moveBill(){
    this.moving = true;
    this.store.collection('generatedBills').doc(this.movingBill.data.id).update({ 
      date: this.newDay
    }).then(() => {
        this.moving = false;
        this.messageService.add({summary: 'Success', severity: 'success', detail: 'Successfully updated the date!'})
      })
      .catch(() => {
        this.moving = false;
        this.movingErrorMessage = 'There was an error updating the date!';
      });
  }

  hideMoveModal(){
    this.moving = false;
    this.movingErrorMessage = '';
    this.showMoveBillConfirmationModal = false;
  }

  editBillConfirm(generatedBill: any){
    this.editingBill = generatedBill;
    this.showEditBillConfirmationModal = true;
  }

  editAmount(){
    //this.editingBill.data.data.bill.amount
    this.editing = true;
    this.store.collection('generatedBills').doc(this.editingBill.data.id).update({ 
      amount: this.editingBill.data.data.amount
    }).then(() => {
        this.editing = false;
        this.messageService.add({summary: 'Success', severity: 'success', detail: 'Successfully updated the amount!'})
      })
      .catch(() => {
        this.editing = false;
        this.editErrorMessage = 'There was an error updating the amount!';
      });
  }

  hideEditModal(){
    this.editing = false;
    this.editErrorMessage = '';
    this.showEditBillConfirmationModal = false;
  }


}
