import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { HomePage } from '../home/home';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form:FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,              
              public formBuilder: FormBuilder,
              public utils: UtilsProvider,
              public auth: AuthProvider) {

    this.form = formBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.minLength(6)])]
    });

  }



  login(){

    if(this.form.controls.email.errors ){

      this.utils.Toast("Email invalide");

      return;

    }
    
    if(this.form.controls.password.errors ){

      this.utils.Toast("Mot de passe invalide (6 min)");

      return;

    }

    if(this.form.valid){

      //Spin
      this.utils.Load("Patientez");

      this.auth.emailLogin(this.form.value)
      .then(credential => {
        
        this.navCtrl.popToRoot();
        this.utils.dismissLoad();

      })
      .catch(error => {this.auth.handleError(error); this.utils.dismissLoad();});

    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openSignup(){
  	this.navCtrl.push(SignupPage);
  }

  openReset(){
    this.navCtrl.push(ResetPasswordPage);
  }

}
