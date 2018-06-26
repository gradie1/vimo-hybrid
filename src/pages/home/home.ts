import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, AlertController } from 'ionic-angular';

import { Network } from '@ionic-native/network';

import { AngularFireDatabase } from 'angularfire2/database';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';

import { LoginPage } from '../login/login';
import { ProfilPage } from '../profil/profil';
import { ArticlesPage } from '../articles/articles';
import { AddCategoryPage } from '../add-category/add-category';
import { AddImagesPage } from '../add-images/add-images';
import { AddPricePage } from '../add-price/add-price';
import { PublishPage } from '../publish/publish';
import { ProductPage } from '../product/product';
import { MenuPage } from '../menu/menu';
import { FavouritesPage } from '../favourites/favourites';
import { SearchPage } from '../search/search';

import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //The version code and name help to notify the user of any update or if the application is depreciated
  private version = {
    name:'luna',
    code:'1.0.0',
    message:'',
    active:true
  } 




  public categories = [
                        'Appareils',
                        'Homme',
                        'Femme',
                        'Mobiles et accessoires',
                        'Ordinateur',
                        'Logement',
                        'Maison',
                        'Voiture',
                        'Habillement',
                        'Moto',
                        'Automobile',
                        'Nourriture',
                        'Objets',
                        'Autres'
                      ];

  items : Observable<any>;
  notLoad = true;
  cat:any;
  count = 20;
  user : any;
  position : any = {};
  connected=false;
  placeholder = 'assets/imgs/placeholder.png';

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public utils: UtilsProvider,
              public afAuth: AngularFireAuth,
              private alertCtrl: AlertController,
              public db: AngularFireDatabase,
              private geolocation: Geolocation,
              private network: Network
              ) {

    //Check the app version and state
    this.checkVersion();

    //Check internet connection
    this.checkConnection();

    this.categories.sort();
    
    //Get the user ID
    this.afAuth.authState.subscribe(user => {
      if(user) {

        this.user = user;


      };

    });

    //Get the device coordinates
    this.getCurrentLocation();

    //Get all the items
    this.getItems();


  }

  checkConnection(){

    this.db.list('products')
    .snapshotChanges()
    .subscribe(a=>{this.connected = true;console.log('connected '+this.connected)});

  }

  //Get the distance between the user location and the product location
  getDistance(product){console.log(product.position);

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


  like(event,key){
    
    if(event.target.src.value == "assets/imgs/heart.png"){
      return;
    }

    event.target.src = "assets/imgs/heart.png";

    console.log(key);

    this.db.list('products/'+key+'/likes')
    .push(this.user.uid).then(()=>{console.log("liked");});

  }


  openProduct(item:any){

    this.navCtrl.push(ProductPage,{data:{item}});

  }


  getItems(){

    this.cat = null;

    this.items = this.db.list('products/',ref => ref.orderByChild('active').equalTo(true).limitToFirst(this.count)  )
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key,distance:this.getDistance(c.payload.val()), ...c.payload.val() }))
      )
    );

  }

  moreItems(){
    this.count+=20;
    this.items = this.db.list('products/',ref => ref.orderByChild('active').equalTo(true).limitToFirst(this.count)  )
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key,distance:this.getDistance(c.payload.val()), ...c.payload.val() }))
      )
    );



  }

  selectCategory(cat){
    this.cat = cat;
  }

  publish(){

    if(this.user){

      this.navCtrl.push(AddCategoryPage);

    }else{
      this.logAlert();
    }

  }

  search(){
    this.navCtrl.push(SearchPage);
  }

  openUserArcticles(){

    if(this.user){

      this.navCtrl.push(ArticlesPage);

    }else{
      this.logAlert();
    }

  }

  openProfil(){
  	
    if(this.user){

      this.navCtrl.push(ProfilPage);

    }else{
      this.logAlert();
    }

  }

  openFavorites(){

    if(this.user){

      this.navCtrl.push(FavouritesPage);

    }else{
      this.logAlert();
    }

  }

  showMenu(ev){

    let popover = this.popoverCtrl.create(MenuPage,{},{cssClass: 'popover-content'});
    popover.present({
      ev: ev
    });

  }








  // ALERT
   logAlert(){

    let alert = this.alertCtrl.create({
    title: 'Notification',
    message: 'Vous devez être connecté pour continuer!',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Connexion',
        handler: () => {
          
          this.navCtrl.push(LoginPage);

        }
      }
    ]
  });
  alert.present();

  }


  checkVersion(){

    this.db.object('app/'+this.version.name)
    .snapshotChanges().subscribe(snap=>{

      let App:any = snap.payload.val();

      if(App.active == true){

        if(App.message != ''){

          this.appAlert('Notification',App.message);

        }

      }else if(App.active == false){

        if(App.message != ''){

          this.utils.Load(App.message);

        }

      }

    });

  }


  appAlert(title='Notification',msg){

    let alert = this.alertCtrl.create({
    title: title,
    message: msg,
    buttons: [
      {
        text: 'ok',
        role: 'cancel',
        handler: () => {
          
        }
      }
    ]
  });
  alert.present();

  }

}