import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../constants/config';
import { ApiProvider } from '../api/api';
import { Observable } from 'rxjs/Observable';
import { ResponseStatus } from '../../constants/response-status.constain';
import { StorageKey } from '../../constants/storage-key.constain';

/*
  Generated class for the RoundProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoundProvider {

  constructor(public http: HttpClient, private _apiProvider: ApiProvider) {
  }

  getRounDetail() {
    return this._apiProvider.requestGet(`${SERVER_URL}round`);
  }

  getRoundByUserId (userId) {
    return this._apiProvider.requestGet(`${SERVER_URL}rounddetails?roundId=${userId}`);
  }
 
  creatCurrentWeight (currentWeight,roundId){
    let url = SERVER_URL + 'rounddetails';
    let token = localStorage.getItem(StorageKey.loginToken);
    if (!token) {
      localStorage.clear();
      return Observable.create(observer => {
        observer.error();
      })
    }
    let authdata = 'Bearer ' + token;
    let params = {
      currentWeight: currentWeight,
      roundId: roundId
    }
    return Observable.create(observer => {
      this.http.post(url,  params,{ headers: { 'Authorization': authdata }}).subscribe(res => {
        let status = res['status'];
        observer.next(status);
      }, err => {
        observer.error(err);
      });
    });
  }
  updateCurrentWeight (currentWeight,roundId){
    let url = SERVER_URL + 'rounddetails';
    let token = localStorage.getItem(StorageKey.loginToken);
    if (!token) {
      localStorage.clear();
      return Observable.create(observer => {
        observer.error();
      })
    }
    let authdata = 'Bearer ' + token;
    let params = {
      currentWeight: currentWeight,
      id: roundId
    }
    return Observable.create(observer => {
      this.http.patch(url, params,{ headers: { 'Authorization': authdata }}).subscribe(res => {
        let status = res['status'];
        observer.next(status);
      }, err => {
        observer.error(err);
      });
    });
  }





}
