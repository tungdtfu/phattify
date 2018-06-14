import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {
  }

  public static authenticated() {
    return tokenNotExpired('/_ionickv/token');
  }

}
