import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireStorage } from 'angularfire2/storage';

import { ActionSheetController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';

import { AddPricePage } from '../add-price/add-price';

@IonicPage()
@Component({
  selector: 'page-add-images',
  templateUrl: 'add-images.html',
})
export class AddImagesPage {

  public images=[];
  public category:string;


  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
  			      public actionSheetCtrl: ActionSheetController,
              public utils: UtilsProvider,
              private camera: Camera,
              private storage: AngularFireStorage,
              private alertCtrl: AlertController) {

    this.category = navParams.get('data');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddImagesPage');
  }

  //Get  image
  private selectImage(type:string): void {

    let options: CameraOptions = {
      quality: 30,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth:400,
      targetHeight:400,
      correctOrientation:true
    }

    if(type=='camera'){

      options.sourceType=this.camera.PictureSourceType.CAMERA;

    }

    


    this.camera.getPicture(options).then(imageData => {

      let fileName = imageData.substr(imageData.lastIndexOf('/')+1);

      let fileExtension = imageData.substr(fileName.lastIndexOf('.')+1);

      let imageBase64 = 'data:image/jpeg;base64,' + imageData;

      this.uploadPhoto(imageBase64,fileName,fileExtension);


    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));     
    });
  }

  //Upload the image to firestore
  uploadPhoto(imageData:any,fileName:any,fileExtension:any){

  this.utils.Load("Téléchargement en cours..");

  const ref = this.storage.ref('products/images/'+fileName);
  
  ref.putString(imageData , 'data_url')
  .then(()=>{

    
    ref.getDownloadURL().subscribe(url => { 
         
         this.images.push(url);
         
         this.utils.dismissLoad();

     });

    

  });


 }


  selectMediaType() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Selectionner depuis',
      buttons: [
      {
          text: 'Camera',
          icon:'camera',
          handler: () => {

            //Forbide the user to publish more than 10 images
            if(this.images.length>9){
              this.logAlert();
              return;
            }

            this.selectImage('camera');
          

          }
        },{
          text: 'Galerie',
          icon:'image',
          role: 'cancel',
          handler: () => {
            this.selectImage('galery');
          }
        }
      ]
    });
    actionSheet.present();
  }


  next(){

    this.navCtrl.push(AddPricePage,{data:{
      category:this.category,
      images:this.images
    }});

  }


  logAlert(){

    let alert = this.alertCtrl.create({
    title: 'Notification',
    message: 'Vous ne pouvez publier que 10 images!',
    buttons: [
      {
        text: 'ok',
        role: 'cancel',
        handler: () => {
          
        }
      }
    ]
  });
  alert.present();

  }


}
