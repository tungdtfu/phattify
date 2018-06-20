import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../constants/config';
import { Observable } from 'rxjs/Observable';
import { StorageKey } from '../../constants/storage-key.constain';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor(public http: HttpClient) {
  }

  upLoadImage(listImage) {
    let url = SERVER_URL + 'uploadimages';
    let token = localStorage.getItem(StorageKey.loginToken);
    let authdata = 'Bearer ' + token;
    let headers = new HttpHeaders({Authorization: authdata});
    const formData = new FormData();
    listImage.map(img => {
      formData.append('fileUpload', img.img, img.name);
    })

    return Observable.create(observer => {
      this.http.post(url, formData, {headers: headers}).subscribe((result) => {
        observer.next(result);
      });
    })
  }
}
