import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {
    this.logout();
  }
  
  logout() {
    this.authService.signOut()

    // this.afAuth.signOut().then(() => {
      // console.log('User logged out successfully');
      setTimeout(()=>{
        this.router.navigate(['/login']);
      }, 1000)
      
    // }).catch((error) => {
    //   console.error('Error during logout:', error);
    // });
  }

}
