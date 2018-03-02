import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpClient) { }

  renderAlbums(): Observable<any> {
    return new Observable(observer => {
      let albums: any = [];

      firebase.database().ref('albums').orderByKey().once('value', (items: any) => {
        items.forEach((item) => {
          albums.push({
            id: item.key,
            fName: item.val().fName,
            lName: item.val().lName,
            phone: item.val().phone,
            photo: item.val().photo
          });
        });
        
        observer.next(albums);
        observer.complete();
      },
        (error) => {
          console.log("firebase Album Error");
          console.dir(error);
          observer.error(error)
        });
    });
  }

  deleteAlbum(id): Promise<any> {
    return new Promise((resolve) => {
      let ref = firebase.database().ref('albums').child(id);
      ref.remove();
      resolve(true);
    });
  }

  addToFirebase(albumObj): Promise<any> {
    return new Promise((resolve) => {
      let addRef = firebase.database().ref('albums');
      addRef.push(albumObj);
      resolve(true);
    });
  }

  updateFirebase(id, albumObj): Promise<any> {
    return new Promise((resolve) => {
      var updateRef = firebase.database().ref('albums').child(id);
      updateRef.update(albumObj);
      resolve(true);
    });
  }

  uploadPhotos(imageString): Promise<any> {
    let photo: string = 'album-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('photos/' + photo);
      parseUpload = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changes', (_snapshot) => {
        console.log('snapshot progress' + _snapshot);
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }
}