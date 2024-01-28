import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from  '@angular/fire/compat';
import { AngularFirestoreModule } from  '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreComponentsModule } from './core-components/core-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAVf-yKI4bx7F8Go9XHqC8oI_nfbksXMB0",
      authDomain: "finance-app-ui-c8539.firebaseapp.com",
      projectId: "finance-app-ui-c8539",
      storageBucket: "finance-app-ui-c8539.appspot.com",
      messagingSenderId: "878790212670",
      appId: "1:878790212670:web:e38482da5c7d28a7e2e56f",
      measurementId: "G-RSR4LHZCY6"
    }),
    AngularFirestoreModule,
    RouterModule.forRoot([]),
    CoreComponentsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
