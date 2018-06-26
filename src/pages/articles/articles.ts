import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductPage } from '../product/product';

import { EditProductPage } from '../edit-product/edit-product';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {

  items : Observable<any>;
  user : any;
  connected=false;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
              public utils: UtilsProvider,
              public afAuth: AngularFireAuth,
              public db: AngularFireDatabase) {

    //Check the app version and state
    this.checkVersion();

  	//Get the user ID
    this.afAuth.authState.subscribe(user => {
      if(user) {

        this.user = user;

        //Get all the items
    	this.getItems();

      };

    });

    

  }

  checkConnection(){

    this.db.list('products')
    .snapshotChanges()
    .subscribe(a=>{this.connected = true;)});

  }

  getItems(){

    this.items = this.db.list('products/',ref => ref.orderByChild('owner').equalTo(this.user.uid)  )
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );;

  }

  openProduct(item:any){

    this.navCtrl.push(ProductPage,{data:{item}});

  }

  editProduct(item:any){
    this.navCtrl.push(EditProductPage,{data:item});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesPage');
  }

}
