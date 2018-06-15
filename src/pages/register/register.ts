import { Component, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AddInformationPage } from '../add-information/add-information';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var window: any;
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [ImagePicker, ImageProvider],
})
export class RegisterPage {
  currentUser: any;
  @Output() attachments = new EventEmitter<any>();
  radioOpen: any;
  radioResult: any;
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
    private userProvider: UserProvider
  ) {
  }
  showRadio(step) {
    let alert = this.alertCtrl.create();
    let title;
    if (step == 'profile') {
      title = "Lightsaber color1"
    } else if (step == 'front') {
      title = "Lightsaber color2"
    } else {
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
    this.userProvider.getCurrentUserDetails().then(res => {
      this.currentUser = res;
    })
  }

  emitAttachment() {
    this.attachments.emit(this.imgs);
  }

  takePhotoOrVideo() {
    console.log("ad")
    return new Promise((resolve, reject) => {
      const options: CameraOptions = {
        targetHeight: 768,
        targetWidth: 768,
        destinationType: this.camera.DestinationType.FILE_URI,
        mediaType: this.camera.MediaType.ALLMEDIA
      }
      this.camera.getPicture(options).then((img) => {
        resolve(img);
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
        destinationType: this.camera.DestinationType.FILE_URI,
        mediaType: this.camera.MediaType.ALLMEDIA,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      let photoExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
      this.camera.getPicture(options).then((img) => {
        resolve(img);
      }, (err) => {
        reject(err);
      });
    })
  }
  private makeFileIntoBlob(_imagePath: string, name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {
        fileEntry.file((resFile) => {
          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: resFile.type });
            imgBlob.name = name;
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  upImage() {
    let list = [];
    this.makeFileIntoBlob(this.listImage['profile'], 'profile.png').then(img => {
      list.push(img);
      this.makeFileIntoBlob(this.listImage['front'], 'front.png').then(img => {
        list.push(img);
        this.makeFileIntoBlob(this.listImage['side'], 'side.png').then(img => {
          list.push(img);
          console.log(list);
          this.imageService.upLoadImage(list).subscribe(result => {
            console.log(result);
          })
        })
      })
    })
  }
  addInformation() {
    this.navCtrl.push(AddInformationPage);
  }
}
