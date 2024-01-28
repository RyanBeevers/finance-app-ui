import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { ReusableModule } from '../reusable/reusable.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CarouselModule } from 'primeng/carousel'
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterAccountComponent } from './register-account/register-account.component';
import { RouterModule, Routes } from '@angular/router';
import { PasswordModule } from 'primeng/password';

const routes: Routes  = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-account',
    component: RegisterAccountComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
]

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterAccountComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
    TooltipModule,
    InputSwitchModule,
    CardModule,
    ReusableModule,
    LayoutModule,
    CalendarModule,
    CarouselModule,
    OverlayPanelModule,
    PasswordModule,
    FormsModule,
  ],
  exports: [
    NavbarComponent  
  ],
  providers: [
    DatePipe
  ]
})
export class CoreComponentsModule { }
