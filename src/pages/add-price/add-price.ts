import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { PublishPage } from '../publish/publish';

@IonicPage()
@Component({
  selector: 'page-add-price',
  templateUrl: 'add-price.html',
})
export class AddPricePage {

  public price:any;
  public currency = '$';
  public data:any = {};

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
              private alertCtrl: AlertController) {

  	this.data = navParams.get('data');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPricePage');
  }

  next(){

  	if(this.price == '' || this.price == undefined){

  		this.logAlert();

  		return;

  	}

  	this.data.price = this.price;
  	this.data.currency = this.currency;

  	this.navCtrl.push(PublishPage,{data:this.data});

  }

  logAlert(){

    let alert = this.alertCtrl.create({
    title: 'Notification',
    message: 'Vous devez definir un prix.',
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
