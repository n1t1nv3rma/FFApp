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
    result: any;

    constructor(private nav: NavController, private navParams: NavParams, private listService: ListService) {
        this.listService = listService;
        this.nav = nav;
        this.navParams = navParams;
        this.place = this.navParams.get('place');
        console.log('detailed info:' + this.place);
    }
    
    addFavour(placeId, place){
       this.listService.addFavourPlace(placeId, place);
       console.log('Place added to Favourite...');
       this.nav.setRoot(ListFavouritePage);
    }
}
