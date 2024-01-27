// user.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  // uid: A unique identifier for the user.
  // displayName: The display name of the user (if set).
  // email: The email address of the user (if using email/password authentication).
  // photoURL: The URL of the user's profile picture (if set).
  // emailVerified: A boolean indicating whether the user's email has been verified.
  // phoneNumber: The phone number associated with the user (if set).
  // providerId: The authentication provider ID (e.g., 'google.com', 'facebook.com').
  // metadata: Metadata associated with the user, such as creation time and last sign-in time.
  // providerData: An array of UserInfo objects containing information about the user's linked accounts.

  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  updateUser(user: any | null) {
    this.userSubject.next(user);
  }
}
