import { Injectable, OnInit } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { map, from, Observable, tap } from 'rxjs';
import { IUser } from '../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  currentUser$: Observable<any> = authState(this.auth);
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  userRef = collection(this.fs, 'users');


  constructor(
    private auth: Auth,
    private fs: Firestore
    ) { }

  ngOnInit(): void {
  }

  addUser(): void {
    this.currentUser$ = authState(this.auth);
  }

  login$(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register$(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(signOut(this.auth));
  }

  getUserById (userId: string) {
    
  }

  //TODO
  // addUser() {
  //   authState(this.auth).pipe(tap);
  // }
}

