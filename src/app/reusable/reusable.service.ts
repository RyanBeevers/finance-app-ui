import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReusableService {

  constructor(private store: AngularFirestore) { }

  deleteGeneratedData(user: string, month: number, year: number): Observable<void> {
    // Delete documents from generatedBills collection
    this.store
      .collection('generatedBills', (ref) =>
        ref.where('user', '==', user).where('month', '==', month).where('year', '==', year)
      )
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });

    // Delete documents from generatedMonths collection
    this.store
      .collection('generatedMonths', (ref) =>
        ref.where('user', '==', user).where('month', '==', month).where('year', '==', year)
      )
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }

}
