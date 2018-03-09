import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database"; 
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afd: AngularFireDatabase) { }
 
  getCustomers() {
    return this.afd.list('/customer/');
  }
 
  addCustomer(fName, lName, phone) {
    this.afd.list('/customer/').push({fName, lName, phone});
  }
 
  removeCustomer(id) {
    this.afd.list('/customer/').remove(id);
  }
}