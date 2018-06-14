import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../constants/config';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  constructor(public http: HttpClient) {
  }

  getCountries() {
    let url = SERVER_URL + 'country';
    return this.http.get(url);
  }

}
