import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListService} from '../../services/list.service';
import {ListPage} from '../list/list';
import { Sql } from '../../providers/sql';

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
    
    deletePlce(placeId){
       this.listService.deletePlace(placeId).subscribe(data => {
           this.result = data
       },
       err => console.log(err),
       () => console.log('Place Deleted'));
       
       this.nav.setRoot(ListPage);
    }
}
