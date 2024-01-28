import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManageIncomeComponent } from './manage-income/manage-income.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
  {
    path: '',
    component: ManageIncomeComponent
  }
]

@NgModule({
  declarations: [
    ManageIncomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    FormsModule,
    DropdownModule,
    TableModule,
    CalendarModule,
    InputTextModule
  ],
  providers: [
    DatePipe
  ]
})
export class IncomeModule { }
