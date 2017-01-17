import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ListService} from '../../services/list.service';
import {ListDetailPage} from '../list-detail/list-detail';
import { Sql } from '../../providers/sql';

@Component({
  selector: 'page-list-favourite',
  templateUrl: 'list-favourite.html',
  providers: [[ListService],[Sql]]
})
export class ListFavouritePage {

  public places: Array<Object>;
  constructor(private navCtrl: NavController, private listService: ListService, private sql: Sql) {
    this.sql = sql;
    console.log('Hello ListFavouritePage Page');
  }

  ionViewDidEnter(){
    this.getFavData();
  }

  getFavData() {
    this.places = [];
       this.sql.query("SELECT value FROM kv_fav", [])
        .then(
          (data) => {
            console.log(data);
            if(data.res.rows.length > 0) {
               for(let i = 0; i < data.res.rows.length; i++) {
                  var place = JSON.parse(data.res.rows.item(i).value);
                  console.log(place);
                  this.places.push(place);
               }
               console.log(this.places);
            };
            
          })
          .catch(
            (error) => {
              console.error('Error:' + error);
          });
  }

  itemTapped(event, place) {
        console.log('Item tap from list fav:' + place);  
        this.navCtrl.push(ListDetailPage, {
            place: place,
            showFavButton: false,
            showDelButton: true
        });
    }

  ionViewDidLoad() {
  }

}

