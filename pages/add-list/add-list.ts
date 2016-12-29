import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the AddList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-list',
  templateUrl: 'add-list.html'
})
export class AddListPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AddListPage Page');
  }

}
