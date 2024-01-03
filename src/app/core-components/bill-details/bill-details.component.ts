import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrl: './bill-details.component.scss'
})
export class BillDetailsComponent implements OnInit {

  bill: Bill | undefined;
  daysOfTheWeek = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
  ]
  editObj: any;
  saving = false;
  @Output() closeModal = new EventEmitter<boolean>();
  @Input() id: any;
  categories = [
      {
        "label": "Utilities",
        "value": [
          { "value": "Electricity", "label": "Electricity" },
          { "value": "Water", "label": "Water" },
          { "value": "Gas", "label": "Gas" },
          { "value": "Internet", "label": "Internet" },
          { "value": "Cable/Satellite TV", "label": "Cable/Satellite TV" }
        ]
      },
      {
        "label": "Housing",
        "value": [
          { "value": "Rent", "label": "Rent" },
          { "value": "Mortgage", "label": "Mortgage" },
          { "value": "Home Insurance", "label": "Home Insurance" },
          { "value": "Property Taxes", "label": "Property Taxes" },
          { "value": "Home Maintenance", "label": "Home Maintenance" }
        ]
      },
      {
        "label": "Transportation",
        "value": [
          { "value": "Car Loan", "label": "Car Loan" },
          { "value": "Fuel", "label": "Fuel" },
          { "value": "Auto Insurance", "label": "Auto Insurance" },
          { "value": "Public Transit", "label": "Public Transit" },
          { "value": "Parking", "label": "Parking" }
        ]
      },
      {
        "label": "Groceries",
        "value": [
          { "value": "Fruits and Vegetables", "label": "Fruits and Vegetables" },
          { "value": "Dairy Products", "label": "Dairy Products" },
          { "value": "Meat and Poultry", "label": "Meat and Poultry" },
          { "value": "Snacks", "label": "Snacks" },
          { "value": "Non-perishables", "label": "Non-perishables" }
        ]
      },
      {
        "label": "Healthcare",
        "value": [
          { "value": "Medical Insurance", "label": "Medical Insurance" },
          { "value": "Prescriptions", "label": "Prescriptions" },
          { "value": "Doctor Visits", "label": "Doctor Visits" },
          { "value": "Dental Care", "label": "Dental Care" },
          { "value": "Vision Care", "label": "Vision Care" }
        ]
      },
      {
        "label": "Debts",
        "value": [
          { "value": "Credit Card Payments", "label": "Credit Card Payments" },
          { "value": "Personal Loans", "label": "Personal Loans" },
          { "value": "Student Loans", "label": "Student Loans" },
          { "value": "Other Debts", "label": "Other Debts" }
        ]
      },
      {
        "label": "Subscriptions",
        "value": [
          { "value": "Streaming Services", "label": "Streaming Services" },
          { "value": "Magazine/News Subscriptions", "label": "Magazine/News Subscriptions" },
          { "value": "Gym Memberships", "label": "Gym Memberships" },
          { "value": "Software Subscriptions", "label": "Software Subscriptions" }
        ]
      },
      {
        "label": "Entertainment",
        "value": [
          { "value": "Dining Out", "label": "Dining Out" },
          { "value": "Movies/Entertainment", "label": "Movies/Entertainment" },
          { "value": "Hobbies/Activities", "label": "Hobbies/Activities" }
        ]
      },
      {
        "label": "Education",
        "value": [
          { "value": "Tuition", "label": "Tuition" },
          { "value": "School Supplies", "label": "School Supplies" },
          { "value": "Books", "label": "Books" }
        ]
      },
      {
        "label": "Insurance",
        "value": [
          { "value": "Life Insurance", "label": "Life Insurance" },
          { "value": "Disability Insurance", "label": "Disability Insurance" },
          { "value": "Other Insurance Premiums", "label": "Other Insurance Premiums" }
        ]
      },
      {
        "label": "Personal Care",
        "value": [
          { "value": "Haircuts/Beauty", "label": "Haircuts/Beauty" },
          { "value": "Toiletries", "label": "Toiletries" },
          { "value": "Clothing", "label": "Clothing" }
        ]
      },
      {
        "label": "Taxes",
        "value": [
          { "value": "Income Tax", "label": "Income Tax" },
          { "value": "Property Tax", "label": "Property Tax" },
          { "value": "Other Taxes", "label": "Other Taxes" }
        ]
      },
      {
        "label": "Savings",
        "value": [
          { "value": "Emergency Fund Contributions", "label": "Emergency Fund Contributions" },
          { "value": "Retirement Savings", "label": "Retirement Savings" }
        ]
      },
      {
        "label": "Miscellaneous",
        "value": [
          { "value": "Miscellaneous Expenses", "label": "Miscellaneous Expenses" }
        ]
      }
  ];
  selectedCategory: any;
  selectedSubCategory: any;
  subCategories: any;

  constructor(private store: AngularFirestore) {

  }

  ngOnInit(): void {
    if (!this.id)
      this.setDefaultBill();
    else
      this.getBill();
  }

  setDefaultBill() {
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

  getBill() {
    this.store.collection('bill').doc(this.id).get().subscribe((doc) => {
      if (doc.exists) {
        const billData = doc.data();
        this.bill = Object.assign({ id: this.id }, billData) as Bill;
      } else {
        this.closeModal.emit(true);
      }
    }, (error) => {
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
        frequency: this.bill?.frequency ? this.bill?.frequency : 0,
        user: 'RYAN2914'
      });
      setTimeout(() => {
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
        frequency: this.bill?.frequency ? this.bill?.frequency : 0,
        user: 'RYAN2914'
      });

      setTimeout(() => {
        this.saving = false;
        this.closeModal.emit(true);
      }, 500)
    }
  }

  setSubCategories(item:any){
    this.subCategories = item;
  }

}
