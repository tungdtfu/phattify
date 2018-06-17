import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LocalStorageProvider Provider');
  }

  setItem (key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
 
  getItem (key: string) {
    let result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }
 
  delete (key: string) {
    localStorage.removeItem(key);
  }
 
  clear () {
    localStorage.clear();
  }
}
