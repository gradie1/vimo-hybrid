import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';

import { ArticlesPage } from '../articles/articles';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  item:any;

  public categories = [
                        'Appareils',
                        'Homme',
                        'Femme',
                        'Mobiles et accessoires',
                        'Ordinateur',
                        'Logement',
                        'Maison',
                        'Voiture',
                        'Habillement',
                        'Moto',
                        'Automobile',
                        'Nourriture',
                        'Objets',
                        'Autres'
                      ];

  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
  			      public utils: UtilsProvider,
              public db: AngularFireDatabase,
              private alertCtrl: AlertController) {
  
  	this.categories.sort();  

  	this.item = navParams.get('data');


  }

  update(){

  	if(this.item.name == ''){

  		this.utils.Toast('Le nom est vide');
  		return;

  	}

  	if(this.item.price == ''){

  		this.utils.Toast('Le prix est vide');
  		return;

  	}


    this.utils.Load();


  	this.db.object('products/'+this.item.key).update(this.item)
  	.then(()=> {
      this.utils.Toast('Modifié');
      this.utils.dismissLoad();
    });


  }

  deleteProduct(){

    this.utils.Load();

    this.db.object('products/'+this.item.key+'/active')
    .set(false)
    .then(()=>{
      this.utils.dismissLoad();
      this.utils.Toast("Supprimé");
      this.navCtrl.push(ArticlesPage);
    });

  }


  // ALERT
   logAlert(){

    let alert = this.alertCtrl.create({
    title: 'Attention',
    message: 'Voulez vous vraiment supprimer cet article?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Supprimer',
        handler: () => {
          
          this.deleteProduct();

        }
      }
    ]
  });
  alert.present();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

}
