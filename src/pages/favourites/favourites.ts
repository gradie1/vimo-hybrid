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
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  items : Observable<any>;
  user : any;
  hasLike : boolean ;
  position : any = {};
  connected=false;

  constructor(public navCtrl: NavController,
  			      public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public db: AngularFireDatabase,
              private geolocation: Geolocation,
              public utils: UtilsProvider) {

    //Checks if the data is loaded
    this.checkConnection();

  	//Get the user ID
    this.afAuth.authState.subscribe(user => {
      if(user) {

        this.user = user;

        this.getFavorites();

      };

    });

    //Get the device coordinates
    this.getCurrentLocation();


  }


  checkConnection(){

    this.db.list('products')
    .snapshotChanges()
    .subscribe(a=>{this.connected = true;console.log('connected '+this.connected)});

  }


  isFav(likes){

    if(likes){

      if(likes[this.user.uid]){
        this.hasLike = true;
        return true
      };

    }


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

  getFavorites(){

  this.items = this.db.list('products/',ref => ref.orderByChild('active').equalTo(true)  )
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key,distance:this.getDistance(c.payload.val()), ...c.payload.val() }))
      )
    );

  }

  unlike(item){

    this.db.object('products/'+item.key+'/likes/'+this.user.uid).remove();

  }

  openProduct(item:any){

    this.navCtrl.push(ProductPage,{data:{item}});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
  }

}
