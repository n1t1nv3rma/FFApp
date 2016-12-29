import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ListService {
    static get parameters() {
        return [[Http]];
    }
    apiKey: String = "";
    placelistUrl: String = "";

    constructor(private http: Http){
        console.log('Service connected...');
        this.http = http;
        this.apiKey = 'Puq-dedW5BFQ6DWqjwftidlcpJB3EYAV';
        this.placelistUrl = 'https://api.mlab.com/api/1/databases/myworkapp/collections/placelist';
    }

    getList(){
        
        return this.http.get(this.placelistUrl+'?apiKey='+this.apiKey)
            .map(res => res.json());
    }

    searchPlace(pin) {
       // var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        var response = this.http.get(this.placelistUrl+'?q={"Pin":"' + pin + '"}&apiKey='+this.apiKey)
        .map(res => res.json());
        //console.log(''+this.placelistUrl+'?q={"PIN":' + pin + '}&apiKey='+this.apiKey);
        return response;
    }

    deletePlace(placeId){
        return this.http.delete(this.placelistUrl+'/'+placeId+'?apiKey='+this.apiKey)
            .map(res => res.json());
    }

}
