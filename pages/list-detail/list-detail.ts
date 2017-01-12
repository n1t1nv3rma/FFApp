import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListService} from '../../services/list.service';
import {ListFavouritePage} from '../list-favourite/list-favourite';

@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
  providers: [[ListService]]
})

export class ListDetailPage {
    
    place: any;
    hideFavButton: Boolean = true;
    showDelButton: Boolean = false;

    constructor(private nav: NavController, private navParams: NavParams, private listService: ListService) {
        this.listService = listService;
        this.nav = nav;
        this.navParams = navParams;
        this.place = this.navParams.get('place');
        this.hideFavButton = this.navParams.get('hideFavButton');
        this.showDelButton = this.navParams.get('delButton');
        console.log('Show Fav button:' + this.hideFavButton);
        console.log('Show Del button:' + this.showDelButton);
        console.log('detailed info:' + JSON.stringify(this.place));
    }
    
    addFavour(placeId, place){
       this.listService.addFavourPlace(placeId, place);
       console.log('Place added to Favourite...');
       this.nav.setRoot(ListFavouritePage);
    }

    delFavour(placeId){
       this.listService.delFavourPlace(placeId);
       console.log('Place removed from Favourite...');
       this.nav.setRoot(ListFavouritePage);
    }
}
