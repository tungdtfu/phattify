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
        this.storage.set(StorageKey.loginToken, token).then(() => {
          var user = this.jwtHelper.decodeToken(token).username;
          debugger
          observer.next(status);
        });
      }, err => {
        observer.error(ResponseStatus.error);
      });
    });
  }

  getCurrentUserDetails() {
    return this.storage.get(StorageKey.loginToken);
  }
}
