import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductPage } from '../product/product';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { Geolocation } from '@ionic-native/geolocation';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  items : Observable<any>;
  position : any = {};
  query:string = '';

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public db: AngularFireDatabase,
              private geolocation: Geolocation,
              public utils: UtilsProvider) {

  	 //Get the device coordinates
    this.getCurrentLocation();

    //Get the data
    this.search();

  }

  search(){

  this.items = this.db.list('products/',ref => 	ref.orderByChild('active').equalTo(true) )
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key,distance:this.getDistance(c.payload.val()), ...c.payload.val() }))
      )
    );

  }

  openProduct(item:any){

    this.navCtrl.push(ProductPage,{data:{item}});

  }

  //Get the distance between the user location and the product location
  getDistance(product){

    if(product.position){

      let d = this.utils.AB(
        product.position,
        this.position
        );

      return this.utils.shortKm(d);

      }else{
        return '';
      }

  }

  getCurrentLocation(){

  this.geolocation.getCurrentPosition().then((resp) => {
   this.position.lat = resp.coords.latitude;
   this.position.lng = resp.coords.longitude;
  }).catch((error) => {
    console.log('Error getting location', error);
  });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
