import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../constants/config';
import { ApiProvider } from '../api/api';

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
}
