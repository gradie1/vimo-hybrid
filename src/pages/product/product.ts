import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { ActionSheetController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';

import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  item:any;
  user : any;
  liked:boolean=false;
  owner:Observable<any>;
  placeholder = 'assets/imgs/placeholder.png';

  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
  			      public actionSheetCtrl: ActionSheetController,
              public db: AngularFireDatabase,
              public utils: UtilsProvider,
              public afAuth: AngularFireAuth) {


    //product data
    this.item = navParams.get('data').item;

    //Get the user ID
    this.afAuth.authState.subscribe(user => {
      if(user) {

        this.user = user;

        //Check the like
        this.checkLike();

      };

    });
    
    //Get the owner information
    this.getOwner(this.item.owner);

  }


  getOwner(id){

    this.owner = this.db.object('users/'+id).valueChanges();

  }

  checkLike(){

    this.db.object('products/'+this.item.key+'/likes/'+this.user.uid)
    .snapshotChanges().subscribe((snap)=>{
        
        if(snap.payload.val()){
          this.liked = true;
        }else{
          this.liked = false;
        }

    });

  }

  unlike(){

    this.db.object('products/'+this.item.key+'/likes/'+this.user.uid).remove()
    this.liked = false;

  }

  like(event,key){
    
    this.db.object('products/'+key+'/likes/'+this.user.uid)
    .set(true).then(()=>{
      console.log("liked");
      this.liked = true;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }


  contact(phone) {

    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Selectionner depuis',
      buttons: [
      {
          text: 'Appel',
          icon: 'call',
          handler: () => {
            
            if(phone){

              window.open('tel:'+phone, '_system');

            }else{
              this.utils.Toast("Le numéro n'est pas disponible");
            }

          }
        },{
          text: 'Message',
          icon: 'mail',
          handler: () => {
            
            if(phone){

              window.open('sms:'+phone, '_system');

            }else{
              this.utils.Toast("Le numéro n'est pas disponible");
            }

          }
        }
      ]
    });
    actionSheet.present();
  }


}
