import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-list-favourite',
  templateUrl: 'list-favourite.html'
})
export class ListFavouritePage {

  constructor(private navCtrl: NavController) {

    console.log('Hello ListFavouritePage Page');

  }

  ionViewDidLoad() {
  
  }

}

