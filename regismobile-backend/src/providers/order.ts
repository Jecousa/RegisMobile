import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database"; 
import * as firebase from 'firebase';

@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient,
    public afd: AngularFireDatabase) { }

  getOrder() {
    return this.afd.list('/order/');
  }
 
  addOrder(photoSel, product, quantity) {
    this.afd.list('/order/').push({photoSel, product, quantity});
  }
 
  removeOrder(id) {
    this.afd.list('/order/').remove(id);
  }

}

