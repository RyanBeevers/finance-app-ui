import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router){
  }

  goToHome(){
    this.router.navigate(['/'])
  }

  goToManageBills(){
    this.router.navigate(['/manage-bills'])
  }

  goToViewCalendar(){
    this.router.navigate(['/view-calendar'])
  }

  goToGenerateExcel(){
    this.router.navigate(['/generate-excel'])
  }

  goToManageInome(){
    this.router.navigate(['/manage-income'])
  }

}
