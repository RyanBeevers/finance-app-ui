import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core-components/core-services/auth.service';
import { StartDay } from 'src/app/models/startDay';

@Component({
  selector: 'app-week-start-date',
  templateUrl: './week-start-date.component.html',
  styleUrl: './week-start-date.component.scss'
})
export class WeekStartDateComponent implements OnInit {

  user: any | null = null;
  startingDayOfTheWeek: any;
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  selectedDay: any;
  message: string = '';

  constructor(private store: AngularFirestore, private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user) {
        this.user = user;
        console.log(this.user.uid);
        this.getStartDayOfWeek();
      }else{
        this.router.navigate(['/login'])
      }
    });
  }

  getStartDayOfWeek() : any{
    this.store.collection('startDay', ref =>
      ref.where('user', '==', this.user.uid)
        .limit(1)
    ).get().subscribe(querySnapshot => {
      if (!querySnapshot.empty) {
        // Document exists, process data
        const document = querySnapshot.docs[0];
        const data = document.data() as StartDay;
        console.log(data);
        this.startingDayOfTheWeek = data.dayOfTheWeek;
        this.selectedDay = data.dayOfTheWeek;
      }
    }, (error) => {
      console.log('Error:', error);
    });
  }

  saveStartDate(){
    if(!this.selectedDay){
      return;
    }
    let startDay = {
      dayOfTheWeek: this.selectedDay,
      user: this.user.uid
    }
    this.store.collection('startDay').add(startDay)
    .then((docRef) => {
      console.log('Document added with ID: ', docRef.id);
      this.message = 'Successfully added!';
      this.getStartDayOfWeek();
    })
    .catch((error) => {
      this.message = 'Error adding!';
      console.error('Error adding document: ', error);
    });
  }

}
