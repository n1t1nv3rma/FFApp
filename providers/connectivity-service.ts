import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
 
declare var Connection;
 
@Injectable()
export class ConnectivityService {
 
  onDevice: Boolean;
 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('Cordova');
  }
 
  isOnline(): Boolean {
    if(this.onDevice && Network.connection){
      return Network.connection !== Connection.NONE;
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): Boolean {
    if(this.onDevice && Network.connection){
      return Network.connection === Connection.NONE;
    } else {
      return !navigator.onLine;   
    }
  }
}
