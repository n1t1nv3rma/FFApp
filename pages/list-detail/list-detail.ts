import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ListService} from '../../services/list.service';
import {ListFavouritePage} from '../list-favourite/list-favourite';

@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
  providers: [[ListService]]
})

export class ListDetailPage {
    
    place: any;
    showFavButton: Boolean;
    showDelButton: Boolean;

    constructor(
        private nav: NavController, 
        private navParams: NavParams, 
        private listService: ListService, 
        public alertCtrl: AlertController,
        public toastCtrl: ToastController) {
        this.listService = listService;
        this.nav = nav;
        this.navParams = navParams;
        this.place = this.navParams.get('place');
        this.showFavButton = this.navParams.get('showFavButton');
        this.showDelButton = this.navParams.get('showDelButton');
        console.log('Show Fav button:' + this.showFavButton);
        console.log('Show Del button:' + this.showDelButton);
        console.log('detailed info:' + JSON.stringify(this.place));
    }
    
    addFavour(placeId, place){
       this.listService.addFavourPlace(placeId, place);
       console.log('Place added to Favourite...');
       this.presentAddToast();
       this.nav.pop();
    
    }

    presentAddToast() {
            let toast = this.toastCtrl.create({
            message: 'Added to Favourites...',
            duration: 3000
            });
            toast.present();
    }

    presentDelToast() {
            let toast = this.toastCtrl.create({
            message: 'Removed from Favourites...',
            duration: 3000
            });
            toast.present();
    }
        
       
       /*
        let alert = this.alertCtrl.create({
            title: 'Added to favourites',
            buttons: [{
                text: 'Ok',
                handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                let navTransition = alert.dismiss();

                    navTransition.then(() => {
                    this.nav.pop();
                    });
                return false;
                }
            }]
            });
            alert.present();
        */

    delFavour(placeId){
       this.listService.delFavourPlace(placeId);
       console.log('Place removed from Favourite...');
       this.presentAddToast();
       this.nav.pop();
    }
}
