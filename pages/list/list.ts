import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {ListService} from '../../services/list.service';
import {ListDetailPage} from '../list-detail/list-detail';
import { Sql } from '../../providers/sql';

/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [ListService]
})
export class ListPage {
   places: Array<any>;
   nearbyzips: Array<any> = [];
  constructor(private navCtrl: NavController, private listService: ListService, private sql: Sql) {
     }
  
  ngOnInit(){
        this.listService.getList().subscribe(data => {
            this.places = data;
            console.log(data);
        });
        //this.sql.set('mylist', 'testlist');
        //this.sql.get('mylist').then((val) => {
        //console.log('My Value is' + val);
        //})  
    }

  /*
  searchPlaces(event) {
     if(event.target.value.length > 3) {
            this.listService.searchPlace(event.target.value).subscribe(
                data => {
                    this.places = data; 
                    console.log('Searched data' + data);
                },
                err => {
                    console.log(err);
                },
                () => console.log('Place Search Complete')
            );
      }
     if(event.target.value.length < 1) {
            this.listService.getList().subscribe(data => {
            this.places = data;
            console.log('Loading initial view again...');
        });
      }
    }
    */

    searchNearbyZip(event) {
     if(event.target.value.length > 3) {
            var pin = event.target.value;
            this.listService.searchNearbyZip(event.target.value)
            .subscribe(
                data => {

                 if(data.postalCodes != undefined){
                    this.nearbyzips = [];
                    //console.log(data.postalCodes);
                    var len = data.postalCodes.length;
                    if(len > 0) {
                        for(let i = 0; i < len; i++) {
                        var zip = JSON.parse(data.postalCodes[i].postalCode);
                        this.nearbyzips.push(zip);
                     }    
                      console.log(this.nearbyzips);
                      () => console.log('Zip Search Complete')
                    }

                    this.listService.searchPlace(pin, this.nearbyzips).subscribe(
                        data => {
                            this.places = data; 
                            console.log(this.places);
                        },
                        err => {
                            console.log(err);
                        },
                        () => console.log('Place Search Complete')
                    );

                  } // if end here
                  else {
                    this.places = [{"Name": "Bad Pin Code. Try again!"}] ;
                  }
                },
                err => {
                    console.log(err);
                },
                () => console.log('Zip Search Complete')
            )
          
      }
     if(event.target.value.length < 1) {
            this.listService.getList().subscribe(data => {
            this.places = data;
            console.log('Loading initial view again...');
        });
      }
    } 
   
    itemTapped(event, place) {
        console.log(place);  
        this.navCtrl.push(ListDetailPage, {
            place: place
        });
    }

  ionViewDidLoad() {
    console.log('Hello ListPage Page');
  }
}


