import { Component, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform  } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from "@ionic-native/base64";
import { AddInformationPage } from '../add-information/add-information';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
import { LoadingProvider } from '../../providers/loading/loading';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var window : any;
declare var b64toBlob: any;
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers:[ImagePicker, ImageProvider],
})
export class RegisterPage {
  @Output() attachments = new EventEmitter<any>();
  radioOpen : any;
  radioResult : any;
  imgs: any[] = [];
  listImage = {
    profile: 'assets/imgs/default-avatar.png', 
    front: 'assets/imgs/default-avatar.png',
    side: 'assets/imgs/default-avatar.png'
  };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private _platform: Platform,
    private camera: Camera,
    private imageService: ImageProvider,
    private base64: Base64,
    private sanitizer: DomSanitizer,
    private loading: LoadingProvider
  ) {
  }
  showRadio(step) {
    let alert = this.alertCtrl.create();
    let title; 
    if(step== 'profile'){
      title = "Lightsaber color1"
    } else if(step == 'front'){
      title = "Lightsaber color2"
    }else {
      title = "Lightsaber color3"
    }
    alert.setTitle(title);
    alert.addInput({
      type: 'radio',
      label: 'Your Library',
      value: 'library',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Your Camera',
      value: 'camera',
      checked: false
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.radioOpen = false;
        this.radioResult = data;
        if(this.radioResult == 'library'){
          this.selectFromLibrary().then(img => {
            this.listImage[step] = img.toString();
          })
        }else{
          this.takePhotoOrVideo().then(img => { 
            this.listImage[step] = img.toString();
          })
        }
      }
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  emitAttachment() {
    this.attachments.emit(this.imgs);
  }
  takePhotoOrVideo() {
    return new Promise((resolve, reject) => {
      const options: CameraOptions = {
        targetHeight: 768,
        targetWidth: 768,
        destinationType: this.camera.DestinationType.DATA_URL,
        mediaType: this.camera.MediaType.ALLMEDIA
      }
      this.camera.getPicture(options).then((img) => {
        resolve(`data:image/png;base64,${img}`);
      }, (err) => {
        reject(err);
      });
    })
  }

  selectFromLibrary() {
    return new Promise((resolve, reject) => {
      let isAndroid = this._platform.is('android');
      const options: CameraOptions = {
        targetHeight: 768,
        targetWidth: 768,
        destinationType: this.camera.DestinationType.DATA_URL,
        mediaType: this.camera.MediaType.ALLMEDIA,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      let photoExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
      this.camera.getPicture(options).then((img) => {
        if (isAndroid) {
          resolve(img);
        } else {
          resolve(`data:image/png;base64,${img}`);
        }
      }, (err) => {
        reject(err);
      });
    })
  }

  private makeBase64ToBlob (img) {
    return new Promise((resolve, reject) => {
      if (img.indexOf('data:image/png;base64') > -1) {
        img = img.replace('data:image/png;base64,', '');
        var blob = b64toBlob(img, 'image/png');
        resolve(URL.createObjectURL(blob));
      } else {
        this.base64.encodeFile(img).then((base64File: string) => {
          base64File = base64File.replace('data:image/*;charset=utf-8;base64,', '');
          var blob = b64toBlob(base64File, 'image/png');
          resolve(URL.createObjectURL(blob));
        }, (err) => {
          console.log(err);
        });
      }
    })
  }

  upImage () {
    this.loading.showLoading();
    let list = [];
    this.makeBase64ToBlob(this.listImage.profile).then(img => {
      list.push({
        img: this.makeBase64ToBlob(this.listImage.profile),
        name: 'profile.png'
      });
      this.makeBase64ToBlob(this.listImage.front).then(img => {
        list.push({
          img: this.makeBase64ToBlob(this.listImage.front),
          name: 'front.png'
        });
        this.makeBase64ToBlob(this.listImage.side).then(img => {
          list.push({
            img: this.makeBase64ToBlob(this.listImage.side),
            name: 'side.png'
          });
          this.imageService.upLoadImage(list).subscribe(result => {
            this.loading.hideLoading();
            console.log(result);
          })
        })
      })
    })
  }
  addInformation(){
    this.navCtrl.push(AddInformationPage);
  }
  showImageBase64 (imageData) {
    return imageData;
    // return this.sanitizer.bypassSecurityTrustResourceUrl(imageData);
  }
  disabledTakeProfile () {
    for (let key in this.listImage) {
      if (this.listImage[key] == 'assets/imgs/default-avatar.png')
        return true;
    }

    return false;
  }
}
