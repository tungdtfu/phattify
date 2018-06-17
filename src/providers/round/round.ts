import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../constants/config';

/*
  Generated class for the RoundProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoundProvider {

  constructor(public http: HttpClient) {
  }
  getRounDetail() {
    // let url = SERVER_URL + 'round';
    // let headers = new HttpHeaders({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMUI2OTQwMi03RTlDLTRCQTMtOTlBOC02RDg0QTk2RkE4NjYiLCJleHBpcmVzSW4iOjg2NDAwLCJpYXQiOjE1MjkyMjIwNDMsImV4cCI6MTUyOTMwODQ0MywiYXVkIjoiaHR0cHM6Ly9waGF0dGlmeW1vYmlsZXNlcnZpY2UuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiaXNzIjoiaHR0cHM6Ly9waGF0dGlmeW1vYmlsZXNlcnZpY2UuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.p1ZzXPr3el4x2crVyDyQetMwsIzKtw1gnH03T_UdcL8'});
    // return this.http.get(url,{headers : headers});
    return this.http.get('assets/data/round.json');
  }
}
