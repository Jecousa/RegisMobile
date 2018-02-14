import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { HomePage } from '../home/home';
import { EditAlbum } from '../edit-album/edit-album';

//File Transfer Plugins
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the PhotographerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@Component({
  selector: 'page-photographer',
  templateUrl: 'photographer.html',
})
export class Photographer {

  lastImage: string = null;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad Photographer');
  }
  //Navigation Controls
  onSubmitAlbum(){
      this.navCtrl.push(HomePage);
    }
    onEditAlbum(){
      this.navCtrl.push(EditAlbum);
    }

    //Action Sheet Controls Image Selection
    public photoActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Select An Image ',
          buttons: [
            {
              text: 'Select From Library',
              handler: () => {
                this.useCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
            },
            {
              text: 'Camera',
              handler: () => {
                this.useCamera(this.camera.PictureSourceType.CAMERA);
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
        actionSheet.present();

}

//Actionsheet hidden
public showUpload: boolean = false;

  public onButtonClick() {
      this.showUpload = !this.showUpload;
  }

      //Camera
      public useCamera(sourceType) {
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };

  // Gets image data
  this.camera.getPicture(options).then((imagePath) => {
    // Android Handling
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

//Storing Photos
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}

// Upload to local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

//Display User Messages
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

//File Upload
public submitAlbum() {
  // Destination URL
  var url =  ""; // TODO: update url
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);

  // File name only
  var filename = this.lastImage;

  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };

  const fileTransfer: TransferObject = this.transfer.create();

  this.loading = this.loadingCtrl.create({
    content: 'Photos Are Uploading...',
  });
  this.loading.present();

  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Uploaded Sucessful.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading.');
  });
}
}
