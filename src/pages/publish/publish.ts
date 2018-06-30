import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html',
})
export class PublishPage {

  public name:string;
  public description:string = '';
  public position:boolean = false;
  public data:any = {};
  public userId:string;
  public latLng:any = {};

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  private afAuth: AngularFireAuth,
    		  public utils:UtilsProvider,
    		  public db:AngularFireDatabase,
    		  private geolocation: Geolocation) {

  	this.data = navParams.get('data');

  	//Get the user ID
  	this.afAuth.authState.subscribe(user => {
      if(user) {

      	this.userId = user.uid

      };

    });

    this.getCurrentLocation();

  }


  publish(){

  	this.utils.Load();

  	if(this.userId){

  		if(!this.name){
  			this.utils.Toast('Le nom du produit manque');
  			return;
  		}

      if(this.position && this.latLng == ''){

        this.utils.Toast('Veuillez activer la Gélocalisation');
        return;

      }

  		//DATA
  		this.data.name = this.name;
  		this.data.description = this.description;
  		this.data.owner = this.userId;
  		this.data.position = this.latLng;
  		this.data.date = Date();
  		this.data.active = true;

  		this.db.list('products/')
  		.push(this.data)
  		.then(()=>{

  			this.utils.Toast("Publié avec succès");
  			this.utils.dismissLoad();
  			this.navCtrl.popToRoot();

  		});

  	}else{
  		this.utils.Toast("Essayez encore");
  	}


  }

  getCurrentLocation(){

  this.geolocation.getCurrentPosition().then((resp) => {
   this.latLng.lat = resp.coords.latitude;
   this.latLng.lng = resp.coords.longitude;
  }).catch((error) => {
    console.log('Error getting location', error);
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishPage');
  }

  

}
