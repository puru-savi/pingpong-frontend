import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { PingPong } from '../_models/pingpong';
import { API_URL } from './globals';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  // register(user: User) {
  //   return this.http.post(`/users/register`, user);
  // }

  // delete(id: number) {
  //   return this.http.delete(`/users/${id}`);
  // }
}
