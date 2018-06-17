import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HealthyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HealthyProvider {

  constructor(public http: HttpClient) {
  }

  getBmi(weight,height){
    return Number(( weight / (height * height) ).toFixed(2))
  }

  getDefaultHeightChart () {
    let result = [];
    for (let i = 0; i < 200; i += 25) {
      result.push(i);
    }
    return result;
  }
}
