import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Pages
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';
import { AuthProvider } from '../../providers/auth/auth';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  form:FormGroup;
  userId:string;
  termsLink:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public utils: UtilsProvider,
              public auth: AuthProvider,
              public db:AngularFireDatabase) {


    this.form = formBuilder.group({
      name:['',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(50)])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      phone:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
      password:['',Validators.compose([Validators.required,Validators.minLength(6)])],
      password2:['',Validators.compose([Validators.required,Validators.minLength(6)])]
    });

    //Get the terms link
    //this.termsLink = this.db.list('utils/termsLink');

  }


  signUp(){

    //Validate
    if(this.form.controls.name.errors ){

      this.utils.Toast("Verifiez votre nom");

      return;

    }

    if(this.form.controls.phone.errors ){

      this.utils.Toast("Verifiez votre numero");

      return;

    }

    if(this.form.controls.email.errors ){

      this.utils.Toast("Email invalide");

      return;

    }


    if(this.form.controls.password.errors ){

      this.utils.Toast("Mot de passe invalide (6 min)");

      return;

    }

    if(this.form.value.password != this.form.value.password2){

      this.utils.Toast("Les mots de passe ne correspondent pas!");

      return;

    }

    if(this.form.valid){

      //Spin
      this.utils.Load("Patientez");

      //Signup
      this.auth.emailSignUp(this.form.value)
      .then(credential => {
                
        //Set information in db
        this.db.object('users/'+credential.user.uid).set(this.form.value)
        .then(snap=>{

          this.utils.Toast('Inscription réussie');
          this.navCtrl.popToRoot();
          this.utils.dismissLoad();

        });

      })
      .catch(error =>{ this.auth.handleError(error); this.utils.dismissLoad();});

    }




  }


  openTerms(link){
    // if(typeof link === 'object'){
    //   window.open('http://kivubox.com/vimo-termes.html','_system');
    // }else{
    //   window.open(this.termsLink,'_system');
    // }

    window.open('http://kivubox.com/vimo-termes.html','_system');

  }


  openLogin(){
    this.navCtrl.push(LoginPage);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


}
