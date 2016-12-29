import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ListBirthday page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-birthday',
  templateUrl: 'list-birthday.html'
})
export class ListBirthdayPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ListBirthdayPage Page');
  }

}
