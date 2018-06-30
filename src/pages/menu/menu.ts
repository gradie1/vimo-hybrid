import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';

//Firebase
import { AngularFireAuth } from 'angularfire2/auth';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';
import { AuthProvider } from '../../providers/auth/auth';

import { first } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  public connect = "Connexion";
  public logged = false;

  constructor(
          public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public viewCtrl: ViewController,
  			  public appCtrl: App,
          public utils: UtilsProvider,
          public auth: AuthProvider,
          public afAuth: AngularFireAuth) {

    //Check if user is loggedin
    this.state();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


    state() {
      this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
          
          this.connect = 'Déconnexion';
          this.logged = true;

        } else {
          this.connect = 'Connexion';  
        }
      });
    }

  close() {
    this.viewCtrl.dismiss();
  }

  about(){
    this.appCtrl.getRootNav().push(AboutPage);
  }

  handleStates(){
  	this.viewCtrl.dismiss();
  	
    if(this.logged){

      this.utils.Load("");

      this.auth.signOut().then(() => {
        this.utils.dismissLoad();
      });

    }else{
      this.appCtrl.getRootNav().push(LoginPage);
    }

  }

}
