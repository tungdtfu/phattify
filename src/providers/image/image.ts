import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../constants/config';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ImageProvider Provider');
  }

  upLoadImage(listImage) {
    let url = SERVER_URL + 'uploadimages';
    let headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMUI2OTQwMi03RTlDLTRCQTMtOTlBOC02RDg0QTk2RkE4NjYiLCJleHBpcmVzSW4iOjg2NDAwLCJpYXQiOjE1Mjg5NjQxNjAsImV4cCI6MTUyOTA1MDU2MCwiYXVkIjoiaHR0cHM6Ly9waGF0dGlmeW1vYmlsZXNlcnZpY2UuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiaXNzIjoiaHR0cHM6Ly9waGF0dGlmeW1vYmlsZXNlcnZpY2UuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.KzhE4nSLPmd7Zs4xthICG05MkQT-hh-Y78acxaYRhSg');
    const formData = new FormData();
    listImage.map(img => {
      formData.append('fileUpload', img, img.name);
    })

    return Observable.create(observer => {
      this.http.post(url, formData, {headers: headers}).subscribe((result) => {
        observer.next(result);
      });
    })
  }
}
