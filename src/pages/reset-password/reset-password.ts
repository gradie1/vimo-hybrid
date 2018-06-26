import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HomePage } from '../home/home';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

	form:FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,              
              public formBuilder: FormBuilder,
              public utils: UtilsProvider,
              public auth: AuthProvider) {

    this.form = formBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.email])]
    });

  }

  send(){

  	if(this.form.controls.email.errors ){

      this.utils.Toast("Email invalide");

      return;

    }

    if(this.form.valid){

    	//Spin
      	this.utils.Load("Patientez");

    	this.auth.resetPassword(this.form.value.email)
      	.then(() => {this.utils.Toast('Email envoyé');this.utils.dismissLoad();})
      	.catch(error => {this.auth.handleError(error); this.utils.dismissLoad();});

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
