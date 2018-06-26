import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddImagesPage } from '../add-images/add-images';

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	//Sort the category items
     this.categories = this.categories.sort();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
  }

  addImages(category:string){

    this.navCtrl.push(AddImagesPage,{data:category});

  }

}
