import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AuthProvider } from '../../providers/auth'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthProvider) {
  }

  onSignup(form: NgForm){
    this.authService.signup(form.value.email, form.value.password)
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }

}
