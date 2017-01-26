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

  search(name: string, codename: string, idUser?: number): Promise<User> {
    console.log("search");
    let paramId = (idUser == null) ? '' : `&id_ne=${idUser}`
    return this.http.get(`${API}?name=${name}&codename=${codename}${paramId}`)
      .debounceTime(300) // wait for 300ms pause in events
      .distinctUntilChanged()
      .first()
      .toPromise().then(res => {
        let searchUser = res.json();
        console.log(searchUser);
        return searchUser;
      });
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
