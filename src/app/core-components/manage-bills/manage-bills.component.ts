import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-manage-bills',
  templateUrl: './manage-bills.component.html',
  styleUrl: './manage-bills.component.scss'
})
export class ManageBillsComponent {

  listOfBills: { name: string; dueDay: number; amount: number }[] = [
    { name: 'Electricity', dueDay: 5, amount: 100 },
    { name: 'Internet', dueDay: 15, amount: 50 },
    { name: 'Rent', dueDay: 1, amount: 1200 },
    { name: 'Water', dueDay: 10, amount: 75 },
    { name: 'Gas', dueDay: 20, amount: 80 },
    { name: 'Phone', dueDay: 25, amount: 30 },
    { name: 'Insurance', dueDay: 3, amount: 150 },
    { name: 'Credit Card', dueDay: 7, amount: 200 },
    { name: 'Netflix', dueDay: 12, amount: 12 },
    { name: 'Gym Membership', dueDay: 8, amount: 50 },
    { name: 'Car Loan', dueDay: 18, amount: 300 },
    { name: 'Health Insurance', dueDay: 5, amount: 120 },
    { name: 'Trash Collection', dueDay: 22, amount: 20 },
    { name: 'Home Security', dueDay: 11, amount: 40 },
    { name: 'Internet Subscription', dueDay: 2, amount: 60 },
    { name: 'Pest Control', dueDay: 14, amount: 45 },
    { name: 'Property Tax', dueDay: 6, amount: 300 },
    { name: 'Student Loan', dueDay: 19, amount: 150 },
    { name: 'Car Insurance', dueDay: 9, amount: 100 },
    { name: 'Streaming Service', dueDay: 16, amount: 15 },
    // Add more bills as needed
  ];
  name: any;
  dueDay: any;
  amount: any;
  showAddDialog = false;
  products!: any[];
  cols!: Column[];


  title = 'finances-app-ui';
  editObj: any;
  @ViewChild('btnShow')
  btnShow!: ElementRef;
  @ViewChild('btnClose')
  btnClose!: ElementRef;
  dataSource: any;
  

  constructor(private store: AngularFirestore) {

  }

  ngOnInit(): void {
    this.getAll();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'dueDay', header: 'Date Due' },
      { field: 'amount', header: 'Amount' }
    ];
  
  }

  getAll() {
    this.store.collection('newObjectTest').snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item =>
        Object.assign({ id: item.payload.doc.id }, item.payload.doc.data())
      );
      this.products = this.dataSource;
      console.log(this.products)
    })
    
  }

  add() {
    if (this.editObj) {
      this.store.collection('newObjectTest').doc(this.editObj.id).update({ 
        name: this.name, 
        dueDay: this.dueDay, 
        amount: this.amount
      });
    } else {
      this.store.collection('newObjectTest').add({ 
        name: this.name, 
        dueDay: this.dueDay, 
        amount: this.amount
       });
    }
    this.closeDialog();
  }

  edit(id: string) {
    this.store.collection('newObjectTest').doc(id).get().subscribe((response) => {
      this.editObj = Object.assign({ id: response.id }, response.data());
      this.name = this.editObj.name;
      this.dueDay = this.editObj.dueDay;
      this.amount = this.editObj.amount
      this.openDialog();
    })
  }

  clearEdit() {
    this.editObj = null;
    this.name = "";
    this.dueDay = "";
    this.amount = "";
  }

  delete(id: string) {
    this.store.collection('list').doc(id).delete();
  }

  openDialog() {
    this.showAddDialog = true;
  }

  closeDialog() {
    this.showAddDialog = false;
  }

}
