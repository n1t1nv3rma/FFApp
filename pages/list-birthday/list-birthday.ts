import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {ListService} from '../../services/list.service';
import { ConnectivityService } from '../../providers/connectivity-service';

@Component({
  selector: 'page-list-birthday',
  templateUrl: 'list-birthday.html',
  providers: [ListService]
})
export class ListBirthdayPage {

  places: Array<any> = [];
   nearbyzips: Array<any> = [];
  constructor(
      public modalCtrl: ModalController,
      public loadingCtrl: LoadingController, 
      private listService: ListService, 
      public networkService: ConnectivityService) {

       /* infiniteScroll
        for (let i = 0; i < 30; i++) {
        this.places.push( this.places.length );
        }
        */
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

    presentSearchLoading(){
        let loader = this.loadingCtrl.create({
            content: "Searching places...",
            dismissOnPageChange: true,
            duration: 4000
        });
        loader.present();
    };

    doRefresh(refresher) {
        console.log('Begin async refresh operation', refresher);
        this.refreshList();
        setTimeout(() => {
            console.log('Async refresh operation has ended');
            refresher.complete();
        }, 2000);
    } 

   /* doInfiniteRefresh(infiniteScroll) {
        console.log('Begin async Infinite refresh operation');

        setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            this.places.push( this.places.length );
        }

        console.log('Async Infinite refresh operation has ended');
        infiniteScroll.complete();
        }, 500);
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
                {"Name": "Ooo...Network not found! Please try again later.",
                 "Contact": "Well, atleast your favourites are still available! :)"
                }] ;
    }

    searchNearbyZip(event) {
     if( event.target.value != null && event.target.value.length > 3) {
            this.presentSearchLoading();
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
                      () => console.log('Birthday Zip Search Complete')
                    }

                    this.listService.searchPlace(pin, this.nearbyzips).subscribe(
                        data => {
                            this.places = data; 
                            console.log(this.places);
                        },
                        err => {
                            console.log(err);
                        },
                        () => console.log('Birthday Place Search Complete')
                    );

                  } // if end here
                  else {
                    this.places = [{"Name": "Invalid Pin Code. Try again!"}] ;
                  }
                },
                err => {
                    console.log(err);
                },
                () => console.log('Birthday Zip Search Complete')
            )
          
      }
     if(event.target.value != null && event.target.value.length < 1) {
            this.listService.getList().subscribe(data => {
            this.places = data;
            console.log('Loading initial Birthday view again...');
        });
      }
    } 
   
    /*itemTapped(event, place) {
        console.log(place);  
        this.navCtrl.push(ListDetailPage, {
            place: place,
            showFavButton: true       
        });
    }
    */

  openModal(place) {
   console.log ('from main:');
   console.log (place);
   let modal = this.modalCtrl.create(ModalContentPage, {place});
       modal.present();
  }

  ionViewDidLoad() {
    console.log('Hello ListBirthdayPage Page');
  }
}

@Component({
  templateUrl: 'list-birthday-detail.html'
})
export class ModalContentPage {
  theplace;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.theplace = this.params.get('place');
    console.log ('from modal:');
    console.log (this.theplace);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
