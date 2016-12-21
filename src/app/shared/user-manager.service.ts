import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './user';
import './rxjs-operators';

const API = 'http://localhost:3000/users'

@Injectable()
export class UserManagerService {

  //users: User[] = [];

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get(API).toPromise().then(
      res => {
        let users = res.json();
        console.warn(users)
        return users
      }).catch(res => console.warn(res));
  }

  //juste modif
  save(idUser: number, majData: any): Promise<User> {
    //user existant    
    if (idUser != null) {
      return this.http.put(`${API}/${idUser}`, majData).toPromise()
        .then(res => {
          let majUser = res.json();
          //renvoi du user modifié
          return majUser;
        });
    }
  }

}
