import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Sql } from '../providers/sql';

@Injectable()
export class ListService {
    static get parameters() {
        return [[Http],[Sql]];
    }
    apiKey: String = "";
    placelistUrl: String = "";
    findNearbyPinCodesUrl: String = "";
    nearbyPinCodesObj: {};
    nearbyPinCodes: Array<any> = [];
    
    constructor(private http: Http, private sql: Sql){
        console.log('Service connected...');
        this.http = http;
        this.sql = sql;
        this.apiKey = 'Puq-dedW5BFQ6DWqjwftidlcpJB3EYAV';
        this.placelistUrl = 'https://api.mlab.com/api/1/databases/myworkapp/collections/placelist';
        this.findNearbyPinCodesUrl = 'http://api.geonames.org/findNearbyPostalCodesJSON?country=AU&radius=5&username=ffapp&maxRows=20&style=short';
        //postalcode=2768;
    }

    getList(){
        
        return this.http.get(this.placelistUrl+'?apiKey='+this.apiKey)
            .map(res => res.json());
    }

    searchPlace(pin, zips) {
        var query: String = "";
        for (var j = 0; j < zips.length; j++){
            query = query + '},{"Pin":' + zips[j];
            //console.log(query);
        }
        //console.log(query);
        // log url
        console.log(this.placelistUrl + '?q={$or:[{"Pin":' + pin + query +'}]}&apiKey='+this.apiKey);
        var response = this.http.get(this.placelistUrl + '?q={$or:[{"Pin":' + pin + query +'}]}&apiKey='+this.apiKey)
        .map(res => res.json());
        
        // OR q={$or:[{"Pin":2768},{"Pin:2212}]}
        return response;
    }

    searchNearbyZip(pin) {
        console.log(this.findNearbyPinCodesUrl+'&postalcode='+pin);
        var findnearbypins =  this.http.get(this.findNearbyPinCodesUrl+'&postalcode='+pin)
        .map ( res => res.json()
        );
        console.log(findnearbypins);
        return findnearbypins;
    }

    /* 
    deletePlace(placeId){
        return this.http.delete(this.placelistUrl+'/'+placeId+'?apiKey='+this.apiKey)
            .map(res => res.json());
    }
    */

    addFavourPlace(placeId, place){
         console.log(placeId);
         console.log(place);
        // Set Place
        var favourite_key = placeId;
        
       this.sql.set(favourite_key, JSON.stringify(place));
       console.log ('Add Executed...');
    }

}
