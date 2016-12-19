import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './user';
import './rxjs-operators';

const API = 'http://localhost:3000/users'

@Injectable()
export class UserManagerService {

  users: User[] = [];

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get(API).toPromise().then(
      res => {
        let users = res.json();
        console.warn(users)
        return users
      }).catch(res => console.warn(res));
  }

}
