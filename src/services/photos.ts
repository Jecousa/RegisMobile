import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class PhotosProvider {

  public cameraImage: String;

  constructor(public http: HttpClient,
    private _CAMERA: Camera) { }

  selectPhoto(): Promise<any> {
    return new Promise(resolve => {
      let cameraOptions: CameraOptions = {
        sourceType: this._CAMERA.PictureSourceType.PHOTOLIBRARY,
        destinationType: this._CAMERA.DestinationType.DATA_URL,
        quality: 100,
        targetWidth: 480,
        targetHeight: 360,
        encodingType: this._CAMERA.EncodingType.JPEG,
        correctOrientation: true
      };

      this._CAMERA.getPicture(cameraOptions)
        .then((data) => {
          this.cameraImage = "data:image/jpeg;base64," + data;
          resolve(this.cameraImage);
        });
    });
  }
}
