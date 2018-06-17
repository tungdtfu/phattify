import moment from 'moment';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatetimeProvider {
  constructor(
 
  ) {
  }
  dateFormat(date){
    return moment(date);
  }
 dateFormatRound(date){
   return moment(date).format('LL');
 }
 subDate(startDate,endDate){
   //debugger
  //return moment.utc(moment(endDate).diff(moment(startDate))).format("dd")
  return parseInt(new Date(moment(endDate).diff(moment(startDate))).getTime().toString()) /86400000 ;
 }
}
