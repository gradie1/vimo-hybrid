
import { Injectable } from '@angular/core';

import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController, ToastController } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Injectable()
export class UtilsProvider {

  public loading:any;

  constructor(private toast: Toast,
  			  private spinner: SpinnerDialog,
  			  public loadingCtrl: LoadingController) {
    
  }

  AB(a,b){

    return Math.floor(Math.sqrt( ((b.lat-a.lat)*(b.lat-a.lat)) + ((b.lng-a.lng)*(b.lng-a.lng)) ));

  }

  shortKm(d){

    if(isNaN(d)){
      return '';
    }

    d = d/1000;

    if(d>1000){
      d = d/1000;
      d = d+" M";
    }

    return d+" km";

  }

  //Email validator
  isValidEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //Toast
  Toast(message="",duration="4000",position="bottom"){

  	this.toast.show(message, duration , position).subscribe(
  		toast => {
    		
  		}
	);

  }

  Spin(title=null,message=null){

  	this.spinner.show(title,message);

  }

  Load(message=null){

  	this.loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: message,
    dismissOnPageChange:true
  	});

  	this.loading.present();

  }

  dismissLoad(){
    this.loading.dismiss();
  }


}
