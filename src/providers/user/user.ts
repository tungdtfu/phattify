import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../constants/config';
import { Observable } from 'rxjs/Observable';
import { ResponseStatus } from '../../constants/response-status.constain';
import { StorageKey } from '../../constants/storage-key.constain';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import { ApiProvider } from '../api/api';
import { LocalStorageProvider } from '../local-storage/local-storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  jwtHelper = new JwtHelper();

  constructor(public http: HttpClient, private storage: Storage, private _apiProvider: ApiProvider, private _localStorage: LocalStorageProvider) {
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
        localStorage.setItem(StorageKey.loginToken, res['token']);
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
    return Observable.create(observer => {
      this.storage.get(StorageKey.userDetails).then(details => {
        if (details) {
          observer.next(details);
          return;
        }
        let token = localStorage.getItem(StorageKey.loginToken);
        if(!token){
          observer.error(null);
          return;
        }
        let authdata = 'Bearer ' + token;
        this.http.get(`${SERVER_URL}user`, { headers: { 'Authorization': authdata } }).subscribe(res => {
          if (res['status'] == ResponseStatus.error) {
            observer.error(null);
          } else {
            this.storage.set(StorageKey.userDetails, res['data']);
            observer.next(res['data']);
          }
        }, err => {
          observer.error(err);
        });
      })
    })
  }

  refreshToken() {
    let url = SERVER_URL + 'refreshtoken';
    let token = localStorage.getItem(StorageKey.loginToken);
    if (!token) {
      localStorage.clear();
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

  getlistContact() {
    let url = SERVER_URL + 'userclient';
    let objObs = new Observable(obs => {
      let token = localStorage.getItem(StorageKey.loginToken);
      if (!token) {
        localStorage.clear();
        obs.error();
      }
      let authdata = 'Bearer ' + token;

      this.http.get(url, { headers: { 'Authorization': authdata } }).subscribe(res => {
        let status = res['status'];
        if (status === ResponseStatus.success) {
          obs.next(res);
        } else {
          localStorage.clear();
          obs.error(res);
        }
      }, err => {
        obs.error(err);
      });
    })

    return objObs;
  }
}
