import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';

import { ProfilPage } from '../profil/profil';

import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-edit-profil',
  templateUrl: 'edit-profil.html',
})
export class EditProfilPage {

  public data:any;
  public value:any;
  public userId:string;
  user:  Observable<{}>;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,  			  
  			  public db: AngularFireDatabase,
  			  public afAuth: AngularFireAuth,
          	  public utils: UtilsProvider) {
  
  	this.data = this.navParams.get('data');

  	//Get the user ID
  	this.afAuth.authState.subscribe(user => {
      if(user) {

      	this.userId = user.uid;

      	this.user = this.db.object('users/'+this.userId).valueChanges();

      };

    });

  }

  update(){

  // 	if(this.data == 'email'){

  // 		this.utils.Load();

  // 		firebase.auth.EmailAuthProvider.credential(this.user.email, this.user.password);
		// user.reauthenticateWithCredential(credentials).then(()=>{


		// 	this.afAuth.auth.currentUser.updateEmail(this.value).then(function() {
		    
		// 	this.db.object('users/'+this.userId+'/'+this.data)
  // 			.set(this.value);

		//     console.log("Email mise à jour");
  // 			//this.utils.dismissLoad();

		//   }).catch(function(error) {
		    
		//     console.log(error.message);
  // 			//this.utils.dismissLoad();

		//   });


		// });

  		

  // 		return;
  // 	}


  	if(this.data != undefined && this.data != ''){

  	this.utils.Load();

  		this.db.object('users/'+this.userId+'/'+this.data)
  		.set(this.value)
  		.then(()=>{

  			this.utils.Toast("Mise à jour");
  			this.utils.dismissLoad();

  		})
  		.catch((err)=>{

  			this.utils.Toast("Essayez encore");
  			this.utils.dismissLoad();

  		});
  	
  	}


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilPage');
  }

}
