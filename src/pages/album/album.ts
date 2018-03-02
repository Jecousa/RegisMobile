import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage} from 'ionic-angular';
import {  FormBuilder, FormGroup, Validators } from "@angular/forms";

//File Transfer Plugins
import {LoadingProvider} from '../../services/loading';
import { FirebaseProvider } from '../../services/firebase';
import { PhotosProvider } from '../../services/photos';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class Album {

  public form: any;
  public albumImage: any;
  public albums: any;
  public albumPhoto: any = '';
  public albumfName: any = '';
  public albumlName: any = '';
  public albumphone: any = '';
  public albumId: string = '';
  public isEditable: boolean = false;
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _IMG: PhotosProvider,
    private _DB: FirebaseProvider,
    private _FB: FormBuilder,
    private _LOADER: LoadingProvider,
    public viewCtrl: ViewController) {

    this.form = _FB.group({
      'fName': ['', Validators.required],
      'lName': ['', Validators.required],
      'phone': ['', Validators.required],
      'photo': ['', Validators.required]
    });

    this.albums = firebase.database().ref('albums/');

    if (navParams.get('isEdited')) {
      let album = navParams.get('album');

      this.albumfName = album.fName;
      this.albumlName = album.lName;
      this.albumphone = album.phone;
      this.albumImage = album.photo;
      this.albumPhoto = album.photo;
      this.albumId = album.id;

      this.isEditable = true;
    }
  }

  //Saving Data
  onSubmitAlbum(val) {

    

    let fName: string = this.form.controls["fName"].value,
      lName: string = this.form.controls["lName"].value,
      phone: number = this.form.controls["phone"].value,
      photo: string = this.albumImage;
    if (this.isEditable) {

      if (photo !== this.albumPhoto) {

        this._DB.uploadPhotos(photo)
          .then((snapshot: any) => {
            let uploadedPhoto: any = snapshot.downloadURL;

            this._DB.updateFirebase(this.albumId, {
              fName: fName,
              lName: lName,
              phone: phone,
              photo: uploadedPhoto
            })
            .then((data) => {
              
            });
          });
      }
      else {
        this._DB.updateFirebase(this.albumId, {
          fName: fName,
          lName: lName,
          phone: phone
        })
        .then((data) => {
          
        });
      }
    }
    else {
      this._DB.uploadPhotos(photo)
        .then((snapshot: any) => {
          let uploadedPhoto: any = snapshot.downloadURL;

          this._DB.addToFirebase({
            fName: fName,
            lName: lName,
            phone: phone,
            photo: uploadedPhoto
          })
            .then((data) => {
              
            });
        });

    }
   /* this.closeModal(true);*/
  }
  
 /*closeModal(val = null) {
    this.viewCtrl.dismiss(val);
  }*/

  selectPhoto() {
    this._IMG.selectPhoto()
      .then((data) => {
        this.albumImage = data;
      });
  }
}
