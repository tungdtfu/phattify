import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKey } from '../../constants/storage-key.constain';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  getHeader () {
    let token = localStorage.getItem(StorageKey.loginToken);
    return new HttpHeaders({Authorization: `Bearer ${token}`});
  }

  requestGet (url) {
    return this.http.get(url,{headers : this.getHeader()});
  }
}
