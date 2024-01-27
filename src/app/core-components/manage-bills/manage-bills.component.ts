import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/login/auth.service';
import { Bill } from 'src/app/models/bill';
import { UserService } from 'src/app/user.service';

interface Column {
  field: string;
  header: string;
}
export interface AllBillsResponse {
  id: string;
  data: Bill;
}

@Component({
  selector: 'app-manage-bills',
  templateUrl: './manage-bills.component.html',
  styleUrl: './manage-bills.component.scss'
})
export class ManageBillsComponent {

  listOfBills: AllBillsResponse[] = [];
  name: any;
  dueDay: any;
  amount: any;
  showAddDialog = false;
  products!: any[];
  cols!: Column[];
  editObj: any;
  dataSource: any;
  editId: any;
  deleteId: any;
  showDeleteDialog = false;

  user: any | null = null;

  constructor(private store: AngularFirestore, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log(this.user.uid);
    });
    this.getAll();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'dueDay', header: 'Due Date' },
      { field: 'amount', header: 'Amount' },
      { field: 'actions', header: 'Actions' },
      { field: 'details', header: 'Details' }
    ];
  }

  getAll() {
    this.store.collection('bill').snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item => {
        const data = item.payload.doc.data() as Bill[];
        return { id: item.payload.doc.id, data };
      });
      this.listOfBills = this.dataSource;
      this.listOfBills.sort((a,b) => a.data.dueDay - b.data.dueDay);
      for(let bill of this.listOfBills){
        bill.data.id = bill.id;
      }
    });
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
    this.editId = id;
    this.openDialog();
  }

  clearEdit() {
    this.editObj = null;
    this.name = "";
    this.dueDay = "";
    this.amount = "";
    this.editId = undefined;
    this.closeDialog();
  }
  
  confirmDelete(id: string){
    this.deleteId = id;
    this.showDeleteDialog = true;
  }

  delete() {
    this.store.collection('bill').doc(this.deleteId).delete();
    this.showDeleteDialog = false;
    this.deleteId = undefined;
  }

  openDialog() {
    this.showAddDialog = true;
  }

  closeDialog() {
    this.showAddDialog = false;
    this.getAll();
  }

}
