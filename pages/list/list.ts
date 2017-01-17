import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {ListService} from '../../services/list.service';
import {ListDetailPage} from '../list-detail/list-detail';
import { Sql } from '../../providers/sql';
import { ConnectivityService } from '../../providers/connectivity-service';

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
  constructor(
      private navCtrl: NavController,
      public loadingCtrl: LoadingController, 
      private listService: ListService, 
      private sql: Sql, 
      public networkService: ConnectivityService) {
     }
  
  ngOnInit(){

    if(this.networkService.isOnline()){
        console.log("Fetching data online...");
        this.fetchListOnline();
     }
    else {
        console.log("Network unavailable. Fetching data offline...");
        this.fetchListOffline();
    }
     //this.sql.set('mylist', 'testlist');
        //this.sql.get('mylist').then((val) => {
        //console.log('My Value is' + val);
        //})
  }

    presentLoading(){
        let loader = this.loadingCtrl.create({
            content: "Fetching latest data...",
            dismissOnPageChange: true,
            duration: 3000
        });
        loader.present();
    };

    /* doRefresh(refresher) {
        console.log('Begin async refresh operation', refresher);

        setTimeout(() => {
            console.log('Async refresh operation has ended');
            refresher.complete();
        }, 2000);
    } 
    */


    fetchListOnline() {

     this.listService.getList().subscribe(data => {
            this.places = data;
            console.log(data);
        });
    }

    refreshList() {
        this.presentLoading();
        this.fetchListOnline();
    }


    fetchListOffline() {
            this.places = [
                {"Name": "Ooo...Netowrk not found! Please try again later.",
                 "Contact": "Well, atleast your favourites are still available! :)"
                }] ;
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
     if( event.target.value != null && event.target.value.length > 3) {
            var pin = event.target.value;
            this.listService.searchNearbyZip(event.target.value)
            .subscribe(
                data => {

                 if(data.postalCodes != null){
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
     if(event.target.value != null && event.target.value.length < 1) {
            this.listService.getList().subscribe(data => {
            this.places = data;
            console.log('Loading initial view again...');
        });
      }
    } 
   
    itemTapped(event, place) {
        console.log(place);  
        this.navCtrl.push(ListDetailPage, {
            place: place,
            showFavButton: true       
        });
    }

  ionViewDidLoad() {
      
  }

//End
}


