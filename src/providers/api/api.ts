import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKey } from '../../constants/storage-key.constain';

import 'rxjs/add/operator/map';
import { API_Socket } from "../../constants/config";
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

  getHeader() {
    let token = localStorage.getItem(StorageKey.loginToken);
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  requestGet(url) {
    return this.http.get(url, { headers: this.getHeader() });
  }

  getListConversation(user_id, group_id, friend_id, login_token) {
    if (!group_id) {
      group_id = '';
    }
    let data = {
      user_id: user_id,
      group_id: group_id,
      friend_id: friend_id
    };

    // if (group_id) {
    //   data.group_id = group_id;
    // }
    // else {
    //   data.friend_id = friend_id;
    // }
    let headers = new Headers({ 'Accept': 'application/json' });
    //headers.append('login_token', login_token);
    let url = API_Socket + 'get-info-group';
    return this.http.post(url, data)
      .map((res: any) => res.json());
  }

  getListGroupChat(user_id, login_token) {
    let data = {
      user_id: user_id
    }
    let headers = new Headers({ 'Accept': 'application/json' });
    //headers.append('login_token', login_token);
    let url = API_Socket + 'get-list-group-of-user';
    return this.http.post(url, data)
      .map((res: any) => res.json());
  }
}
