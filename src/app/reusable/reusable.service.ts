import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Paycheck, PaycheckResponse } from '../core-components/manage-income/manage-income.component';

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

  // Define the function to retrieve and convert paychecks
  getPaychecks(user: string): Observable<PaycheckResponse[]> {
    return this.store.collection('paychecks', (ref) =>
      ref.where('user', '==', user)
    ).snapshotChanges().pipe(
      map((response) => {
        return response.map((item) => {
          let data = item.payload.doc.data() as Paycheck;
          if (data.payStartDate instanceof Object) {
            //@ts-ignore
            const timestampSeconds = data.payStartDate['seconds'] * 1000;
            data.payStartDate = new Date(timestampSeconds);
          }
          return { id: item.payload.doc.id, data } as PaycheckResponse; // Cast to Paycheck
        });
      })
    );
  }

}
