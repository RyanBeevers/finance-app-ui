import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'finances-app-ui';
  editObj: any;
  personalInfo: any;
  @ViewChild('btnShow')
  btnShow!: ElementRef;
  @ViewChild('btnClose')
  btnClose!: ElementRef;
  dataSource: any;
  name: any;

  constructor(private store: AngularFirestore) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.store.collection('userInfo').snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item =>
        Object.assign({ id: item.payload.doc.id }, item.payload.doc.data())
      );
    })
  }

  add() {
    if (this.editObj) {
      this.store.collection('userInfo').doc(this.editObj.id).update({ name: this.name, personalInfo: this.personalInfo });
    } else {
      this.store.collection('userInfo').add({ name: this.name, personalInfo: this.personalInfo });
    }
    this.closeDialog();
  }

  edit(id: string) {
    this.store.collection('userInfo').doc(id).get().subscribe((response) => {
      this.editObj = Object.assign({ id: response.id }, response.data());
      this.name = this.editObj.name;
      this.personalInfo = this.editObj.personalInfo;
      this.openDialog();
    })
  }

  clearEdit() {
    this.editObj = null;
    this.name = "";
    this.personalInfo = "";
  }

  delete(id: string) {
    this.store.collection('list').doc(id).delete();
  }

  openDialog() {
    this.btnShow.nativeElement.click();
  }

  closeDialog() {
    this.btnClose.nativeElement.click();
  }

}
