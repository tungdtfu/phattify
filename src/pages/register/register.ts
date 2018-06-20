import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Base64 } from "@ionic-native/base64";
import { AddInformationPage } from '../add-information/add-information';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
import { UserProvider } from '../../providers/user/user';
import { LoadingProvider } from '../../providers/loading/loading';
import { ResponseStatus } from '../../constants/response-status.constain';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var b64toBlob: any;
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [ImagePicker, ImageProvider],
})
export class RegisterPage {
  currentUser: any;
  radioOpen: any;
  radioResult: any;
  imgs: any[] = [];
  listImage = {
    profile: 'assets/imgs/default-avatar.png',
    front: 'assets/imgs/default-avatar.png',
    side: 'assets/imgs/default-avatar.png'
  };

  upImageSuccess = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private _platform: Platform,
    private camera: Camera,
    private imageService: ImageProvider,
    private userProvider: UserProvider,
    private base64: Base64,
    private loading: LoadingProvider
  ) {

  }
  showRadio(step) {
    let alert = this.alertCtrl.create();
    let title;
    if (step == 'profile') {
      title = "  Please use Head shot upper body picture"

    } else if (step == 'front') {
      title = " Please use Full length front head to toe picture"
    } else {
      title = " Please use Full length side on picture"
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
        if (this.radioResult == 'library') {
          this.selectFromLibrary().then(img => {
            this.listImage[step] = img.toString();
          })
        } else {
          this.takePhotoOrVideo().then(img => {
            this.listImage[step] = img.toString();
          })
        }
      }
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.userProvider.getCurrentUserDetails().subscribe(res => {
      this.currentUser = res;
    }, () => {
    });
  }

  takePhotoOrVideo() {
    return new Promise((resolve, reject) => {
      const options: CameraOptions = {
        targetHeight: 768,
        targetWidth: 768,
        destinationType: this.camera.DestinationType.DATA_URL,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA
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
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

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

  private makeBase64ToBlob(img) {
    return new Promise((resolve, reject) => {
      if (img.indexOf('data:image/png;base64') > -1) {
        img = img.replace('data:image/png;base64,', '');
        var blob = b64toBlob(img, 'image/png');
        resolve(blob);
      } else {
        this.base64.encodeFile(img).then((base64File: string) => {
          base64File = base64File.replace('data:image/*;charset=utf-8;base64,', '');
          var blob = b64toBlob(base64File, 'image/png');
          resolve(blob);
        }, (err) => {
          console.log(err);
        });
      }
    })
  }

  upImage() {
    this.loading.showLoading();
    let list = [];
    var profile = this.makeBase64ToBlob(this.listImage.profile);
    var front = this.makeBase64ToBlob(this.listImage.front);
    var side = this.makeBase64ToBlob(this.listImage.side);
    Promise.all([profile, front, side]).then(res => {
      list.push({
        img: res[0],
        name: 'profile.png'
      });
      list.push({
        img: res[1],
        name: 'front.png'
      });
      list.push({
        img: res[2],
        name: 'side.png'
      });
      this.imageService.upLoadImage(list).subscribe(res => {
        this.loading.hideLoading();
        if (res['status'] == ResponseStatus.error) {
          this.loading.showToast(res['message']);
        } else {
          this.successImage();
          this.upImageSuccess = true;
        }
      })
    })
  }

  addInformation() {
    this.navCtrl.push(AddInformationPage);
  }

  Continue() {
    this.navCtrl.setRoot(TabsPage)
  }

  showImageBase64(imageData) {
    return imageData;
  }

  disabledTakeProfile() {
    for (let key in this.listImage) {
      if (this.listImage[key] == 'assets/imgs/default-avatar.png')
        return true;
    }

    return false;
  }

  successImage() {
    let method = this.alertCtrl.create({
      message: 'Your images have been saved successfully, please tap "Continue" to start using the app',
      buttons: [
        {
          text: 'OK',
          cssClass: 'method-color',
          handler: () => {
            console.log('OK clicked');
          }
        }
      ]
    });
    method.present()
  }
}
