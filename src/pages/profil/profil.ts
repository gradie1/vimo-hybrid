import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

import { Camera, CameraOptions } from '@ionic-native/camera';

//Providers
import { UtilsProvider } from '../../providers/utils/utils';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { EditProfilPage } from '../edit-profil/edit-profil';
import { ResetPasswordPage } from '../reset-password/reset-password';

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  user:  Observable<{}>;
  userId:string;
  placeholder = 'assets/imgs/placeholder.png';

  downloadURL: Observable<string>;

  constructor(
          public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public db: AngularFireDatabase,
          private storage: AngularFireStorage,
  			  public afAuth: AngularFireAuth,
          public utils: UtilsProvider,
          private camera: Camera) {

  	//Get the user ID
  	this.afAuth.authState.subscribe(user => {
      if(user) {

      	this.userId = user.uid

      	//Get user data
		    this.getItemsList();

      };

    });

  }


  getItemsList(){

    if (!this.userId) return;
    this.user = this.db.object('users/'+this.userId).valueChanges();

  }
  


  //Get and upload profil image
  private selectImage(): void {

    const options: CameraOptions = {
      quality: 30,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth:400,
      targetHeight:400,
      correctOrientation:true
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

  this.utils.Load();

  const ref = this.storage.ref('users/'+this.userId+'/profil/'+fileName);
  
  const task = ref.putString(imageData , 'data_url')
  .then(()=>{

    
    const downloadURL = ref.getDownloadURL().subscribe(url => { 
         
         //Save image in the database
        this.db.object('users/'+this.userId+'/profilImage')
        .set(url).then((snap)=>{

          this.utils.dismissLoad();
          this.utils.Toast('Mise à jour');

        }).catch((err)=>{

          this.utils.dismissLoad();
          this.utils.Toast(err.message);

        });

     });

  });




 }


  edit(key:string){

    if(this.user){
      
      this.navCtrl.push(EditProfilPage,{data:key});

    }

  }

  resetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
