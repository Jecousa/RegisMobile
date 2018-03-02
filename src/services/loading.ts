import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {

  private loading: any;

  constructor(public http: HttpClient,
  public load: LoadingController) {}

  displayPreloader() : void
   {
      this.loading = this.load.create({
         content: 'Album is Being Created!'
      });

      this.loading.present();
   }

   hidePreloader() : void
   {
      this.loading.dismiss();
   }
}
