import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { User } from '../_models';
import { API_URL } from './globals';
import { PingPong } from '../_models/pingpong';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userName: string, password: string) {
    return this.http.post<any>(API_URL + '/login', { userName, password }).pipe(
      map((user) => {
        // store user details jwt token in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  getPpMatch(inputStr: string) {
    const options = inputStr
      ? { params: new HttpParams().set('input', inputStr) }
      : {};

    return this.http.get<PingPong[]>(API_URL + '/ppmatch', options).pipe(
      map((pingPong) => {
        // store pingPong details jwt token in localStorage
        return pingPong;
      })
    );
  }

  shutdown() {
    return this.http.get<any>(API_URL + '/shutdown').pipe(
      map(() => {
        return 'user';
      })
    );
  }

  // shutdown() {
  //   return this.http.get(API_URL + '/shutdown').subscribe( return "");
  // }
}
