import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../constants/config';
import { Observable } from 'rxjs/Observable';
import { ResponseStatus } from '../../constants/response-status.constain';
import { StorageKey } from '../../constants/storage-key.constain';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  jwtHelper = new JwtHelper();

  constructor(public http: HttpClient, private storage: Storage) {
  }

  login(email, password) {
    let url = SERVER_URL + 'login';
    let params = {
      email: email,
      password: password
    }
    return Observable.create(observer => {
      this.http.post(url, params).subscribe(res => {
        let status = res['status'];
        if (status === ResponseStatus.error) {
          observer.next(status);
          return;
        }
        let token = res['token'];
        var user = this.jwtHelper.decodeToken(token);
        this.storage.set(StorageKey.userDetails, user)
        localStorage.setItem(StorageKey.loginToken, token);
        observer.next(status);
      }, err => {
        observer.error(err);
      });
    });
  }

  register(model) {
    let url = SERVER_URL + 'register';
    return Observable.create(observer => {
      this.http.post(url, model).subscribe(res => {
        let status = res['status'];
        if (status === ResponseStatus.error) {
          observer.next(status);
          return;
        }
        localStorage.setItem(StorageKey.loginToken, res['token']);
        observer.next(status);
      }, err => {
        observer.error(err);
      });
    });
  }


  getCurrentUserDetails() {
    return this.storage.get(StorageKey.loginToken);
  }

  refreshToken() {
    let url = SERVER_URL + 'refreshtoken';
    let token = localStorage.getItem(StorageKey.loginToken);
    if(!token){
      return Observable.create(observer => {
        observer.error();
      })
    }
    let authdata = 'Bearer ' + token;
    return Observable.create(observer => {
      this.http.get(url, { headers: { 'Authorization': authdata } }).subscribe(res => {
        let status = res['status'];
        if (status === ResponseStatus.error) {
          localStorage.clear();
          observer.next(status);
          return;
        }
        localStorage.setItem(StorageKey.loginToken, res['token']);
        observer.next(status);
      }, err => {
        observer.error(err);
      });
    });
  }
}
