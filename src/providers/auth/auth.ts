import { Injectable } from '@angular/core';

import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';



@Injectable()
export class AuthProvider {


  constructor(
    private afAuth: AngularFireAuth,
    public utils:UtilsProvider,
    public db:AngularFireDatabase
  ) {
    

  }



   //// Email/Password Auth ////
  emailSignUp(user:any){
    return this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password);
      
  }

  emailLogin(user:any) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password);
      
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email);
  }

  signOut(){
    return this.afAuth.auth.signOut()
    .then((snap)=>{
      //window.location.reload();
    });
  }

  public handleError(error:Error){

  	console.log(error);

  	this.utils.Toast(error.message);

  }

}
