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

  ngOnInit(){
      this.places = [];
       this.sql.query("SELECT value FROM kv", [])
        .then(
          (data) => {
            console.log(data);
            // var templaces: Array<Object> = [];
            if(data.res.rows.length > 0) {
               for(let i = 0; i < data.res.rows.length; i++) {
                  var place = JSON.parse(data.res.rows.item(i).value);
                  console.log(place);
                  this.places.push(place);
              /*    (place) => {
                    templaces.push(place)};
               }
               */
               }
               //this.places = templaces;
               console.log(this.places);
            };
            
          })
          .catch(
            (error) => {
              console.error('Error:' + error);
          });
  }

  ionViewDidLoad() {
  
  }

}
