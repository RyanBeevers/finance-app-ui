import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserInfo } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user: UserInfo | null = null;

  constructor(private router: Router, private afAuth: AngularFireAuth){
    this.afAuth.user.subscribe((user) => {
      if (user) {
        // User is signed in
        this.user = user;
        console.log('User information:', user);
        if (this.router.url.indexOf('login') !== -1 && this.user) {
          this.goToViewCalendar();
        }
      } else {
        this.goToLogin();
        // No user signed in
        this.user = null;
      }
    });
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

  goToLogout(){
    this.router.navigate(['/logout'])
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
}
