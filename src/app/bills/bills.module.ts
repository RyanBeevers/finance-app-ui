import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { ManageBillsComponent } from './manage-bills/manage-bills.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [
  {
    path: '',
    component: ManageBillsComponent
  }
]

@NgModule({
  declarations: [
    BillDetailsComponent,
    ManageBillsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonModule,
    DialogModule,
    TableModule,
    InputNumberModule,
    FormsModule,
    DropdownModule
  ],
  exports: [
    ManageBillsComponent
  ],
  providers: [
    DatePipe
  ]
})
export class BillsModule { }
